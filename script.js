// Sticky navbar functionality
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '8px 4%'; // Adjusted padding for pixel-perfect alignment
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)'; // Adjusted shadow for closer match
    } else {
        navbar.style.padding = '15px 5%';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Cart redirect functionality
document.getElementById('cart-icon').addEventListener('click', function() {
    window.location.href = '/cart';
});

// Mobile menu toggle
document.getElementById('hamburger').addEventListener('click', function() {
    const navItems = document.getElementById('nav-items');
    navItems.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to create a glowing effect on the device image
    const deviceImg = document.getElementById('device-img');
    deviceImg.src = "images/333.png"; // Replace placeholder with actual device image

    // Add subtle animation to badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseover', () => {
            badge.style.transform = 'scale(1.05)';
            badge.style.transition = 'transform 0.3s ease';
        });
        badge.addEventListener('mouseout', () => {
            badge.style.transform = 'scale(1)';
        });
    });

    // Check for mobile view and set background color
    if (window.innerWidth <= 576) {
        document.body.style.backgroundColor = '#050c1b';

        // Ensure unique handling for each container
        const productContainer = document.getElementById('product-container');
        const mainContainer = document.getElementById('main-container');

        if (productContainer) productContainer.style.display = 'none';
        if (mainContainer) mainContainer.style.display = 'none';
    }

    // Share button functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewItem = this.closest('.review-item');
            const reviewText = reviewItem.querySelector('.review-text')?.textContent || '';
            const reviewTitle = reviewItem.querySelector('.review-title')?.textContent || '';

            if (navigator.share) {
                navigator.share({
                    title: reviewTitle,
                    text: reviewText,
                    url: window.location.href,
                }).catch(error => {
                    console.error('Error sharing:', error);
                });
            } else {
                alert('Share functionality: ' + reviewTitle + '\n' + reviewText);
            }
        });
    });

    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn:not(.prev):not(.next):not(.dots)');
    const prevButton = document.querySelector('.page-btn.prev');
    const nextButton = document.querySelector('.page-btn.next');

    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updatePaginationState();
            console.log('Loading page:', this.textContent);
        });
    });

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (this.disabled) return;
            const activeButton = document.querySelector('.page-btn.active');
            const prevPageButton = activeButton.previousElementSibling;

            if (prevPageButton && !prevPageButton.classList.contains('prev')) {
                activeButton.classList.remove('active');
                prevPageButton.classList.add('active');
                updatePaginationState();
                console.log('Loading previous page:', prevPageButton.textContent);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (this.disabled) return;
            const activeButton = document.querySelector('.page-btn.active');
            let nextPageButton = activeButton.nextElementSibling;

            if (nextPageButton && nextPageButton.classList.contains('dots')) {
                nextPageButton = nextPageButton.nextElementSibling;
            }

            if (nextPageButton && !nextPageButton.classList.contains('next')) {
                activeButton.classList.remove('active');
                nextPageButton.classList.add('active');
                updatePaginationState();
                console.log('Loading next page:', nextPageButton.textContent);
            }
        });
    }

    function updatePaginationState() {
        const activeButton = document.querySelector('.page-btn.active');
        if (prevButton) {
            prevButton.disabled = activeButton.textContent === '1';
        }
        if (nextButton) {
            const lastPageButton = document.querySelector('.page-btn:not(.prev):not(.next):not(.dots):last-child');
            nextButton.disabled = activeButton === lastPageButton;
        }
    }

    updatePaginationState();

    // Responsive adjustments
    function handleResponsive() {
        const width = window.innerWidth;
        const thumbnailGallery = document.querySelector('.thumbnail-gallery');

        if (width < 768) {
            const thumbnails = thumbnailGallery.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumbnail, index) => {
                if (index > 3) {
                    thumbnail.style.display = 'none';
                }
            });
        } else {
            const thumbnails = thumbnailGallery.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumbnail => {
                thumbnail.style.display = 'block';
            });
        }
    }

    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});