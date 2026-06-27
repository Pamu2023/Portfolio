/* ==================== CHANGE BACKGROUND HEADER ==================== */
const scrollHeader = () => {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/* ==================== MOBILE MENU ==================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* Menu Show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Menu Hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Remove Menu Mobile when clicking a link */
const navLink = document.querySelectorAll('.nav-link');
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 100,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active');
        } else {
            sectionsClass.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active-reveal');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
window.addEventListener('load', revealOnScroll);

/* ==================== WORK FILTERS ==================== */
const filterItems = document.querySelectorAll('.work-item');
const workCards = document.querySelectorAll('.work-card');

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        filterItems.forEach(i => i.classList.remove('active-work'));
        // Add active class to clicked item
        item.classList.add('active-work');

        const filterValue = item.getAttribute('data-filter');

        workCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hide-work');
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide-work');
                } else {
                    card.classList.add('hide-work');
                }
            }
        });
        
        // Retrigger scroll animations for newly visible elements
        setTimeout(revealOnScroll, 100);
    });
});
