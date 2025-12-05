document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Animation Library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic'
    });

    // 2. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger bars
            if(isActive) {
                hamburger.children[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                hamburger.children[1].style.opacity = "0";
                hamburger.children[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
                body.style.overflow = 'hidden';
            } else {
                hamburger.children[0].style.transform = "none";
                hamburger.children[1].style.opacity = "1";
                hamburger.children[2].style.transform = "none";
                body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.children[0].style.transform = "none";
                hamburger.children[1].style.opacity = "1";
                hamburger.children[2].style.transform = "none";
                body.style.overflow = 'auto';
            });
        });
    }

    // 3. Social Dropdown Toggle (Desktop)
    const shareBtn = document.getElementById('shareBtn');
    const shareDropdown = document.getElementById('shareDropdown');

    if (shareBtn && shareDropdown) {
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            shareDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking anywhere else
        document.addEventListener('click', (e) => {
            if (!shareBtn.contains(e.target) && !shareDropdown.contains(e.target)) {
                shareDropdown.classList.remove('show');
            }
        });
    }

    // 4. Smart Header (Hide on scroll down, show on scroll up)
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            header.style.transform = 'translateY(0)';
        }
        else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll Down
            header.style.transform = 'translateY(-100%)';
            if(shareDropdown) shareDropdown.classList.remove('show');
        } 
        else {
            // Scroll Up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
        }
        lastScroll = currentScroll;
    });

    // 5. Universal Tab System
    const setupTabs = () => {
        const tabContainers = document.querySelectorAll('.tabs-container');
        
        tabContainers.forEach(container => {
            const buttons = container.querySelectorAll('.tab-btn');
            const panels = container.querySelectorAll('.tab-panel');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    buttons.forEach(b => b.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));
                    
                    btn.classList.add('active');
                    
                    const targetId = btn.getAttribute('data-target');
                    const targetPanel = container.querySelector(targetId);
                    
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                });
            });
        });
    };
    setupTabs();

    // 6. SKILLS MODAL LOGIC (New)
    const skillCards = document.querySelectorAll('.skill-card');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    // Open Modal
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const modal = document.getElementById(`modal-${category}`);
            if (modal) {
                modal.classList.add('active');
                body.style.overflow = 'hidden'; // Stop scrolling
            }
        });
    });

    // Close Modal via X button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(m => m.classList.remove('active'));
            body.style.overflow = 'auto'; // Resume scrolling
        });
    });

    // Close Modal via clicking outside
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    });

    // 7. Contact Form Simulation
    const form = document.querySelector('.cyber-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Transmitting...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerText = 'Transmission Successful';
                btn.style.background = 'var(--green)';
                btn.style.color = 'var(--navy)';
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = 'transparent';
                    btn.style.color = 'var(--green)';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});