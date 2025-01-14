// Mobile menu functionality
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Slider functionality
const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}); 

// Слайдер отзывов
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let interval;

    // Создаем точки
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    slider.after(dotsContainer);

    // Добавляем точки для каждого слайда
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    // Инициализация первого слайда
    slides[0].classList.add('active');

    // Функция для перехода к определенному слайду
    function goToSlide(index) {
        // Убираем предыдущий активный слайд
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        dotsContainer.children[currentSlide].classList.remove('active');

        // Устанавливаем новый активный слайд
        currentSlide = index;
        slides[currentSlide].classList.remove('prev');
        slides[currentSlide].classList.add('active');
        dotsContainer.children[currentSlide].classList.add('active');

        // Сбрасываем и запускаем таймер заново
        clearInterval(interval);
        startAutoSlide();
    }

    // Функция для показа следующего слайда
    function showNextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    // Функция для автоматического переключения слайдов
    function startAutoSlide() {
        interval = setInterval(showNextSlide, 5000);
    }

    // Запускаем автоматическое переключение
    startAutoSlide();

    // Останавливаем автопереключение при наведении мыши
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', startAutoSlide);
}

// Инициализация слайдера при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsSlider();
}); 