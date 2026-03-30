import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const secret = request.headers.get('x-webhook-secret')
    if (secret !== process.env.WEBHOOK_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    
    const body = await request.json()
    const supabase = createAdminClient()
    
    // Generate order number
    const orderNumber = `ECO-${Date.now().toString().slice(-8)}`
    
    const { error: orderError } = await supabase.from('orders').insert({
      user_id: body.client_id,
      order_number: orderNumber,
      customer_name: body.customer_name,
      customer_phone: body.phone,
      wilaya: body.wilaya,
      total_da: body.total_da,
      status: body.status === 'confirmed' ? 'confirmed' : 'pending',
      items: body.items,
    })

    if (orderError) throw orderError
    
    // Upsert CRM
    const { error: crmError } = await supabase.from('crm_customers').upsert({
      user_id: body.client_id,
      phone: body.phone,
      full_name: body.customer_name,
      wilaya: body.wilaya,
    }, { onConflict: 'phone,user_id' })
    
    if (crmError) throw crmError

    return NextResponse.json({ success: true, order_number: orderNumber })
  } catch (error) {
    console.error('Order Webhook Error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
