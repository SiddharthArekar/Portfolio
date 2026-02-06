import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let hue = 0; // Global hue for dynamic color shifting

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Mouse state
        const mouse = {
            x: null,
            y: null,
            radius: 150
        };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        // Handle mouse leaving window
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; // Size between 1 and 3
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                // Random velocity
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                // Give each particle a unique color offest
                this.colorOffset = Math.random() * 360;
            }

            draw() {
                // Dynamic colorful particles
                // We'll use HSL for easy rainbow effects
                // Base color can shift over time + particle offset
                const color = `hsl(${hue + this.colorOffset}, 100%, 50%)`;

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Move particle
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;

                    const maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;

                    if (distance < maxDistance) {
                        const directionX = forceDirectionX * force * this.density * 0.5;
                        const directionY = forceDirectionY * force * this.density * 0.5;
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        init();

        const animate = () => {
            // Add trail effect by not clearing completely? 
            // Or just clean clear for crisp lines. Let's do clean clear for now.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Cycle hue over time
            hue += 0.5;

            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = dx * dx + dy * dy;

                    if (distance < 20000) {
                        opacityValue = 1 - (distance / 20000);
                        // Make line color a mix or just the global hue
                        // Using global hue ensures they all look synchronized somewhat
                        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse with EXTRA RGB
                if (mouse.x != null) {
                    let dx = particles[a].x - mouse.x;
                    let dy = particles[a].y - mouse.y;
                    let distance = dx * dx + dy * dy;
                    if (distance < 30000) {
                        opacityValue = 1 - (distance / 30000);
                        // Mouse connections are brighter/more visible
                        // spin the hue rapidly for mouse connections? or just match particle
                        ctx.strokeStyle = `hsla(${hue + particles[a].colorOffset}, 100%, 50%, ${opacityValue * 0.6})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
};

export default ParticleBackground;
