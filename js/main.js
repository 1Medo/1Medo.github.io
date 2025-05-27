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
                : 'Enter your Discord username (e.g., username#1234)';
            
            // Update input pattern for validation
            contactInput.pattern = method === 'whatsapp' 
                ? '^\\+?[1-9]\\d{9,14}$' 
                : '^.{3,32}#[0-9]{4}$';
            
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
            alert('Please select a contact method');
            return;
        }
        
        // Validate contact input based on method
        const method = activeButton.classList.contains('whatsapp-btn') ? 'whatsapp' : 'discord';
        const contactValue = contactInput.value;
        
        if (method === 'whatsapp') {
            if (!/^\+?[1-9]\d{9,14}$/.test(contactValue)) {
                alert('Please enter a valid WhatsApp number');
                return;
            }
        } else {
            if (!/^.{3,32}#[0-9]{4}$/.test(contactValue)) {
                alert('Please enter a valid Discord username (e.g., username#1234)');
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
New Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Contact Method: ${formData.contactMethod}
Contact: ${formData.contactValue}
Budget: $${formData.budget}
Message: ${formData.message}
        `;

        try {
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
                alert('Message sent successfully! I will contact you soon.');
                form.reset();
                contactButtons.forEach(btn => btn.classList.remove('active'));
                contactContainer.classList.add('hidden');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        }
    });
});

// Budget Input Handling
const budgetInput = document.querySelector('.budget-input input');

budgetInput.addEventListener('input', function(e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Format the number with commas
    if (this.value) {
        const number = parseInt(this.value);
        this.value = number.toLocaleString();
    }
});

budgetInput.addEventListener('focus', function() {
    // Remove commas when focused for easier editing
    this.value = this.value.replace(/,/g, '');
});

budgetInput.addEventListener('blur', function() {
    // Add commas back when not focused
    if (this.value) {
        const number = parseInt(this.value.replace(/,/g, ''));
        this.value = number.toLocaleString();
    }
});

