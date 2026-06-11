
const yesBtn = document.getElementById('yesBtn');
const celebrationMessage = document.getElementById('celebrationMessage');
const stage = document.querySelector('.proposal-stage');

yesBtn.addEventListener('click', () => {

    yesBtn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    yesBtn.style.opacity = '0';
    yesBtn.style.transform = 'scale(0.8)';
    yesBtn.disabled = true;

    const rect = yesBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    if (window.Particles) {
        window.Particles.burst(cx, cy, 80);
    }

    launchHearts(cx, cy, 30);

    // show celebration first
    setTimeout(() => {
        celebrationMessage.classList.add('show');
    }, 900);

    // show second letter after celebration
    setTimeout(() => {
        document.getElementById('secondLetter').classList.add('show');
    }, 2200);
});

/* ===============================
   HEARTS FUNCTION (OUTSIDE CLICK)
   =============================== */
function launchHearts(cx, cy, count) {
    const hearts = ['❤️', '💕', '✨', '🌸', '💖', '💗', '🌹'];
    const container = document.body;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const el = document.createElement('span');
            el.className = 'heart-particle';
            el.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            const tx = (Math.random() - 0.5) * window.innerWidth * 1.2;
            const ty = -(Math.random() * window.innerHeight * 0.9 + 80);
            const rot = (Math.random() - 0.5) * 360;
            const dur = (Math.random() * 1.5 + 2).toFixed(2);

            el.style.left = cx + 'px';
            el.style.top = cy + 'px';
            el.style.setProperty('--tx', tx + 'px');
            el.style.setProperty('--ty', ty + 'px');
            el.style.setProperty('--rot', rot + 'deg');
            el.style.setProperty('--duration', dur + 's');

            container.appendChild(el);

            setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 200);
        }, i * 45);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeLetter');
    const letterPopup = document.getElementById('secondLetter');

    if (closeBtn && letterPopup) {
        closeBtn.addEventListener('click', () => {
            letterPopup.classList.remove('show');
        });
    }
});