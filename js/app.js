// app.js

function setLang(lang, isInitialLoad = false) {
    // 0. Update HTML lang attribute for accessibility and screen readers
    document.documentElement.lang = lang;

    // 1. Update the active state on the buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');

    // 2. Translate all elements with class starting with "t-"
    const elementsToTranslate = document.querySelectorAll('[class*="t-"]');
    
    elementsToTranslate.forEach(el => {
        const translation = el.getAttribute('data-' + lang);
        
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
}

// Theme Toggle Logic
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('preferredTheme', newTheme);
    
    // Update icon
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) themeBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
}


// Initialization on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure smooth transitions are set dynamically or via CSS
    document.querySelectorAll('[class*="t-"]').forEach(el => {
        el.style.transition = 'opacity 0.2s ease-in-out';
    });

    // Check if user has a saved language preference
    const savedLang = localStorage.getItem('preferredLang') || 'de'; // Default to German
    setLang(savedLang, true);

    // Check saved theme or OS preference
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        const themeBtn = document.getElementById('theme-toggle');
        if(themeBtn) themeBtn.innerText = '☀️';
    }
});
