import { Fragment } from 'react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function Integrations() {
  const t = await getTranslations('Sections.Integrations')
  const cols = [
    { badge: t('social'), title: t('social'), pills: [['blue','Facebook'],['pink','Instagram'],['green','WhatsApp'],['tg','Telegram'],['tiktok','TikTok DM'],['sms','SMS'],['email','Email']] },
    { badge: t('delivery'), title: t('delivery'), pills: [['dz','Yalidine Express'],['dz','Zimex'],['dz','Ecom Delivery'],['dz','Maystro'],['dz','58 Wilayas']] },
    { badge: t('tools'), title: t('tools'), pills: [['sheets','Google Sheets'],['sheets','Google Drive'],['gray','Excel Export'],['gray','PDF Reports']] },
  ]
  const dotColors: Record<string,string> = { blue:'#1877f2', pink:'#e1306c', green:'#25d366', tg:'#229ED9', tiktok:'#00f2fe', sms:'#f59e0b', email:'#ef4444', dz:'#006233', sheets:'#34a853', gray:'#94a3b8' }

  return (
    <div style={{ padding: '64px 5%', background: 'var(--bg-section)', transition: 'var(--theme-transition)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: 32, display: 'block' }}>
          {t('badge')}
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30, alignItems: 'start' }}>
          {cols.map((col, i) => (
            <div key={i} style={{ padding: '0 20px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.15)', borderRadius: 100, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: '#10B981', marginBottom: 16 }}>✓ {col.badge}</div>
              <div style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {col.pills.map(([color, label]) => (
                  <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 100, padding: '7px 14px', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColors[color], flexShrink: 0 }} />{label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function Features({ services }: { services?: any[] }) {
  const t = await getTranslations('Sections.Features')
  const bentosFallback = [
    { id:'b1', cls:'1/7', icon: t('items.b1.icon'), iconBg:'rgba(37,99,235,.1)', title: t('items.b1.title'), desc: t('items.b1.desc'), tag: t('items.b1.tag') },
    { id:'b2', cls:'7/13', icon: t('items.b2.icon'), iconBg:'rgba(16,185,129,.1)', title: t('items.b2.title'), desc: t('items.b2.desc'), tag: t('items.b2.tag') },
    { id:'b3', cls:'1/6', icon: t('items.b3.icon'), iconBg:'rgba(96,165,250,.08)', title: t('items.b3.title'), desc: t('items.b3.desc'), tag: t('items.b3.tag') },
    { id:'b4', cls:'6/13', icon: t('items.b4.icon'), iconBg:'rgba(245,158,11,.1)', title: t('items.b4.title'), desc: t('items.b4.desc'), tag: t('items.b4.tag') },
    { id:'b5', cls:'1/8', icon: t('items.b5.icon'), iconBg:'rgba(16,185,129,.1)', title: t('items.b5.title'), desc: t('items.b5.desc'), tag: t('items.b5.tag') },
    { id:'b6', cls:'8/13', icon: t('items.b6.icon'), iconBg:'rgba(96,165,250,.08)', title: t('items.b6.title'), desc: t('items.b6.desc'), tag: t('items.b6.tag') },
  ]
  const bentosClasses = ['1/7', '7/13', '1/6', '6/13', '1/8', '8/13']
  const bgColors = ['rgba(37,99,235,.1)', 'rgba(16,185,129,.1)', 'rgba(96,165,250,.08)', 'rgba(245,158,11,.1)']
  
  const bentos: any[] = services && services.length > 0 
    ? services.filter(s => s.name !== 'AI Growth Agent').map((s, i) => ({
        id: s.id, cls: bentosClasses[i % bentosClasses.length],
        icon: s.icon && (s.icon.startsWith('http') || s.icon.startsWith('/')) 
          ? <img src={s.icon} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} /> 
          : (s.icon || '⚡'),
        iconBg: bgColors[i % bgColors.length],
        title: s.name, desc: s.description,
        tag: s.tag, tagColor: s.tag_color
      }))
    : bentosFallback

  return (
    <section id="features" style={{ padding: '100px 5%', background: 'var(--bg-section)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: 18 }}>
        <span style={{ width: 16, height: 1.5, background: '#2563eb' }} />{t('badge')}
      </div>
      <h2 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 'clamp(30px,3.8vw,52px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text-main)', marginBottom: 16, lineHeight: 1.1 }}>
        <span style={{ background: 'linear-gradient(135deg,#2563eb,#93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('title1')}</span><br />
        <span style={{ background: 'linear-gradient(135deg,#10B981,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('title2')}</span>
      </h2>
      <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.75, maxWidth: 520, marginBottom: 60 }}>
        {t('sub')}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16 }}>
        {bentos.map(b => (
          <div key={b.id} style={{
            gridColumn: b.cls,
            background: 'var(--bg-card)', border: '1px solid var(--border-c)',
            borderRadius: 20, padding: 30, position: 'relative', overflow: 'hidden',
            transition: 'border-color .3s, transform .3s, box-shadow .3s',
            cursor: 'default',
          }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 18, background: b.iconBg, border: '1px solid rgba(255,255,255,.08)' }}>{b.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 9 }}>{b.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-sub)', lineHeight: 1.65 }}>{b.desc}</p>
            {b.tag && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${b.tagColor ? `${b.tagColor}18` : 'rgba(16,185,129,.1)'}`, border: `1px solid ${b.tagColor ? `${b.tagColor}30` : 'rgba(16,185,129,.18)'}`, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: b.tagColor || '#10B981', marginTop: 14 }}>{b.tag}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export async function HowItWorks() {
  const t = await getTranslations('Sections.How')
  const steps = [
    { n:1, icon:'📋', title: t('steps.s1.title'), desc: t('steps.s1.desc') },
    { n:2, icon:'⚙️', title: t('steps.s2.title'), desc: t('steps.s2.desc') },
    { n:3, icon:'🔗', title: t('steps.s3.title'), desc: t('steps.s3.desc') },
    { n:4, icon:'🚀', title: t('steps.s4.title'), desc: t('steps.s4.desc') },
  ]

  return (
    <section id="how" style={{ padding: '100px 5%' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: 18 }}>
          <span style={{ width: 16, height: 1.5, background: '#2563eb' }} />{t('badge')}
        </div>
        <h2 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 'clamp(30px,3.8vw,52px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text-main)', marginBottom: 16, lineHeight: 1.1 }}>
          {t('title1')} <span style={{ background: 'linear-gradient(135deg,#2563eb,#93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('title2')}</span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 60px' }}>
          {t('sub')}
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 52, left: '12%', right: '12%', height: 1, background: 'linear-gradient(90deg,transparent,var(--border-c),#2563eb,#10B981,var(--border-c),transparent)' }} />
        {steps.map(s => (
          <div key={s.n} style={{ padding: '0 22px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 104, height: 104, borderRadius: '50%', margin: '0 auto 26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, position: 'relative', background: 'var(--bg-card)', border: '1.5px solid var(--border-c)' }}>
              <div style={{ position: 'absolute', top: -4, right: -4, width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#1E3A8A)', fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 11, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-body)' }}>{s.n}</div>
              {s.icon}
            </div>
            <h3 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 9 }}>{s.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-sub)', lineHeight: 1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export async function DashboardPreview() {
  const t = await getTranslations('Sections.Dashboard')
  const stats = [
    { label:'Revenue Today', value:'127,400 DA', color:'#10B981', change:'↑ 23.4%' },
    { label:'Orders Today', value:'84', color:'#2563eb', change:'↑ 12' },
    { label:'AI Handled', value:'3,421', color:'var(--text-main)', change:'↑ 98.7%' },
    { label:'Pending COD', value:'32', color:'#f59e0b', change:'→' },
  ]
  const bars = [40,58,72,55,87,78,100]

  return (
    <section id="dashboard" style={{ padding: '100px 5%', background: 'var(--bg-section)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: 18 }}>
        <span style={{ width: 16, height: 1.5, background: '#2563eb' }} />{t('badge')}
      </div>
      <h2 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 'clamp(30px,3.8vw,52px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text-main)', marginBottom: 16, lineHeight: 1.1 }}>
        {t('title1')} <span style={{ background: 'linear-gradient(135deg,#2563eb,#93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('title2')}</span>
      </h2>
      <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.75, maxWidth: 500, marginBottom: 40 }}>{t('sub')}</p>

      <div style={{ background: 'rgba(10,20,38,.92)', border: '1px solid var(--border-c)', borderRadius: 22, overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,.15)' }}>
        {/* Browser bar */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-c)', display: 'flex', alignItems: 'center', gap: 8 }}>
          {['#ff5f57','#ffbd2e','#28c840'].map((c,i) => <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
          <div style={{ marginInlineStart: 14, background: 'var(--bg-card)', borderRadius: 6, padding: '3px 14px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>app.ecomate.dz/dashboard</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr', minHeight: 380 }}>
          {/* Sidebar */}
          <div style={{ borderInlineEnd: '1px solid var(--border-c)', padding: '16px 0' }}>
            {[['📊','Dashboard',true],['📦','Orders',false],['🛍️','Products',false],['👥','Customers',false],['🤖','AI Chatbot',false],['📈','Analytics',false],['🚚','Delivery',false]].map(([icon,label,active],i) => (
              <div key={i} style={{ padding: '9px 18px', display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, fontWeight: 500, color: active ? 'var(--text-main)' : 'var(--text-muted)', background: active ? 'rgba(37,99,235,.08)' : 'transparent', borderInlineStart: active ? '2px solid #2563eb' : 'none' }}>
                <span style={{ fontSize: 15 }}>{icon as string}</span>{label as string}
              </div>
            ))}
          </div>
          {/* Main */}
          <div style={{ padding: 22 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
              {stats.map((s,i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 7 }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 20, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#10B981' }}>{s.change}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 12, padding: 18 }}>
              <div style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 13, fontWeight: 700, color: 'var(--text-main)', marginBottom: 14 }}>Weekly Revenue — دج</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 90 }}>
                {bars.map((h,i) => (
                  <div key={i} style={{ flex: 1, borderRadius: '4px 4px 0 0', height: `${h}%`, background: i === 4 || i === 6 ? 'linear-gradient(180deg,#10B981,rgba(16,185,129,.2))' : i === 2 || i === 5 ? 'linear-gradient(180deg,#2563eb,rgba(37,99,235,.2))' : 'rgba(37,99,235,.12)' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function AISection() {
  const t = await getTranslations('Sections.AI')
  return (
    <section id="ai-section" style={{ padding: '100px 5%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
        {/* Chat mockup */}
        <div style={{ background: 'rgba(10,20,38,.9)', border: '1px solid var(--border-c)', borderRadius: 26, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.12)', transform: 'perspective(1000px) rotateY(-8deg) rotateX(3deg)', transition: 'transform .5s' }}>
          <div style={{ padding: '15px 18px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-c)', display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🤖</div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>EcoMate AI Assistant</h4>
              <p style={{ fontSize: 11, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />Online · Replies instantly</p>
            </div>
          </div>
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ alignSelf: 'flex-start', background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: '#fff', borderRadius: '13px 13px 13px 3px', padding: '10px 13px', fontSize: 12.5, maxWidth: '83%', fontFamily: 'var(--font-cairo)' }} dir="rtl">أبغي أشوف السراويل الجديدة 👖</div>
            <div style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,.06)', color: 'var(--text-main)', borderRadius: '13px 13px 3px 13px', padding: '10px 13px', fontSize: 12.5, border: '1px solid var(--border-c)', maxWidth: '83%' }}>
              أهلاً! / Hello! / Bonjour! 🔥 Here are today&apos;s Baggy Jeans:
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginTop: 8 }}>
                {[['👖','Black Baggy','3,500 DA'],['👖','Blue Wash','3,200 DA'],['👖','Cargo Grey','3,800 DA']].map(([e,n,p]) => (
                  <div key={n} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 9, padding: 9, textAlign: 'center' }}>
                    <span style={{ fontSize: 19, display: 'block', marginBottom: 3 }}>{e as string}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-sub)', display: 'block' }}>{n as string}</span>
                    <span style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 11, fontWeight: 800, color: '#10B981', display: 'block', marginTop: 2 }}>{p as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-c)', display: 'flex', gap: 9 }}>
            <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 9, padding: '9px 13px', fontSize: 12, color: 'var(--text-muted)' }}>Type in Arabic, French or English...</div>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff' }}>➤</div>
          </div>
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: 18 }}>
            <span style={{ width: 16, height: 1.5, background: '#2563eb' }} />{t('badge')}
          </div>
          <h2 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 'clamp(30px,3.8vw,52px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text-main)', marginBottom: 16, lineHeight: 1.1 }}>
            {t('title1')} <span style={{ background: 'linear-gradient(135deg,#2563eb,#93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('title2')}</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.75, marginBottom: 32 }}>{t('sub')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            {[
              { icon:'💬', iconBg:'rgba(37,99,235,.1)', title: t('features.0.title'), desc: t('features.0.desc') },
              { icon:'🛒', iconBg:'rgba(37,99,235,.1)', title: t('features.1.title'), desc: t('features.1.desc') },
              { icon:'📋', iconBg:'rgba(16,185,129,.1)', title: t('features.2.title'), desc: t('features.2.desc') },
              { icon:'🚚', iconBg:'rgba(16,185,129,.1)', title: t('features.3.title'), desc: t('features.3.desc') },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: 16, background: 'var(--bg-card)', border: '1px solid var(--border-c)', borderRadius: 13, transition: 'all .25s' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: f.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 13, fontWeight: 700, color: 'var(--text-main)', marginBottom: 3 }}>{f.title}</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-sub)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="https://wa.me/213555000000" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 15, padding: '15px 32px', textDecoration: 'none', display: 'inline-flex' }}>
            {t('cta')}
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginInlineStart: 8 }} className="rtl:rotate-180"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export async function Pricing({ plans = [] }: { plans?: any[] }) {
  const t = await getTranslations('Sections.Pricing')
  const servicesRaw = t.raw('services')
  // Depending on next-intl config, t.raw might return an object matching the JSON.
  const services = Object.keys(servicesRaw || {}).map(slug => ({
    slug,
    ...servicesRaw[slug]
  }))

  return (
    <section id="pricing" style={{ padding: '100px 5%', background: 'var(--bg-section)' }}>
      <style>{`
        details > summary {
          list-style: none; /* remove default arrow */
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: 18 }}>
          <span style={{ width: 16, height: 1.5, background: '#2563eb' }} />{t('badge')}
        </div>
        <h2 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 'clamp(30px,3.8vw,52px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text-main)', marginBottom: 16, lineHeight: 1.1 }}>
          {t('title1')} <span style={{ background: 'linear-gradient(135deg,#2563eb,#93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('title2')}</span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.75, margin: '0 auto 56px', maxWidth: 400 }}>{t('sub')}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 880, margin: '0 auto' }}>
        {services.map((service: any) => {
          const packs = Object.keys(service.packs || {}).map(k => service.packs[k])
          if (!packs.length) return null

          return (
            <details key={service.slug} style={{
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-c)', 
              borderRadius: 22, 
              overflow: 'hidden',
              transition: 'all 0.3s'
            }}>
              <summary style={{
                padding: '28px 32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontWeight: 800, fontSize: 22, color: 'var(--text-main)', fontFamily: 'var(--font-poppins), var(--font-cairo)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 26 }}>{service.icon}</span>
                  {service.title}
                </div>
                <span style={{ fontSize: 14, color: '#2563eb', fontWeight: 600 }}>{'View Packs ↓'}</span>
              </summary>
              <div style={{ padding: '0 32px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: -6 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, paddingTop: 24, paddingBottom: 24 }}>
                  {packs.map((pack: any, i: number) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, textAlign: 'center'
                    }}>
                      <div style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                        {pack.name}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18, minHeight: 20 }}>
                        {pack.desc}
                      </div>
                      <div style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 20, fontWeight: 900, color: '#10B981', marginBottom: 20 }}>
                        {pack.price}
                      </div>
                    </div>
                  ))}
                </div>
                <a href="mailto:contact@ecomate.dz" style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '14px', borderRadius: 12,
                  fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 14, fontWeight: 700,
                  background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: '#fff', textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}>
                  {packs[0]?.cta || 'Contact Us'} →
                </a>
              </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}

export async function CTA() {
  const t = await getTranslations('Sections.CTA')
  return (
    <section id="cta" style={{ background: 'linear-gradient(135deg,#1E3A8A,#1e3a8a 45%,#07101f 100%)', padding: '120px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -10%,rgba(37,99,235,.25),transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 280, background: 'radial-gradient(ellipse,rgba(16,185,129,.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <h2 style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, letterSpacing: '-.03em', color: '#fff', lineHeight: 1.1, marginBottom: 20, position: 'relative' }}>
        {t('title1')}<br />
        <span style={{ background: 'linear-gradient(135deg,#10B981,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('title2')}</span>
      </h2>
      <p style={{ fontSize: 17, color: 'rgba(255,255,255,.5)', maxWidth: 480, margin: '0 auto 46px', lineHeight: 1.7, position: 'relative' }}>
        {t('sub')}
      </p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
        <a href="mailto:contact@ecomate.dz" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 15, fontWeight: 700, color: '#07101f', background: 'linear-gradient(135deg,#fff,#e2e8f0)', borderRadius: 12, padding: '15px 34px', boxShadow: '0 4px 24px rgba(0,0,0,.3)', transition: 'all .25s', textDecoration: 'none' }}>
          {t('btn1')}
        </a>
        <a href="https://wa.me/213555000000" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-poppins), var(--font-cairo)', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,.8)', background: 'rgba(255,255,255,.07)', border: '1.5px solid rgba(255,255,255,.15)', borderRadius: 12, padding: '15px 30px', transition: 'all .25s', textDecoration: 'none' }}>
          {t('btn2')}
        </a>
      </div>
      <p style={{ fontFamily: 'var(--font-cairo), var(--font-poppins)', fontSize: 13, color: 'rgba(255,255,255,.2)', marginTop: 20, position: 'relative' }}>
        {t('footer')}
      </p>
    </section>
  )
}

export async function Footer() {
  const t = await getTranslations('Sections.Footer')
  return (
    <footer style={{ background: 'rgba(5,10,20,1)', padding: '60px 5% 30px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 52 }}>
        <div style={{ gridColumn: '1 / -1', maxWidth: 300 }}>
          <div style={{ fontFamily: 'var(--font-poppins), var(--font-cairo)', fontWeight: 800, fontSize: 22, marginBottom: 15 }}>
            <span style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Eco</span>
            <span style={{ background: 'linear-gradient(135deg,#2563eb,#10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mate</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', lineHeight: 1.7 }}>{t('desc')}</p>
          <div style={{ display: 'flex', gap: 9, marginTop: 22 }}>
            {['📘','📸','💬','💼'].map((s,i) => (
              <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, transition: 'all .2s', textDecoration: 'none' }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>© 2026 <span style={{ color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>EcoMate</span>. All rights reserved.</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>🇩🇿 Made in Algeria</p>
      </div>
    </footer>
  )
}
