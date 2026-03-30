import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    // Chargily uses a Signature header to verify the webhook authenticity
    const signature = request.headers.get('Signature')
    if (!signature) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    
    const bodyText = await request.text()
    
    // Validate signature (Chargily standard process)
    const secretKey = process.env.CHARGILY_SECRET_KEY || ''
    const generatedSignature = crypto.createHmac('sha256', secretKey).update(bodyText).digest('hex')
    
    if (signature !== generatedSignature) {
      return new NextResponse('Invalid Signature', { status: 403 })
    }

    const payload = JSON.parse(bodyText)
    const supabase = createAdminClient()
    
    // Extract payment details from payload
    const paymentId = payload.id || payload.checkout_id
    const status = payload.status === 'paid' ? 'paid' : payload.status === 'failed' ? 'failed' : 'pending'
    const metadata = payload.metadata || {}
    const clientId = metadata.client_id
    const orderId = metadata.order_id
    
    if (!clientId) {
      return new NextResponse('Missing client_id in metadata', { status: 400 })
    }

    // Upsert payment log
    const { error: logError } = await supabase.from('payment_logs').insert({
      client_id: clientId,
      gateway: 'chargily',
      transaction_id: paymentId,
      amount: payload.amount,
      currency: payload.currency || 'DZD',
      status: status,
      customer_name: payload.customer_name || 'N/A',
      payment_method: payload.payment_method || 'cib'
    })

    if (logError) throw logError
    
    // Optionally update order status to 'paid' if an order matches
    if (orderId && status === 'paid') {
      await supabase.from('orders')
        .update({ payment_status: 'paid' })
        .eq('id', orderId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Chargily Webhook Error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
