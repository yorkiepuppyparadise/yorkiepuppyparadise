// Smooth scroll for menu links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Puppy filter buttons
const filterButtons = document.querySelectorAll('.puppy-filters button');
const puppyCards = document.querySelectorAll('.puppy-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    puppyCards.forEach(card => {
      if(filter === 'all' || card.dataset.gender === filter){
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Autoplay Testimonials Slider
const slider = document.querySelector('.testimonial-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => { isDown = false; });
slider.addEventListener('mouseup', () => { isDown = false; });
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

// Fade-in animation when cards enter viewport
const testimonialCards = document.querySelectorAll('.testimonial-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.animation = 'fadeUp 1s forwards';
    }
  });
}, { threshold: 0.2 });

testimonialCards.forEach(card => observer.observe(card));

// Optional: autoplay scroll (looping)
let scrollAmount = 0;
setInterval(() => {
  scrollAmount += 300;
  if(scrollAmount >= slider.scrollWidth) scrollAmount = 0;
  slider.scrollTo({left: scrollAmount, behavior: 'smooth'});
}, 4000);


document.addEventListener('DOMContentLoaded', () => {

  const testimonialCards = document.querySelectorAll('.testimonial-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.animation = 'fadeUp 1s forwards';
      }
    });
  }, { threshold: 0.2 });

  testimonialCards.forEach(card => observer.observe(card));

});


document.addEventListener('DOMContentLoaded', () => {

  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('successToast');

  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value.trim();
    const gender = document.getElementById('puppy-gender').value;
    const message = document.getElementById('message').value.trim();

    // Auto-fill currency example
    let currency = 'GBP';
    if(country === 'USA') currency = 'USD';
    else if(country === 'Canada') currency = 'CAD';
    else if(country === 'Australia') currency = 'AUD';

    // Construct WhatsApp message
    let text = `Hello! My name is ${name}.%0A`;
    text += `Phone: ${phone}%0A`;
    text += `Country: ${country}%0A`;
    text += `City/Region: ${city}%0A`;
    text += `Preferred Puppy Gender: ${gender}%0A`;
    text += `Currency: ${currency}%0A`;
    text += `Message: ${message}`;

    // WhatsApp URL
    const whatsappURL = `https://wa.me/447951892125?text=${text}`;

    // Show success toast
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
  });

});

// PREMIUM: Show "Message Sent Successfully" animation
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const successToast = document.getElementById('successToast');

  contactForm.addEventListener('submit', function(e){
    // Small delay to allow WhatsApp link to open first
    setTimeout(() => {
      // Show success animation
      successToast.style.display = 'block';
      successToast.style.opacity = 0;
      successToast.style.transform = 'translateY(-20px)';
      
      // Animate fade-in
      let op = 0;
      let pos = -20;
      const fadeIn = setInterval(() => {
        if(op >= 1){
          clearInterval(fadeIn);
          // Fade out after 3 seconds
          setTimeout(() => {
            let fadeOut = setInterval(() => {
              if(op <= 0){
                clearInterval(fadeOut);
                successToast.style.display = 'none';
              }
              op -= 0.05;
              pos -= 1;
              successToast.style.opacity = op;
              successToast.style.transform = `translateY(${pos}px)`;
            }, 20);
          }, 3000);
        }
        op += 0.05;
        pos += 1;
        successToast.style.opacity = op;
        successToast.style.transform = `translateY(${pos}px)`;
      }, 20);
    }, 500);
  });
});

// ===== SCROLL ANIMATIONS ON VIEWPORT =====
const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-left, .scroll-right, .scroll-zoom');

const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      // Optional: unobserve for performance
      scrollObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

scrollElements.forEach(el => scrollObserver.observe(el));

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Show button when user scrolls down 300px
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollTopBtn.style.opacity = "1";
  } else {
    scrollTopBtn.style.opacity = "0";
  }
};

// Scroll smoothly to top when clicked
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto'; // ensure it's clickable
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none'; // disable when hidden
    }
  });

  // Smooth scroll to top on click
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const floatingNotice = document.getElementById("floatingNotice");
  const gotItBtn = document.getElementById("gotItBtn");

  // Smooth scroll to Contact section
  gotItBtn.addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    // Hide the floating notice after clicking
    floatingNotice.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const floatingNotice = document.getElementById("floatingNotice");
  const gotItBtn = document.getElementById("gotItBtn");
  const closeBtn = document.getElementById("closeNotice");

  // Smooth scroll to Contact section when clicking Got it!
  gotItBtn.addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    floatingNotice.style.display = "none"; // hide notice after click
  });

  // Close the notice when clicking X
  closeBtn.addEventListener("click", () => {
    floatingNotice.style.display = "none";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const floatingNotice = document.getElementById("floatingNotice");
  const gotItBtn = document.getElementById("gotItBtn");
  const closeBtn = document.getElementById("closeNotice");

  if (!floatingNotice || !gotItBtn || !closeBtn) return; // safety check

  // Close panel when clicking X
  closeBtn.addEventListener("click", () => {
    floatingNotice.style.display = "none";
  });

  // Scroll smoothly to Contact when clicking Got it!
  gotItBtn.addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    floatingNotice.style.display = "none"; // hide panel after click
  });
});

// Smooth scroll when nav links clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

