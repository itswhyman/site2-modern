/**
 * Site 2 – Modern Beauty Studio (Blush Pink / Deep Plum)
 */
window.SITE_DEFAULTS = {
  siteKey: 'beauty_site2_modern',
  business: {
    name: 'Aura Studio',
    tagline: 'Modern güzellik. Cesur stil.',
    logoText: 'AURA',
    logoImage: null,
    phone: '0533 111 22 33',
    whatsapp: '905331112233',
    email: 'merhaba@aurastudio.com',
    address: 'Nişantaşı, Teşvikiye Cad. No:45, Şişli / İstanbul',
    hours: 'Her gün 10:00 – 21:00',
    social: { instagram: 'https://instagram.com/', facebook: '', tiktok: 'https://tiktok.com/' }
  },
  colors: {
    primary: '#E84A7F',
    primaryDark: '#C23A68',
    secondary: '#4A1942',
    accent: '#2D1B2E',
    text: '#F5F0F2',
    textLight: '#C9B8C0',
    bg: '#1A0F1C',
    white: '#FFFFFF',
    dark: '#0D080E',
    card: '#241528'
  },
  hero: {
    title: 'Güzelliğini Yeniden Tanımla',
    subtitle: 'Son teknoloji cihazlar ve yaratıcı ekibimizle kendine özel bir dönüşüm yaşa.',
    ctaText: 'Hemen Randevu',
    ctaLink: '#iletisim',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80',
    overlay: 0.5
  },
  about: {
    title: 'Aura farkı',
    text: 'Sadece hizmet değil, deneyim satıyoruz. Her randevuda hijyen, şeffaflık ve sonuç odaklı yaklaşım.',
    features: ['Sterilizasyon garantisi', 'Şeffaf fiyatlandırma', 'Sonuç odaklı protokoller', 'Trend takipçisi ekip'],
    image: 'https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=800&q=80'
  },
  services: [
    { id: 's1', icon: '01', title: 'Lazer Epilasyon', desc: 'Alexandrite & Diode teknolojisi ile kalıcı sonuçlar.', price: '1.200 ₺’den', duration: '30-60 dk', visible: true },
    { id: 's2', icon: '02', title: 'Cilt Gençleştirme', desc: 'Hydrafacial, mezoterapi ve medikal cilt bakımları.', price: '1.800 ₺’den', duration: '60 dk', visible: true },
    { id: 's3', icon: '03', title: 'Dudak & Kaş Tasarımı', desc: 'Kalıcı makyaj ve microblading uygulamaları.', price: '2.800 ₺’den', duration: '2 saat', visible: true },
    { id: 's4', icon: '04', title: 'Nail Art & Protez', desc: 'Trend renkler, jel ve özel tasarımlar.', price: '450 ₺’den', duration: '45 dk', visible: true },
    { id: 's5', icon: '03', title: 'Saç & Renk', desc: 'Balayage, ombre, keratin ve profesyonel kesimler.', price: '750 ₺’den', duration: '90 dk', visible: true },
    { id: 's6', icon: '06', title: 'Spa & Masaj', desc: 'Rahatlatıcı masajlar ve aromaterapi seansları.', price: '900 ₺’den', duration: '50 dk', visible: true }
  ],
  gallery: [
    { id: 'g1', url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80', alt: 'Studio' },
    { id: 'g2', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80', alt: 'Bakım' },
    { id: 'g3', url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', alt: 'Makyaj' },
    { id: 'g4', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', alt: 'Cilt' },
    { id: 'g5', url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80', alt: 'Spa' },
    { id: 'g6', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', alt: 'Detay' }
  ],
  testimonials: [
    { id: 't1', text: 'Lazer sonrası sonuçlar inanılmaz. Ekip çok profesyonel.', name: 'Ayşe Y.', rating: 5 },
    { id: 't2', text: 'Hydrafacial denedim, cildim haftalarca ışıltılı kaldı.', name: 'Ceren B.', rating: 5 },
    { id: 't3', text: 'Modern atmosfer ve samimi yaklaşım. Kesinlikle tavsiye.', name: 'Elif S.', rating: 5 }
  ],
  seo: {
    title: 'Aura Studio | Modern Güzellik Stüdyosu',
    description: 'Nişantaşı’nda modern güzellik, lazer, cilt bakımı ve daha fazlası.'
  },
  admin: { user: 'admin', pass: 'admin123' }
};
