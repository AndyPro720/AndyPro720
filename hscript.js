$(document).ready(function() {
   
    //background canvas setup
    const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let orbs = [];
        let mouseX = 0;
        let mouseY = 0;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Initialize Particles
        function initParticles() {
            particles = [];
            for (let i = 0; i < 50; i++) { //set particle count
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1
                });
            }
        }

        // Initialize Glassmorphism Orbs
        function initOrbs() {
            orbs = [];
            for (let i = 0; i < 10; i++) { //orb count
                orbs.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 200 + 150,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    color: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 80}, 255, 0.08)`
                });
            }
        }

        function animate() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw glassmorphism orbs
            orbs.forEach(orb => {
                orb.x += orb.vx;
                orb.y += orb.vy;

                if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.vx *= -1;
                if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.vy *= -1;

                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
                gradient.addColorStop(0, orb.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            // Draw particles on top
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse interaction
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    p.x -= dx * 0.01;
                    p.y -= dy * 0.01;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(157, 143, 255, 0.8)';
                ctx.fill();

                // Draw connections between particles
                particles.forEach(p2 => {
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    
                    if (dist2 < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(157, 143, 255, ${0.3 * (1 - dist2 / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        // Initialize and start
        initParticles();
        initOrbs();
        animate();

    // --- Section Navigation ---
    const sections = ['#home', '#about', '#services', '#portfolio', '#contact'];
    let touchStartY = 0;
    let touchEndY = 0;
    // --- FIX: Added missing variable declarations ---
    let isThrottled = false; 
    let currentSectionIndex = 0;
    // --- END FIX ---

    // --- Preloader (UPDATED with Fail-safe) ---
    let preloaderFaded = false;
    function hidePreloader() {
        if (!preloaderFaded) {
            preloaderFaded = true;
            $('#preloader').fadeOut(500);
        }
    }

    // 1. Hide on load (ideal case)
    $(window).on('load', function() {
        hidePreloader();

        // --- FIX: Moved Animated Headline Logic to window.load ---
        // This ensures fonts are loaded and height calculation is correct
        (function() {
            const animationDelay = 2500;
            const $wordsWrapper = $('.animated-headline .words-wrapper');
            const $words = $wordsWrapper.find('b');
            
            // Check if there are words to animate
            if ($words.length > 1) {
                // --- FIX: Use outerHeight(true) to include margins if any ---
                const wordHeight = $words.eq(0).outerHeight(); 
                let currentIndex = 0;

                // Clone first word and append it to the end for a seamless loop
                $words.eq(0).clone().appendTo($wordsWrapper);

                function animateWords() {
                    currentIndex++;
                    const newTransform = `translateY(-${currentIndex * wordHeight}px)`;
                    
                    $wordsWrapper.css('transition', 'transform 0.5s ease-in-out');
                    $wordsWrapper.css('transform', newTransform);

                    // Check if we're at the cloned word
                    if (currentIndex === $words.length) {
                        setTimeout(() => {
                            // Reset to the beginning without an animation
                            $wordsWrapper.css('transition', 'none');
                            $wordsWrapper.css('transform', 'translateY(0)');
                            currentIndex = 0; // Reset index
                        }, 500); // Must match CSS transition duration
                    }
                }

                setInterval(animateWords, animationDelay);
            }
        })();
        // --- END FIX ---
    });

    // 2. Fail-safe: Hide after 3 seconds anyway
    setTimeout(hidePreloader, 3000);
    // --- END PRELOADER UPDATE ---

    // --- Menu Toggle ---
    const $menuBtn = $('.menu-btn');
    const $navOverlay = $('.nav-overlay');
    const $closeBtn = $('.close-btn'); // --- FIX: Get close button ---
    
    $menuBtn.on('click', function() {
        // $menuBtn.toggleClass('open'); // --- OPTIMIZATION: Removed unused class toggle ---
        $navOverlay.toggleClass('open');

        // --- NEW: Focus management ---
        if ($navOverlay.hasClass('open')) {
            // Set focus to first link after transition
            setTimeout(() => {
                $navOverlay.find('ul li a').first().focus();
            }, 700); // Match CSS transition duration
        }
        // --- END NEW ---
    });
    
    // --- FIX: Close button click handler ---
    $closeBtn.on('click', function() {
        $navOverlay.removeClass('open');
        $menuBtn.focus(); // --- NEW: Return focus
    });
    // --- END FIX ---
    
    // --- Navigation Logic ---
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        
        // Set active section
        $('.section').removeClass('active');
        $(targetId).addClass('active');
        
        // Update URL hash
        window.location.hash = targetId;
        
        // Update current section index
        currentSectionIndex = sections.indexOf(targetId);

        // --- NEW: Hide/Show Scroll Indicator ---
        if (currentSectionIndex === 0) {
            $('.scroll-indicator').fadeIn(300);
        } else {
            $('.scroll-indicator').fadeOut(300);
        }
        // --- END NEW ---

        // Close menu
        // $menuBtn.removeClass('open'); // --- OPTIMIZATION: Removed unused class ---
        $navOverlay.removeClass('open');
        $menuBtn.focus(); // --- NEW: Return focus
    });
    
    // --- Check for Hash on Load ---
    const currentHash = window.location.hash;
    if (currentHash && $(currentHash).length) {
        $('.section').removeClass('active');
        $(currentHash).addClass('active');
        currentSectionIndex = sections.indexOf(currentHash); // Set index
    } else {
        // Default to home if no hash
        $('#home').addClass('active');
        currentSectionIndex = 0; // Set index
    }

    // --- NEW: Set initial scroll indicator state ---
    if (currentSectionIndex === 0) {
        $('.scroll-indicator').show();
    } else {
        $('.scroll-indicator').hide();
    }
    // --- END NEW ---

    // --- Mouse Wheel "Scroll" Navigation ---
    $(window).on('wheel', function(e) {
        if (isThrottled) return;
        // --- FIX: Prevent scrolling if menu is open ---
        if ($navOverlay.hasClass('open')) return;
        // --- END FIX ---

        isThrottled = true;
        
        const delta = e.originalEvent.deltaY;
        
        if (delta > 0) {
            currentSectionIndex++;
        } else {
            currentSectionIndex--;
        }
        
        currentSectionIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex));
        
        const targetId = sections[currentSectionIndex];
        $('.section').removeClass('active');
        $(targetId).addClass('active');
        window.location.hash = targetId;
        
        // --- NEW: Hide/Show Scroll Indicator ---
        if (currentSectionIndex === 0) {
            $('.scroll-indicator').fadeIn(300);
        } else {
            $('.scroll-indicator').fadeOut(300);
        }
        // --- END NEW ---

        setTimeout(() => {
            isThrottled = false;
        }, 750); // --- FIX: Faster scroll throttle (550ms) ---
    });

    // --- FIX: Touch Swipe Navigation for Mobile ---
    $(window).on('touchstart', function(e) {
        if ($navOverlay.hasClass('open')) return;
        touchStartY = e.originalEvent.touches[0].clientY;
    });

    $(window).on('touchend', function(e) {
        if ($navOverlay.hasClass('open')) return;
        touchEndY = e.originalEvent.changedTouches[0].clientY;
        handleSwipe();
    });

    function handleSwipe() {
        if (isThrottled) return;

        // Check for significant swipe
        if (Math.abs(touchStartY - touchEndY) > 50) { // 50px threshold
            isThrottled = true;

            if (touchStartY > touchEndY) {
                // Swiped Up
                currentSectionIndex++;
            } else {
                // Swiped Down
                currentSectionIndex--;
            }

            // Clamp index
            currentSectionIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex));
            
            // Navigate
            const targetId = sections[currentSectionIndex];
            $('.section').removeClass('active');
            $(targetId).addClass('active');
            window.location.hash = targetId;
            
            // --- NEW: Hide/Show Scroll Indicator ---
            if (currentSectionIndex === 0) {
                $('.scroll-indicator').fadeIn(300);
            } else {
                $('.scroll-indicator').fadeOut(300);
            }
            // --- END NEW ---

            // Reset throttle
            setTimeout(() => {
                isThrottled = false;
            }, 550); // --- FIX: Faster scroll throttle (550ms) ---
        }
    }
    // --- END FIX ---


    // --- FIX: Re-engineered Animated Headline Logic (Ticker) ---
    /* --- MOVED TO $(window).on('load', ...) --- */
    // --- END FIX ---


    // Only run this for non-touch devices
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
        const $bg = $('#interactive-bg');
        let frame;

        $(window).on('mousemove', (e) => {
            if (frame) {
                cancelAnimationFrame(frame);
            }
            frame = requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const x = Math.round((clientX / window.innerWidth) * 100);
                const y = Math.round((clientY / window.innerHeight) * 100);
                
                // --- FIX: Brighter, colored gradient "spotlight" ---
                /* --- MODIFIED: Shrunk radius for a smaller hover area --- */
                $bg.css('background', `radial-gradient(circle at ${x}% ${y}%,rgba(140, 25, 25, 0.87) 0%, rgba(67, 53, 160, 0.21) 3%, transparent 10%)`);
            });
        });
    } else {
        // On touch devices, just remove the element
        // --- CLARIFICATION ---
        // NOTE: The radial gradient "light" effect is *only* for mouse movement.
        // It is intentionally disabled on touch devices as there is no "mousemove" event.
        // The ":active" styles in the CSS (which you can test by tapping & holding a button) 
        // handle the "tap" feedback for buttons and links.
        $('#interactive-bg').remove();
    }
    // --- END FIX ---


    // --- Swiper.js Initialization (3D Carousel) ---
    if ($('#portfolio-swiper').length) {
        var swiper = new Swiper('#portfolio-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 45,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

});