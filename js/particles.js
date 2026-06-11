/* ============================================
   particles.js — Reusable ambient particle system
   Import and call initParticles() on any page.
   ============================================ */

(function () {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor(options = {}) {
            this.reset(options);
        }

        reset(options = {}) {
            this.x      = options.x      ?? Math.random() * canvas.width;
            this.y      = options.y      ?? Math.random() * canvas.height;
            this.size   = options.size   ?? Math.random() * 1.5 + 0.4;
            this.speedX = options.speedX ?? (Math.random() - 0.5) * 0.35;
            this.speedY = options.speedY ?? (Math.random() - 0.5) * 0.35;
            this.color  = options.color  ?? `rgba(240, 200, 215, ${Math.random() * 0.35 + 0.1})`;
            this.life   = options.life   ?? null; // null = infinite
            this.age    = 0;
        }

        update() {
            this.x   += this.speedX;
            this.y   += this.speedY;
            this.age += 1;

            // Wrap around edges
            if (this.x > canvas.width)  this.x = 0;
            if (this.x < 0)             this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0)             this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        isDead() {
            return this.life !== null && this.age > this.life;
        }
    }

    function init(count = 80) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => !p.isDead());
        particles.forEach(p => { p.update(); p.draw(); });
        animFrameId = requestAnimationFrame(animate);
    }

    /**
     * Burst of festive heart/dot particles from a given point.
     * @param {number} originX
     * @param {number} originY
     * @param {number} count
     */
    function burst(originX, originY, count = 40) {
        const colors = [
            'rgba(255, 120, 150, 0.9)',
            'rgba(255, 180, 200, 0.9)',
            'rgba(255, 220, 230, 0.9)',
            'rgba(255, 255, 255, 0.7)',
        ];
        for (let i = 0; i < count; i++) {
            const angle  = Math.random() * Math.PI * 2;
            const speed  = Math.random() * 3 + 1;
            particles.push(new Particle({
                x:      originX,
                y:      originY,
                size:   Math.random() * 4 + 1.5,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed - Math.random() * 2,
                color:  colors[Math.floor(Math.random() * colors.length)],
                life:   100 + Math.random() * 60,
            }));
        }
    }

    // Public API
    window.Particles = { init, animate, burst };

    // Auto-start
    resize();
    init();
    animate();
    window.addEventListener('resize', resize);
})();