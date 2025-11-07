document.addEventListener("DOMContentLoaded", () => {
    
    // Find the new canvas
    const canvas = document.getElementById('hero-canvas');
    
    // Only run if the canvas exists on this page
    if (canvas) {
       const ctx = canvas.getContext('2d');
        let mouse = { x: 0, y: 0 };
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (particles.length > 0) {
                initParticles();
            }
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Particle System
        class Particle {
            constructor(x, y, color) {
                this.homeX = x;
                this.homeY = y;
                this.x = x;
                this.y = y;
                this.vx = 0;
                this.vy = 0;
                this.color = color;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = Math.max(100 - dist, 0) / 100;

                // Push away from mouse
                if (dist < 150) {
                    this.vx -= (dx / dist) * force * 3;
                    this.vy -= (dy / dist) * force * 3;
                }

                // Pull back to home position
                this.vx += (this.homeX - this.x) * 0.05;
                this.vy += (this.homeY - this.y) * 0.05;
                
                // Apply friction
                this.vx *= 0.95;
                this.vy *= 0.95;

                // Update position
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const brightness = Math.max(255 - dist, 100);
                
                ctx.fillStyle = `rgba(${brightness}, ${brightness * 0.7}, 255, 0.8)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

       function initParticles() {
    particles = [];
    if (canvas.width === 0 || canvas.height === 0) return;
    
    const text1 = "Hey, I'm Angaj!";
    const text2 = "Web Developer";
    
    // 1. Set Responsive Font Size
    let fontSize;
    if (canvas.width <= 768) { // Mobile
        fontSize = 40; 
    } else if (canvas.width <= 1200) { // Tablet
        fontSize = 60;
    } else { // Desktop
        fontSize = 80;
    }
    
    ctx.font = `bold ${fontSize}px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
    ctx.fillStyle = 'white'; // This color is temporary, for sampling
    
    // 2. Calculate True Centering (The Fix)
    // This measures the text width to find the real center
    const text1Width = ctx.measureText(text1).width;
    const text2Width = ctx.measureText(text2).width;
    
    const textX1 = (canvas.width - text1Width) / 2;
    const textX2 = (canvas.width - text2Width) / 2;
    
    // Adjust line vertical position based on font size
    const textY1 = canvas.height / 2 - (fontSize * 0.7);
    const textY2 = canvas.height / 2 + (fontSize * 0.7);
    
    // Draw the text
    ctx.fillText(text1, textX1, textY1);
    ctx.fillText(text2, textX2, textY2);
                
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 3. Optimize Particle Density for Mobile
    // Use a denser sampling on phones (smaller step -> more particles).
    // Balance quality vs performance using devicePixelRatio and width.
    const dpr = window.devicePixelRatio || 1;
    let pixelStep;
    if (canvas.width <= 480) { // small phones
        pixelStep = 2; // denser on small phones
    } else if (canvas.width <= 768) { // phones / large phones
        pixelStep = 2; // denser on phones than before (was 5)
    } else if (canvas.width <= 1200) { // tablet
        pixelStep = 3;
    } else { // desktop
        pixelStep = 3;
    }
    
    for (let y = 0; y < imageData.height; y += pixelStep) {
        for (let x = 0; x < imageData.width; x += pixelStep) {
            const i = (y * imageData.width + x) * 4;
            if (imageData.data[i + 3] > 128) { // Check alpha channel
                particles.push(new Particle(x, y, `rgba(${imageData.data[i]},${imageData.data[i+1]},${imageData.data[i+2]},1)`));
            }
        }
    }
} 

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            requestAnimationFrame(animate);
        }

        // Initialize - wait for canvas to be ready
        setTimeout(() => {
            initParticles();
            animate();
        }, 100); 
    }
});