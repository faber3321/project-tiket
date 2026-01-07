// Ticket Booking System JavaScript

// DOM Elements
const checkoutSection = document.getElementById('checkout');
const dashboardSection = document.getElementById('dashboard');
const ticketModal = document.getElementById('ticket-modal');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Event selection variables
let selectedEvent = null;
let selectedPrice = 0;
let ticketQuantity = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Payment method selection
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-detail').forEach(detail => {
                detail.classList.remove('active');
            });
            document.getElementById(this.value + '-details').classList.add('active');
        });
    });

    // Initialize dashboard menu
    document.querySelectorAll('.dashboard-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.dashboard-menu li').forEach(li => {
                li.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            document.querySelectorAll('.dashboard-section-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // Set current year in footer
    document.querySelector('.footer-bottom p').innerHTML = 
        `&copy; ${new Date().getFullYear()} TicketPro. All rights reserved.`;
});

// Function to select an event
function selectEvent(eventName, price) {
    selectedEvent = eventName;
    selectedPrice = price;
    
    // Update checkout section
    document.getElementById('selected-event').textContent = eventName;
    document.getElementById('summary-event').textContent = eventName;
    document.getElementById('summary-price').textContent = price.toFixed(2);
    document.getElementById('ticket-price').textContent = price.toFixed(2);
    
    updateTotal();
    
    // Show checkout section
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    checkoutSection.style.display = 'block';
    
    // Scroll to checkout
    checkoutSection.scrollIntoView({ behavior: 'smooth' });
    
    // Activate first step
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step-1').classList.add('active');
}

// Function to increase ticket quantity
function increaseQuantity() {
    const quantityInput = document.getElementById('ticket-quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) {
        quantity++;
        quantityInput.value = quantity;
        ticketQuantity = quantity;
        updateTotal();
    }
}

// Function to decrease ticket quantity
function decreaseQuantity() {
    const quantityInput = document.getElementById('ticket-quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        ticketQuantity = quantity;
        updateTotal();
    }
}

// Function to update total price
function updateTotal() {
    const totalPrice = selectedPrice * ticketQuantity;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    document.getElementById('summary-quantity').textContent = ticketQuantity;
    document.getElementById('final-total').textContent = totalPrice.toFixed(2);
}

// Function to navigate to next step in checkout
function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(s => {
        s.classList.remove('active');
    });
    document.getElementById(`step-${step}`).classList.add('active');
}

// Function to navigate to previous step in checkout
function prevStep(step) {
    document.querySelectorAll('.form-step').forEach(s => {
        s.classList.remove('active');
    });
    document.getElementById(`step-${step}`).classList.add('active');
}

// Function to complete payment
function completePayment() {
    // In a real application, this would connect to a payment gateway
    // For this demo, we'll just show success
    document.querySelectorAll('.form-step').forEach(s => {
        s.classList.remove('active');
    });
    document.getElementById('step-3').classList.add('active');
    
    // Generate a random order ID
    const orderId = 'TKT-' + new Date().getFullYear() + '-' + 
                   Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    document.getElementById('order-id').textContent = orderId;
    
    // Update ticket modal with order info
    document.getElementById('ticket-event').textContent = selectedEvent;
    document.getElementById('ticket-count').textContent = ticketQuantity;
}

// Function to show ticket modal
function showTicket() {
    ticketModal.style.display = 'block';
}

// Function to close ticket modal
function closeTicketModal() {
    ticketModal.style.display = 'none';
}

// Function to download ticket
function downloadTicket(orderId) {
    // In a real application, this would download the actual ticket
    // For this demo, we'll show an alert
    alert(`Downloading ticket for order: ${orderId}\n\nIn a real application, this would download your e-ticket.`);
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === ticketModal) {
        ticketModal.style.display = 'none';
    }
});

// Form submission handling
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Form validation would happen here in a real application
    nextStep(2);
});

// Quantity input change event
document.getElementById('ticket-quantity').addEventListener('change', function() {
    let quantity = parseInt(this.value);
    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    } else if (quantity > 10) {
        quantity = 10;
    }
    this.value = quantity;
    ticketQuantity = quantity;
    updateTotal();
});

// Add animation to elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.event-card, .stat-card, .history-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
document.querySelectorAll('.event-card, .stat-card, .history-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Initialize animations for elements already in view
setTimeout(animateOnScroll, 100);