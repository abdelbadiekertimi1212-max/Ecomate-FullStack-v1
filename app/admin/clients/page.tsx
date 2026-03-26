'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Fetch Clients Error:', error)
      toast.error(error.message)
    } else {
      setClients(data || [])
    }
    setLoading(false)
  }

  async function toggleBan(id: string, currentStatus: boolean) {
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ is_banned: !currentStatus })
      .eq('id', id)
    
    if (error) toast.error(error.message)
    else {
      toast.success(currentStatus ? 'User unbanned' : 'User banned')
      fetchClients()
    }
  }

  const filtered = clients.filter(c => 
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.business_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-poppins)', fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Clients Management 👥</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.4)' }}>Manage your registered merchants and their account status.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
           <input 
            type="text" 
            placeholder="Search clients..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ 
              padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, outline: 'none', width: 260
            }}
           />
           <button onClick={fetchClients} className="btn-secondary" style={{ padding: '10px 16px' }}>🔄 Refresh</button>
        </div>
      </div>

      <div style={{ background: 'rgba(5, 10, 20, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: 24, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }} className="admin-table">
          <thead>
            <tr>
              <th>Client / Store</th>
              <th>Contact</th>
              <th>Current Plan</th>
              <th>Registered</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.2)' }}>Loading clients...</td></tr>
            ) : filtered.length > 0 ? (
              filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        {c.full_name?.[0]?.toUpperCase() || '👤'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{c.full_name || 'Anonymous'}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{c.business_name || 'No Store Name'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, color: '#fff' }}>{c.email}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{c.phone || 'No phone'}</div>
                  </td>
                  <td>
                    <span style={{ 
                      display: 'inline-flex', padding: '4px 12px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                      background: c.plan === 'growth' ? 'rgba(16,185,129,0.1)' : 'rgba(37,99,235,0.1)',
                      color: c.plan === 'growth' ? '#10b981' : '#2563eb', textTransform: 'uppercase'
                    }}>
                      {c.plan}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    {c.created_at ? new Date(c.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <span style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 12, fontWeight: 600, color: c.is_banned ? '#ef4444' : '#10b981'
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                      {c.is_banned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => toggleBan(c.id, !!c.is_banned)}
                      style={{ 
                        padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                        background: c.is_banned ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        color: c.is_banned ? '#10b981' : '#ef4444',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      {c.is_banned ? 'Unban' : 'Ban User'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.2)' }}>No clients found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
