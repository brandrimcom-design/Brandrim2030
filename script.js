// Initialize AOS
AOS.init({ 
  duration: 800, 
  once: false,
  mirror: true,
  offset: 50
});

// ===== Translation Data =====
const translations = {
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    privacy: 'سياسة الخصوصية',
    services: 'الخدمات',
    contact: 'تواصل معنا',
    heroTitle: 'مرحباً بك في',
    heroSpan: 'Brandrim',
    heroDesc: 'حلول رقمية متكاملة لتطوير أعمالك',
    aboutContent: '<p>نحن منصة Brandrim، نقدم حلولاً رقمية مبتكرة منذ 2020. فريقنا من خبراء التسويق والتصميم والتطوير يساعدك على تحقيق النجاح الرقمي. رؤيتنا هي تمكين رواد الأعمال من الوصول إلى العالمية.</p>',
    privacyContent: '<p>نحن نلتزم بحماية بياناتك. جميع المعلومات الشخصية التي تشاركها معنا تستخدم فقط لتحسين خدماتك. لن يتم بيع أو مشاركة بياناتك مع أي طرف ثالث دون موافقتك. للمزيد، تواصل معنا.</p>',
    contactContent: '<p>يمكنك التواصل معنا عبر:<br>📞 0698490007<br>✉️ brandrim.com@gmail.com<br>🌐 من خلال وسائل التواصل الاجتماعي أعلاه.</p>'
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    privacy: 'Confidentialité',
    services: 'Services',
    contact: 'Contact',
    heroTitle: 'Bienvenue chez',
    heroSpan: 'Brandrim',
    heroDesc: 'Solutions numériques intégrées pour développer votre entreprise',
    aboutContent: '<p>Nous sommes Brandrim, une plateforme proposant des solutions numériques innovantes depuis 2020. Notre équipe d\'experts en marketing, design et développement vous aide à réussir dans le monde numérique. Notre vision est de permettre aux entrepreneurs d\'atteindre une envergure mondiale.</p>',
    privacyContent: '<p>Nous nous engageons à protéger vos données. Toutes les informations personnelles que vous partagez avec nous sont uniquement utilisées pour améliorer nos services. Vos données ne seront ni vendues ni partagées avec des tiers sans votre consentement. Pour plus d\'informations, contactez-nous.</p>',
    contactContent: '<p>Contactez-nous :<br>📞 0698490007<br>✉️ brandrim.com@gmail.com<br>🌐 Via nos réseaux sociaux ci-dessus.</p>'
  },
  en: {
    home: 'Home',
    about: 'About Us',
    privacy: 'Privacy Policy',
    services: 'Services',
    contact: 'Contact',
    heroTitle: 'Welcome to',
    heroSpan: 'Brandrim',
    heroDesc: 'Integrated digital solutions to grow your business',
    aboutContent: '<p>We are Brandrim, a platform providing innovative digital solutions since 2020. Our team of marketing, design, and development experts helps you achieve digital success. Our vision is to empower entrepreneurs to reach a global scale.</p>',
    privacyContent: '<p>We are committed to protecting your data. All personal information you share with us is used solely to improve our services. Your data will not be sold or shared with any third party without your consent. For more information, contact us.</p>',
    contactContent: '<p>Contact us via:<br>📞 0698490007<br>✉️ brandrim.com@gmail.com<br>🌐 Through our social media links above.</p>'
  }
};

let currentLang = 'ar';

function updateLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  
  document.getElementById('homeBtn').innerText = translations[lang].home;
  document.getElementById('aboutBtn').innerText = translations[lang].about;
  document.getElementById('privacyBtn').innerText = translations[lang].privacy;
  document.querySelector('a[href="#services"]').innerText = translations[lang].services;
  document.getElementById('contactBtn').innerText = translations[lang].contact;
  
  document.querySelector('.hero h1 span').innerText = translations[lang].heroSpan;
  document.querySelector('.hero h1').innerHTML = `${translations[lang].heroTitle} <span>${translations[lang].heroSpan}</span>`;
  document.querySelector('.hero p').innerText = translations[lang].heroDesc;
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) btn.classList.add('active');
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    updateLanguage(btn.dataset.lang);
  });
});

// Modal functionality
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function showModal(title, content) {
  modalTitle.innerText = title;
  modalBody.innerHTML = content;
  modal.classList.add('active');
}

document.getElementById('aboutBtn').addEventListener('click', () => {
  showModal(translations[currentLang].about, translations[currentLang].aboutContent);
});
document.getElementById('privacyBtn').addEventListener('click', () => {
  showModal(translations[currentLang].privacy, translations[currentLang].privacyContent);
});
document.getElementById('contactBtn').addEventListener('click', () => {
  showModal(translations[currentLang].contact, translations[currentLang].contactContent);
});
// Footer links
document.getElementById('privacyFooter')?.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(translations[currentLang].privacy, translations[currentLang].privacyContent);
});
document.getElementById('aboutFooter')?.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(translations[currentLang].about, translations[currentLang].aboutContent);
});
document.getElementById('contactFooter')?.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(translations[currentLang].contact, translations[currentLang].contactContent);
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// Cart & WhatsApp with promo code
let cartItems = [];

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.service-card');
    const name = card.dataset.name || card.querySelector('.card-title')?.innerText || 'خدمة';
    const price = card.dataset.price || '0';
    cartItems.push({ name, price: parseInt(price) });
    document.querySelector('.cart-count').innerText = cartItems.length;
    btn.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-cart-plus"></i> أضف للسلة';
    }, 1000);
  });
});

document.getElementById('cartIcon').addEventListener('click', (e) => {
  e.preventDefault();
  if (cartItems.length === 0) {
    alert('السلة فارغة، أضف بعض الخدمات أولاً.');
    return;
  }

  const promoCode = prompt('أدخل كود الخصم (إن وجد):', '');
  let discount = 0;
  if (promoCode === 'BRANDRIM10') {
    discount = 0.10;
    alert('تم تطبيق خصم 10%');
  } else if (promoCode && promoCode !== '') {
    alert('الكود غير صحيح. سيتم المتابعة بدون خصم.');
  }

  let subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  let total = subtotal;
  if (discount > 0) {
    total = subtotal * (1 - discount);
  }

  let message = 'مرحباً، أريد طلب الخدمات التالية:\n';
  cartItems.forEach((item, index) => {
    message += `${index+1}- ${item.name} (${item.price} درهم)\n`;
  });
  message += `المجموع الفرعي: ${subtotal} درهم\n`;
  if (discount > 0) {
    message += `الخصم (10%): ${subtotal * discount} درهم\n`;
  }
  message += `الإجمالي: ${total} درهم`;

  const whatsappUrl = `https://wa.me/0698490007?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const city = document.getElementById('city').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const orderType = document.getElementById('orderType').value;

  const message = `*طلب تواصل جديد*\nالاسم: ${fullName}\nالمدينة: ${city}\nالهاتف: ${phone}\nالبريد: ${email}\nنوع الطلب: ${orderType}`;
  const whatsappUrl = `https://wa.me/0698490007?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  
  e.target.reset();
  alert('تم إرسال طلبك عبر واتساب، سيتم التواصل معك قريباً.');
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Dark mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id], [id]');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-menu a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
});

// Initialize language
updateLanguage('ar');