document.addEventListener('DOMContentLoaded', () => {
    // Scroll Logic
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.sticky-nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjustment for sticky header height (approx 60px) + some buffer
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Language Switching Logic
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-i18n]');

    function updateLanguage(lang) {
        if (!translations[lang]) return;

        // Update text
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update active class
        langButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', isActive);
            btn.style.opacity = isActive ? '1' : '0.6';
            btn.style.transform = isActive ? 'scale(1.2)' : 'scale(1)';
        });

        // Save preference
        localStorage.setItem('reserva_language', lang);
        document.documentElement.lang = lang;
    }

    // Init
    const savedLang = localStorage.getItem('reserva_language') || 'pt';
    const initialLang = translations[savedLang] ? savedLang : 'pt';
    updateLanguage(initialLang);

    // Click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });
});
