let menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
    let lists = document.querySelector(".lists");
    lists.classList.toggle("display-flex");
})



// Typed Animation
let typed = new Typed(".typed" , {
    strings: ["Front-End Developer", "UI/UX Designer", "Graphic Designer"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    backDelay: 2000,

})
// End Typed Anitmation
// about animaton
const nums = document.querySelectorAll(".num");
const statsSection = document.querySelector(".stats-container");
let hasAnimated = false;

function startCounting(element) {
    const goal = parseInt(element.getAttribute('data-goal'));
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = goal / (duration / 16); // 60 FPS

    element.classList.add('animate');
    
    const counter = setInterval(() => {
        count += increment;
        if (count >= goal) {
            element.textContent = goal;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(count);
        }
    }, 16);
}

function checkScroll() {
    if (!hasAnimated) {
        const statsTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsTop < windowHeight * 0.75) {
            nums.forEach(num => startCounting(num));
            hasAnimated = true;
        }
    }
}

// Add scroll event listener
window.addEventListener('scroll', checkScroll);

// Check initial position
checkScroll();

// Timeline Slider Functionality
document.querySelectorAll('.timeline-slider').forEach(slider => {
    const images = slider.querySelectorAll('.slider-container img');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });
});

// Portfolio Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize lightGallery for each gallery container
    document.querySelectorAll('.gallery-container').forEach(container => {
        lightGallery(container, {
            selector: '.gallery-item',
            plugins: [lgZoom, lgThumbnail],
            speed: 500,
            download: false,
            thumbnail: true,
            animateThumb: true,
            zoomFromOrigin: true,
            allowMediaOverlap: false,
            toggleThumb: true,
            appendSubHtmlTo: '.lg-outer',
            addClass: 'lg-custom-theme',
        });
    });

    // Handle "View Project" button clicks
    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const galleryId = button.getAttribute('data-gallery');
            const galleryContainer = document.getElementById(galleryId);
            if (galleryContainer) {
                // Find the first gallery item and trigger its click
                const firstItem = galleryContainer.querySelector('.gallery-item');
                if (firstItem) {
                    firstItem.click();
                }
            }
        });
    });
});

// Timeline Animation
function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize timeline animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleTimelineAnimation();
});

// Tilt Effect Function
function addTiltEffect(elements) {
    elements.forEach(element => {
        let currentX = 0;
        let currentY = 0;
        let aimX = 0;
        let aimY = 0;
        let isHovered = false;

        const smoothFactor = 0.15;

        function animate() {
            if (isHovered) {
                currentX += (aimX - currentX) * smoothFactor;
                currentY += (aimY - currentY) * smoothFactor;

                element.style.transform = `perspective(1000px) rotateX(${currentY}deg) rotateY(${currentX}deg) translateZ(10px)`;
                requestAnimationFrame(animate);
            }
        }

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            aimY = (y - centerY) / 15;
            aimX = (centerX - x) / 15;

            const mouseX = (x / rect.width) * 100;
            const mouseY = (y / rect.height) * 100;
            element.style.setProperty('--mouse-x', `${mouseX}%`);
            element.style.setProperty('--mouse-y', `${mouseY}%`);
        });

        element.addEventListener('mouseenter', () => {
            isHovered = true;
            element.style.transition = 'none';
            animate();
        });

        element.addEventListener('mouseleave', () => {
            isHovered = false;
            element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            currentX = 0;
            currentY = 0;
            aimX = 0;
            aimY = 0;
        });
    });
}

// Apply tilt effect to stat cards
const statCards = document.querySelectorAll('.stat-card');
addTiltEffect(statCards);

// Apply tilt effect to first three service cards
const serviceCards = Array.from(document.querySelectorAll('.service-card')).slice(0, 3);
addTiltEffect(serviceCards);

// Header scroll effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    const contactInput = document.querySelector('.contact-input');
    const contactContainer = document.querySelector('.contact-input-container');
    const form = document.querySelector('.contact form');

    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            contactButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update input field based on selected method
            const method = this.classList.contains('whatsapp-btn') ? 'whatsapp' : 'discord';
            
            // Update input class and placeholder
            contactInput.className = `contact-input ${method}`;
            contactInput.placeholder = method === 'whatsapp' 
                ? 'Enter your WhatsApp number (e.g., +1234567890)' 
                : 'Enter your Discord username';
            
            // Update input pattern for validation
            contactInput.pattern = method === 'whatsapp' 
                ? '^\\+?[1-9]\\d{9,14}$' 
                : '.*'; // Accept any text for Discord
            
            // Show input container with animation
            contactContainer.classList.remove('hidden');
        });
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get the active contact method
        const activeButton = document.querySelector('.contact-btn.active');
        if (!activeButton) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a contact method',
                confirmButtonColor: '#27ad82'
            });
            return;
        }
        
        // Validate contact input based on method
        const method = activeButton.classList.contains('whatsapp-btn') ? 'whatsapp' : 'discord';
        const contactValue = contactInput.value;
        
        if (method === 'whatsapp') {
            if (!/^\+?[1-9]\d{9,14}$/.test(contactValue)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter a valid WhatsApp number',
                    confirmButtonColor: '#27ad82'
                });
                return;
            }
        } else {
            if (!contactValue.trim()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter your Discord username',
                    confirmButtonColor: '#27ad82'
                });
                return;
            }
        }

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            contactMethod: method,
            contactValue: contactValue,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        

        // Create message for Telegram
        const message = `
        📩 <b>New Contact Request</b>
        
        👤 <b>Name:</b> ${formData.name}
        📧 <b>Email:</b> ${formData.email}
        📱 <b>${formData.contactMethod.charAt(0).toUpperCase() + formData.contactMethod.slice(1)}:</b> ${formData.contactValue}
        💰 <b>Budget:</b> $${formData.budget}
        
        📝 <b>Message:</b>
        ${formData.message}
        `;

        try {
            // Show loading state
            Swal.fire({
                title: 'Sending Message...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Send to Telegram bot
            const botToken = '7761272529:AAE4wE_U_5cbAYlZAGWtfYcPCiGnMv9B3yk';
            const chatId = '1770234192';
            const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            const response = await fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'I will contact you soon.',
                    confirmButtonColor: '#27ad82'
                });
                form.reset();
                contactButtons.forEach(btn => btn.classList.remove('active'));
                contactContainer.classList.add('hidden');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry, there was an error sending your message. Please try again later.',
                confirmButtonColor: '#27ad82'
            });
        }
    });
});

// Budget Input Handling
const budgetInput = document.querySelector('.budget-input input');

budgetInput.addEventListener('input', function(e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
});


