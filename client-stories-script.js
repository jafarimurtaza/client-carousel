document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.querySelector('.dots-container');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    // Dynamically create dots
    function createDots() {
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot'; // Use className instead of classList for simpler assignment
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dotsContainer.appendChild(dot);

            // Add click event to each dot
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updateCarousel() {
        pauseVideos();
        const offset = -currentIndex * 100; // Assuming each slide is 100% width
        carouselInner.style.transform = `translateX(${offset}%)`;
        updateDots(); // Update the dots to reflect the current slide
    }

    function pauseVideos() {
        const iframes = carouselInner.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            // Sending a postMessage to the iframe to pause the video
            iframe.contentWindow.postMessage('{"method":"pause"}', '*');
        });
    }

    // Event listeners for the arrows to be loopable
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    // Initialize the carousel
    createDots();
    updateCarousel();
});
