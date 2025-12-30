const CONFIG = {
    photosPath: 'photos/'
};

// ==================== LISTA ZDJĘĆ ====================

const FEATURED_PHOTOS = [
    "MG_2704.jpg",
    "ARK_8694.jpg",
    "MG_7313-2.jpg",
    "ARK_4477.jpg",
    "ARK_7707.jpg",
    "MG_7426.jpg",
    "ARK_9428.jpg"
];

const OTHER_PHOTOS = [
    "ARK_0075.jpg",
    "ARK_0151.jpg",
    "ARK_0321.jpg",
    "ARK_0356.jpg",
    "ARK_0600.jpg",
    "ARK_0703.jpg",
    "ARK_0883.jpg",
    "ARK_0981.jpg",
    "ARK_1047.jpg",
    "ARK_1208.jpg",
    "ARK_1421.jpg",
    "ARK_2115.jpg",     // ← NOWE
    "ARK_2827.jpg",     // ← NOWE
    "ARK_2888.jpg",     // ← NOWE
    "ARK_3054.jpg",     // ← NOWE
    "ARK_3168.jpg",
    "ARK_3376.jpg",
    "ARK_3915.jpg",
    "ARK_4453.jpg",
    "ARK_5036.jpg",
    "ARK_5385.jpg",
    "ARK_5557.jpg",     // ← NOWE
    "ARK_5780.jpg",
    "ARK_5902.jpg",     // ← NOWE
    "ARK_6096.jpg",
    "ARK_7513.jpg",
    "ARK_7823.jpg",     // ← NOWE
    "ARK_7980.jpg",     // ← NOWE
    "ARK_8130.jpg",
    "ARK_8191.jpg",
    "ARK_8297.jpg",     // ← NOWE
    "ARK_8578.jpg",
    "ARK_8896.jpg",
    "ARK_8958.jpg",
    "ARK_8960.jpg",
    "ARK_9178.jpg",
    "ARK_9336.jpg",
    "ARK_9541.jpg",
    "ARK_9805.jpg",
    "ARK_9807.jpg",
    "ARK_9898.jpg",
    "MG_3646.jpg",
    "MG_5475.JPG",
    "MG_8169.jpg",
    "MG_8902-3.jpg",
    "received_199295564626802.jpeg",
    "received_314890515835703.jpeg",
    "received_399376437321004.jpeg",
    "received_550384375812018.jpeg",
    "received_710304273122863.jpeg"
];
// Funkcja do losowego mieszania tablicy (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Połącz: pierwsze 7 stałe + reszta losowa
const PHOTO_LIST = [...FEATURED_PHOTOS, ...shuffleArray(OTHER_PHOTOS)];

// ==================== TŁUMACZENIA ====================
const TRANSLATIONS = {
    pl: {
        scroll: 'Przewiń',
        aboutTitle: 'O Mnie',
        aboutText: 'Hej! Jestem Ola, mam 24 lata i od 7 lat zajmuję się fotografią, głównie eventową. Najbardziej lubię łapać prawdziwe momenty i emocje, które sprawiają, że zdjęcia mają swój klimat i historię. Chętnie podejmuję się nowych wyzwań i zapraszam do współpracy - razem stworzymy coś wyjątkowego!',
        copyright: '© 2024 Olkahopdoworka Photography. Wszelkie prawa zastrzeżone.',
        prevImage: 'Poprzednie',
        nextImage: 'Następne',
        close: 'Zamknij',
        backToTop: 'Powrót na górę',
        pageTitle: 'Olkahopdoworka Photography',
        pageDescription: 'Portfolio fotograficzne Olkahopdoworka'
    },
    en: {
        scroll: 'Scroll',
        aboutTitle: 'About Me',
        aboutText: "Hey! I'm Ola, I'm 24 years old and I've been doing photography for 7 years, mainly event photography. I love capturing real moments and emotions that give photos their unique atmosphere and story. I'm always open to new challenges and I invite you to collaborate - together we'll create something extraordinary!",
        copyright: '© 2024 Olkahopdoworka Photography. All rights reserved.',
        prevImage: 'Previous',
        nextImage: 'Next',
        close: 'Close',
        backToTop: 'Back to top',
        pageTitle: 'Olkahopdoworka Photography',
        pageDescription: 'Photography portfolio by Olkahopdoworka'
    }
};

// ==================== ZMIENNE GLOBALNE ====================
let currentImageIndex = 0;
let images = [];
let currentLanguage = 'en';
let isMobile = window.innerWidth <= 768;

// ==================== WYKRYWANIE URZĄDZENIA ====================
function checkMobile() {
    isMobile = window.innerWidth <= 768 ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
    return isMobile;
}

// ==================== WYKRYWANIE JĘZYKA ====================
function detectLanguage() {
    const browserLanguage = navigator.language || navigator.userLanguage || 'en';

    if (browserLanguage.toLowerCase().startsWith('pl')) {
        return 'pl';
    }

    if (navigator.languages) {
        for (let lang of navigator.languages) {
            if (lang.toLowerCase().startsWith('pl')) {
                return 'pl';
            }
        }
    }

    return 'en';
}

function applyTranslations() {
    currentLanguage = detectLanguage();
    const translations = TRANSLATIONS[currentLanguage];

    document.documentElement.lang = currentLanguage;
    document.title = translations.pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', translations.pageDescription);
    }

    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.setAttribute('aria-label', translations.backToTop);
    }

    const closeBtn = document.querySelector('.close-lightbox');
    if (closeBtn) {
        closeBtn.setAttribute('aria-label', translations.close);
    }

    const prevBtn = document.querySelector('.lightbox-prev');
    if (prevBtn) {
        prevBtn.setAttribute('aria-label', translations.prevImage);
    }

    const nextBtn = document.querySelector('.lightbox-next');
    if (nextBtn) {
        nextBtn.setAttribute('aria-label', translations.nextImage);
    }
}

// ==================== INICJALIZACJA ====================
document.addEventListener('DOMContentLoaded', function() {
    checkMobile();
    applyTranslations();
    initLoadingScreen();
    loadGallery();
    setupLightbox();
    setupScrollProgress();
    setupBackToTop();
    setupScrollIndicator();
    setupParallax();

    window.addEventListener('resize', debounce(() => {
        checkMobile();
    }, 250));
});

// ==================== DEBOUNCE ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== LOADING SCREEN ====================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');

    let progress = 0;
    const totalDuration = 1000;
    const intervalTime = 50;
    const steps = totalDuration / intervalTime;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    let currentStep = 0;

    const interval = setInterval(() => {
        currentStep++;
        const linearProgress = currentStep / steps;
        progress = easeOutQuart(linearProgress) * 100;
        loadingProgress.style.width = Math.min(progress, 100) + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 200);
        }
    }, intervalTime);
}

// ==================== ŁADOWANIE GALERII ====================
function loadGallery() {
    const gallery = document.getElementById('gallery');

    PHOTO_LIST.forEach((photoName, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.03}s`;

        const img = document.createElement('img');
        img.src = `${CONFIG.photosPath}${photoName}`;
        img.alt = 'Olkahopdoworka Photography';
        img.loading = 'lazy';
        img.dataset.index = index;

        img.onerror = function() {
            this.parentElement.style.display = 'none';
        };

        item.appendChild(img);
        gallery.appendChild(item);
    });
}

// ==================== LIGHTBOX ====================
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevArrow = document.querySelector('.lightbox-prev');
    const nextArrow = document.querySelector('.lightbox-next');

    setTimeout(() => {
        images = Array.from(document.querySelectorAll('.gallery-item img'))
            .filter(img => img.complete && img.naturalHeight !== 0);

        images.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentImageIndex = index;
                openLightbox(this.src);
            });
        });
    }, 2000);

    closeLightbox.addEventListener('click', closeLightboxFunc);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    prevArrow.addEventListener('click', showPrevImage);
    nextArrow.addEventListener('click', showNextImage);

    // Touch gestures
    let touchStartX = 0;
    let touchStartY = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            diffX > 0 ? showNextImage() : showPrevImage();
        }
    }, { passive: true });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape': closeLightboxFunc(); break;
            case 'ArrowLeft': showPrevImage(); break;
            case 'ArrowRight': showNextImage(); break;
        }
    });
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightboxImage').src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightboxCounter();
}

function closeLightboxFunc() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.style.opacity = '1';
    }, 150);
    updateLightboxCounter();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.style.opacity = '1';
    }, 150);
    updateLightboxCounter();
}

function updateLightboxCounter() {
    document.getElementById('lightboxCounter').textContent =
        `${currentImageIndex + 1} / ${images.length}`;
}

// ==================== SCROLL PROGRESS ====================
function setupScrollProgress() {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + '%';
    }, { passive: true });
}

// ==================== BACK TO TOP ====================
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== SCROLL INDICATOR ====================
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
        }, { passive: true });
    }
}

// ==================== PARALLAX EFFECT ====================
function setupParallax() {
    if (isMobile) return;

    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
            header.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }, { passive: true });
}