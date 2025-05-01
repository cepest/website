(function() {
  "use strict";

  /** Easy selector helper function */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /** Easy event listener function */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /** Easy on scroll event listener */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /** Navbar links active state on scroll */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /** Scrolls to an element with header offset */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /** Back to top button */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true);

  /* Scroll with ofset on page load with hash links in the url */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /* Hero type effect */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /* Skills animation */
  let skilsContent = select('.bars');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.bar .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /* Animation on scroll */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /* Initiate Pure Counter */
  new PureCounter();
  
  
})()

//Services section - Modal
const serviceModals = document.querySelectorAll(".service-modal");
const learnmoreBtns = document.querySelectorAll(".learn-more-btn");
const modalCloseBtns = document.querySelectorAll(".modal-close-btn");
var modal = function(modalClick){
    serviceModals[modalClick].classList.add("active");
}
learnmoreBtns.forEach((learnmoreBtn, i) => {
    learnmoreBtn.addEventListener("click", () => {
        modal(i)
    });
});
modalCloseBtns.forEach((modalCloseBtn) => {
    modalCloseBtn.addEventListener("click", () => {
        serviceModals.forEach((modalView) => {
            modalView.classList.remove("active");
        });
    });
});

// Portfolio Tab Filter
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".data-tab");
  filterButtons.forEach((li) => {
    li.addEventListener("click", function() {
      const filterValue = this.getAttribute("data-filter");
      // Remove active class from all buttons
      filterButtons.forEach(li => {
        li.classList.remove("active");
      });      
      // Add active class to the clicked button
      this.classList.add("active");
      const portfolioItems  = document.querySelectorAll(".portfolio-item");
      portfolioItems .forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

//Portfolio section - Modal
const portfolioModals = document.querySelectorAll(".portfolio-model");
const imgCards = document.querySelectorAll(".img-card");
const portfolioCloseBtns = document.querySelectorAll(".portfolio-close-btn");
var portfolioModal = function(modalClick){
    portfolioModals[modalClick].classList.add("active");
}
imgCards.forEach((imgCard, i) => {
    imgCard.addEventListener("click", () => {
        portfolioModal(i)
    });
});
portfolioCloseBtns.forEach((portfolioCloseBtn) => {
    portfolioCloseBtn.addEventListener("click", () => {
        portfolioModals.forEach((portfolioModalView) => {
            portfolioModalView.classList.remove("active");
        });
    });
});

/* Initiate portfolio lightbox */
const portfolioLightbox = GLightbox({
  selector: '.portfolio-lightbox'
});

/* Portfolio details slider */
new Swiper('.portfolio-details-slider', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});

//portfolio data - Swiper
var swiper = new Swiper(".portfolio-data-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



/* Testimonials slider */
new Swiper('.testimonials-slider', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

//Website dark/light theme
const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeBtn.classList.toggle("sun");
    localStorage.setItem("saved-theme", getCurrentTheme());
    localStorage.setItem("saved-icon", getCurrentIcon());
});
const getCurrentTheme = () => document.body.classList.contains("dark-theme") ? "dark" : "light";
const getCurrentIcon = () => themeBtn.classList.contains("sunn") ? "sun" : "moon";
const savedTheme = localStorage.getItem("saved-theme");
const savedIcon = localStorage.getItem("saved-Icon");
if(savedTheme){
    document.body.classList[savedTheme === "dark" ? "dark" : "remove"]("dark-theme");
    themeBtn.classList[savedIcon === "sun"? "add" : "remove"]("sunn");
}

//Navigation menu items active on page scroll
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollY = window.pageYOffset; 

    sections.forEach(current => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let id = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
        }
        else{
            document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
        }
    });
});

//Responsive navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");
menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});
closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});
navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});

//Scroll reveal animations

//Common reveal options to create reveal animations
ScrollReveal({
    //reset: true,
    distance: '60px',
    duration: 2500,
    delay: 100
});
// 

// //Navigation bar effects on scroll
// window.addEventListener("scroll", function(){
//     const header = document.querySelector("header");
//     header.classList.toggle("sticky", window.scrollY > 0);
// });

// // Target elements, and specify options to create reveal animations
// ScrollReveal().reveal('.home .info h2, .section-title-01, .section-title-02', { delay: 50, origina: 'left' });
// ScrollReveal().reveal('.home .info h3 .home .info p, .about-inf btn', { delay: 100, origina: 'right' });
// ScrollReveal().reveal('.home .info btn', { delay: 100, origina: 'bottom' });
// ScrollReveal().reveal('.media-icons i, .contact-left li', { delay: 100, origina: 'left', interval: 50 });
// ScrollReveal().reveal('.home-img, .about-img', { delay: 100, origina: 'bottom' });
// ScrollReveal().reveal('.about .description, .contact-right', { delay: 200, origina: 'right' });
// ScrollReveal().reveal('.about .professional-list li', { delay: 100, origina: 'right', interval: 50 });
// ScrollReveal().reveal('.skills-description, .service-description, .contact-card, .client-swiper, .contact-left h2', { delay: 200, origina: 'left' });
// ScrollReveal().reveal('.experience-card, .service-card, .education, .portfolio .img-card', { delay: 200, origina: 'bottom', interval: 50 });
// ScrollReveal().reveal('footer .group', { delay: 200, origina: 'top', interval: 100 });
