document.addEventListener('DOMContentLoaded', () => {
    // Set the current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Set up the rotating header banner if enabled
    if (config.headerImage && config.headerImage.enabled) {
        setupHeaderImages();
    } else {
        const headerImage = document.getElementById('header-image');
        if (headerImage) headerImage.style.display = 'none';
    }

    loadContent();
});

function setupHeaderImages() {
    const headerContainer = document.getElementById('header-image');
    const images = config.headerImage.images || [];

    if (!Array.isArray(images) || images.length === 0) {
        headerContainer.style.display = 'none';
        return;
    }

    headerContainer.innerHTML = '';

    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `header-slide ${index === 0 ? 'active' : ''}`;

        const img = new Image();
        img.onload = () => { slide.style.backgroundImage = `url('${image.path}')`; };
        img.onerror = () => {
            console.error(`Failed to load image: ${image.path}`);
            slide.style.backgroundColor = '#f0f0f0';
        };
        img.src = image.path;

        slide.setAttribute('aria-label', image.altText || `Header image ${index + 1}`);
        headerContainer.appendChild(slide);
    });

    const anim = config.headerImage.animation;
    if (anim && anim.enabled && images.length > 1) {
        const interval = anim.interval || 5000;
        const transitionSpeed = anim.transitionSpeed || 1000;

        document.querySelectorAll('.header-slide').forEach(slide => {
            slide.style.transition = `opacity ${transitionSpeed}ms ease-in-out`;
        });

        let currentSlide = 0;
        setInterval(() => {
            const slides = document.querySelectorAll('.header-slide');
            if (slides.length > 1) {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
        }, interval);
    }
}

async function loadContent() {
    showLoading(true);
    try {
        for (const [section, filePath] of Object.entries(config.files)) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`Failed to load ${filePath}`);
                const markdown = await response.text();
                const sectionElement = document.getElementById(section);
                if (sectionElement) sectionElement.innerHTML = marked.parse(markdown);
            } catch (error) {
                console.error(`Error loading section ${section}:`, error);
            }
        }
    } catch (error) {
        console.error('Error loading content:', error);
        document.querySelector('main').innerHTML =
            '<p>Error loading content. Please check the console for details.</p>';
    } finally {
        showLoading(false);
    }
}

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}
