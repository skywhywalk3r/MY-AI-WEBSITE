document.addEventListener('DOMContentLoaded', () => {
  // 1. Свечение за курсором (фон + карточки)
  const spotlight = document.getElementById('spotlight');
  const cards = document.querySelectorAll('.glass-box');

  window.addEventListener('mousemove', (e) => {
    if (spotlight) {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    }

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });

  // 2. Наклон 3D-карты в Hero
  const tiltCard = document.getElementById('tiltCard');
  if (tiltCard) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      tiltCard.style.transform = `rotateX(${-y * 15}deg) rotateY(${x * 15}deg) scale(1.02)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
  }

  // 3. Плавное появление при скролле
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

  // 4. Модалка открытия счёта
  const modal = document.getElementById('modal');
  const openBtns = document.querySelectorAll('[data-modal-open]');
  const closeBtns = document.querySelectorAll('[data-modal-close]');
  const form = document.getElementById('accountForm');
  const formDone = document.getElementById('formDone');

  if (modal) {
    openBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    closeBtns.forEach((btn) => btn.addEventListener('click', closeModal));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      formDone.style.display = 'block';
    });
  }

  // 5. Фильтрация на странице cases.html
  const filterBtns = document.querySelectorAll('.filters__btn');
  const caseItems = document.querySelectorAll('[data-cat]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const category = btn.dataset.filter;

      caseItems.forEach((item) => {
        if (category === 'all' || item.dataset.cat === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});