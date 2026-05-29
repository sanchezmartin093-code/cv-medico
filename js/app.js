// app.js

function setLang(lang, isInitialLoad = false) {
    // 0. Update HTML lang attribute for accessibility and screen readers
    document.documentElement.lang = lang;

    // 1. Update the active state on the buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
    });
    const activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-current', 'true');
    }

    // 2. Translate all elements with class starting with "t-"
    const elementsToTranslate = document.querySelectorAll('[class*="t-"]');
    
    elementsToTranslate.forEach(el => {
        const translation = el.getAttribute('data-' + lang);
        const langHref = el.getAttribute('data-' + lang + '-href');
        
        // Update link href if a language-specific href is provided
        if (langHref && el.tagName === 'A') {
            el.setAttribute('href', langHref);
        }
        
        if (translation) {
            if (el.tagName === 'TITLE') {
                document.title = translation;
            } else {
                if (isInitialLoad) {
                    el.innerText = translation;
                } else {
                    // Smooth fade out
                    el.style.opacity = 0;
                    
                    setTimeout(() => {
                        // Change text
                        el.innerText = translation;
                        // Fade back in
                        el.style.opacity = 1;
                    }, 200); // 200ms delay matches the CSS transition
                }
            }
        }
    });

    // 3. Save language preference in localStorage
    localStorage.setItem('preferredLang', lang);

    // 4. Remove FOUT prevention class to show translated page
    document.documentElement.classList.remove('fout-prevent');
}

// Theme Toggle Logic
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('preferredTheme', newTheme);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = newTheme === 'dark' ? 'ph-duotone ph-sun' : 'ph-duotone ph-moon';
    }
}


// Initialization on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure smooth transitions are set dynamically or via CSS
    document.querySelectorAll('[class*="t-"]').forEach(el => {
        el.style.transition = 'opacity 0.2s ease-in-out';
    });

    // Check if user has a saved language preference with defensive validation
    const savedLang = localStorage.getItem('preferredLang');
    const validLangs = ['de', 'en', 'es'];
    const activeLang = validLangs.includes(savedLang) ? savedLang : 'de';
    setLang(activeLang, true);

    // Check saved theme or OS preference
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        const themeIcon = document.getElementById('theme-icon');
        if(themeIcon) themeIcon.className = 'ph-duotone ph-sun';
    }

    // 🚀 EMIL KOWALSKI: Fade-Up Observer
    // 1. Add hidden class to elements to animate
    document.querySelectorAll('.card, .section-title, .timeline-item').forEach(el => {
        el.classList.add('reveal-hidden');
    });

    // 2. Setup Observer with cascade delay (delay increases slightly for each item in view)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cascading effect
                setTimeout(() => {
                    entry.target.classList.add('reveal-visible');
                }, delay);
                delay += 100; // 100ms offset for each consecutive element
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 3. Start observing after a tiny delay to ensure browser paints the hidden state first
    setTimeout(() => {
        document.querySelectorAll('.reveal-hidden').forEach(el => observer.observe(el));
    }, 100);

    // 🚀 PREMIUM DESIGN INJECTIONS
    
    // A. Spotlight Glow Effect on Bento Cards
    document.querySelectorAll('.bento-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // B. Magnetic Buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // C. Timeline SVG Animation (Draw on Scroll)
    const timelineSvg = document.getElementById('academic-timeline');
    const path = document.getElementById('timeline-path');
    
    if (timelineSvg && path) {
        const updatePath = () => {
            const height = timelineSvg.offsetHeight;
            // Draw a subtle elegant curve through the timeline
            path.setAttribute('d', `M 12 0 C 12 ${height*0.2}, 30 ${height*0.3}, 12 ${height*0.5} C -6 ${height*0.7}, 12 ${height*0.8}, 12 ${height}`);
            
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            return length;
        };

        let pathLength = updatePath();
        
        // Handle window resize gracefully
        window.addEventListener('resize', () => {
            pathLength = updatePath();
        });

        // Sync drawing with scroll position
        window.addEventListener('scroll', () => {
            const rect = timelineSvg.getBoundingClientRect();
            // Start drawing when timeline enters viewport, finish when it leaves
            const scrollPercent = (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.5);
            const drawPercent = Math.max(0, Math.min(1, scrollPercent));
            path.style.strokeDashoffset = pathLength - (pathLength * drawPercent);
        }, { passive: true });
        
        // Initial trigger
        window.dispatchEvent(new Event('scroll'));
    }

    // D. Email Clipboard Copy Action
    const copyBtn = document.getElementById('copy-email-btn');
    const copyText = document.getElementById('copy-btn-text');
    const copyIcon = document.getElementById('copy-icon');
    
    if (copyBtn && copyText && copyIcon) {
        copyBtn.addEventListener('click', () => {
            // Obtenemos el correo del elemento ya descifrado para evitar hardcodearlo en JS
            const emailLink = document.querySelector('.contact-email');
            const email = emailLink ? emailLink.innerText : ('sanchez' + '.martin093' + '@' + 'gmail.com');
            
            navigator.clipboard.writeText(email).then(() => {
                // Success feedback
                copyBtn.classList.add('copied');
                
                // Get active language from html tag
                const currentLang = document.documentElement.lang || 'de';
                
                // Set temporary text based on active language
                let feedbackText = "Kopiert!";
                if (currentLang === 'es') feedbackText = "¡Copiado!";
                else if (currentLang === 'en') feedbackText = "Copied!";
                
                copyText.innerText = feedbackText;
                copyIcon.className = "ph-duotone ph-check";
                
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    
                    // Revert to translation text
                    const originalText = copyBtn.getAttribute('data-' + currentLang) || "Kopieren";
                    copyText.innerText = originalText;
                    copyIcon.className = "ph-duotone ph-copy";
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }

    // 🚀 ANTI-BOT HYBRID DECRYPTION SYSTEM
    // Decrypts contact data split into fragments in the HTML
    document.querySelectorAll('.secure-data').forEach(el => {
        const type = el.getAttribute('data-type');
        const p1 = el.getAttribute('data-p1') || '';
        const p2 = el.getAttribute('data-p2') || '';
        const p3 = el.getAttribute('data-p3') || '';
        const p4 = el.getAttribute('data-p4') || '';
        
        let content = '';
        
        if (type === 'email') {
            content = p1 + p2 + '@' + p3;
            const cssClass = el.getAttribute('data-class') || '';
            el.innerHTML = `<a href="mailto:${content}" class="${cssClass}">${content}</a>`;
        } else if (type === 'phone') {
            content = p1 + p2 + p3 + p4;
            el.innerHTML = content;
        } else if (type === 'address') {
            content = p1 + '<br>' + p2 + '<br>' + p3;
            el.innerHTML = content;
        }
        
        // Remove traces from the DOM
        el.removeAttribute('data-p1');
        el.removeAttribute('data-p2');
        el.removeAttribute('data-p3');
        el.removeAttribute('data-p4');
        el.removeAttribute('data-type');
        el.removeAttribute('data-class');
        el.classList.remove('secure-data');
    });
});
