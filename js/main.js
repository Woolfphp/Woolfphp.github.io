// Interações simples do portfólio
document.addEventListener('DOMContentLoaded', function () {
  // Atualiza ano no footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle do menu mobile
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      const isOpen = !expanded;
      mainNav.dataset.open = isOpen ? 'true' : 'false';
      // animação visual do hamburger
      this.classList.toggle('open');
    });
  }

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
          // fecha menu mobile se estiver aberto
          if (mainNav && mainNav.dataset.open === 'true') {
            mainNav.dataset.open = 'false';
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Validação simples do formulário
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
      }
      // Simular envio
      alert('Obrigado, ' + name + '! Sua mensagem foi recebida (simulação).');
      form.reset();
    });
  }

  // Tema: escuro como padrão. Se o usuário salvou 'light' em localStorage, aplica classe .light
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.body.classList.add('light');
    } else {
      // padrão: dark (no class), já controlado por :root no CSS
      document.body.classList.remove('light');
    }
  } catch (e) {
    // ignore localStorage errors
  }

  // Typing animation for hero name with a pause after the first word ("Gustavo")
  (function runTyping() {
    const typedEl = document.getElementById('typed-name');
    const accentWrap = document.querySelector('.accent');
    if (!typedEl) return;
    const parts = ['Gustavo', ' Rocha'];
    const delay = 80; // ms per char
    const startDelay = 700; // initial delay before typing (during which caret pre-animates)
    const pauseAfterFirst = 600; // pause after "Gustavo" before typing the rest
    let partIndex = 0;
    let charIndex = 0;
    typedEl.textContent = '';

    // Use the typed element to host pretyping state via class (pseudo-element ::after will act as caret)
    typedEl.classList.add('pretyping');

    function typeStep() {
      const current = parts[partIndex];
      if (charIndex < current.length) {
        const previous = parts.slice(0, partIndex).join('');
        typedEl.textContent = previous + current.slice(0, charIndex + 1);
        charIndex++;
        setTimeout(typeStep, delay);
      } else {
        partIndex++;
        charIndex = 0;
        if (partIndex < parts.length) {
          setTimeout(typeStep, pauseAfterFirst);
        } else {
          // finished all parts -> hold, then delete and restart the typing loop
          const holdDelay = 5000; // ms to wait before deleting
          const deleteDelay = 80; // ms per char when deleting (adjusted)
          // start hold timer
          setTimeout(function () {
            // delete loop
            (function deleteLoop() {
              const s = typedEl.textContent || '';
              if (s.length > 0) {
                typedEl.textContent = s.slice(0, -1);
                setTimeout(deleteLoop, deleteDelay);
              } else {
                // after deletion, restart with pretyping animation
                partIndex = 0;
                charIndex = 0;
                typedEl.classList.add('pretyping');
                // small pause before re-typing
                setTimeout(function () {
                  typedEl.classList.remove('pretyping');
                  typeStep();
                }, startDelay);
              }
            })();
          }, holdDelay);
        }
      }
    }

    // After the pre-typing time, remove pretyping state and start typing
    setTimeout(function () {
      typedEl.classList.remove('pretyping');
      typeStep();
    }, startDelay);
  })();

  // Copiar e-mail ao clicar no link de contato (usa Clipboard API com fallback)
  (function setupEmailCopy() {
    const emailLink = document.querySelector('.contact-top-email .email-link, .contact-email .email-link');
    if (!emailLink) return;

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }

    emailLink.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href') || '';
      const email = href.startsWith('mailto:') ? href.replace(/^mailto:/i, '') : (this.dataset && this.dataset.email) || (this.querySelector('.email-text') ? this.querySelector('.email-text').textContent.trim() : this.textContent.trim());
      if (!email) return;

      const prevTitle = this.getAttribute('title') || '';
      const emailTextEl = this.querySelector('.email-text');
      const prevText = emailTextEl ? emailTextEl.textContent : null;

      const didCopy = (text) => {
        if (emailTextEl) emailTextEl.textContent = 'Copiado!';
        this.setAttribute('title', 'E-mail copiado para a área de transferência');
        // restaurar após 2s
        setTimeout(() => {
          if (emailTextEl && prevText !== null) emailTextEl.textContent = prevText;
          this.setAttribute('title', prevTitle);
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => didCopy(email)).catch(() => { fallbackCopy(email); didCopy(email); });
      } else {
        fallbackCopy(email);
        didCopy(email);
      }
    });
  })();
});