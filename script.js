/* Shineflo Scripts */

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  
  // Update desktop nav
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').includes(name) || a.id === `nav-${name}`) {
      a.classList.add('active');
    }
  });

  // Update mobile nav
  document.querySelectorAll('.mob-nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').includes(name) || a.id === `mob-nav-${name}`) {
      a.classList.add('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveal, 100);
  closeMenu();
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

initReveal();

window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', scrollY > 60);
});

/* Mobile Menu Logic */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.getElementById('menuOverlay').classList.add('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('menuOverlay').classList.remove('open');
}


/* Contact Form Handle */
function handleSubmit(btn, event) {
  if (event) event.preventDefault();
  btn.textContent = 'Sending…'; 
  btn.disabled = true;
  
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#12976a,#16c38a)';
    setTimeout(() => { 
      btn.textContent = 'Send Message →'; 
      btn.disabled = false; 
      btn.style.background = ''; 
    }, 3000);
  }, 1800);
}
