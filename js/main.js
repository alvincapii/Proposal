/* ============================================
   main.js — Logic for index.html (main timeline page)
   ============================================ */

// ---- Page transition helper ----
function navigateTo(url) {
    const overlay = document.getElementById('transitionOverlay');
    overlay.classList.add('fade-out');
    setTimeout(() => { window.location.href = url; }, 600);
}

// ---- Landing -> Main transition ----
const beginBtn     = document.getElementById('beginBtn');
const heroSection  = document.getElementById('hero');
const mainContent  = document.getElementById('mainContent');

beginBtn.addEventListener('click', () => {
    heroSection.style.transition = 'opacity 0.9s ease';
    heroSection.style.opacity    = '0';
    setTimeout(() => {
        heroSection.classList.add('hidden');
        mainContent.classList.remove('hidden');
        window.scrollTo({ top: 0 });
        checkReveal(); // trigger visible elements immediately
    }, 900);
});

// ---- Scroll Reveal ----
function checkReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal, { passive: true });

// ---- Memory Modal ----
// Data for each timeline memory.
// Add more objects here to add more memories.
const memories = {
    m1: {
        src:     'https://via.placeholder.com/800x600/2d1b33/f8b4c4?text=The+First+Chat',
        caption: 'October 14, 2023 — The night everything started.'
    },
    m2: {
        src:     'https://via.placeholder.com/800x600/2d1b33/f8b4c4?text=Midnight+Calls',
        caption: 'December 24, 2023 — Closer than ever despite the miles.'
    },
    m3: {
        src:     'https://via.placeholder.com/800x600/2d1b33/f8b4c4?text=The+Moment',
        caption: 'March 12, 2024 — The laugh that sealed everything.'
    },
};

const modal      = document.getElementById('modal');
const modalImg   = document.getElementById('modalImg');
const modalCap   = document.getElementById('modalCaption');
const closeBtn   = document.querySelector('.close-modal');

window.openModal = function (id) {
    const data = memories[id];
    if (!data) return;
    modalImg.src      = data.src;
    modalCap.textContent = data.caption;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
};

function closeModalFn() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModalFn);
modal.addEventListener('click', e => { if (e.target === modal) closeModalFn(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalFn(); });

// ---- Navigate to proposal page ----
const proposalBtn = document.getElementById('proposalBtn');
if (proposalBtn) {
    proposalBtn.addEventListener('click', () => {
        navigateTo('proposal.html');
    });
}