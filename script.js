/* =========================================================================
   FIXRIGHT HOME MAINTENANCE — SCRIPT.JS
   -------------------------------------------------------------------------
   Plain, beginner-friendly JavaScript. Each section below does one job and
   is commented so you can find and edit it easily.

   1. Page loader
   2. Sticky header shadow on scroll
   3. Mobile hamburger + sidebar menu
   4. Scroll-reveal animations
   5. Contact form (placeholder submit handler)
   6. Auto-update footer year
   ========================================================================= */


/* =========================================================================
   1. PAGE LOADER
   Hides the loader shortly after the page finishes loading so visitors
   never stare at it for too long, even on a fast connection.
   ========================================================================= */
window.addEventListener("load", function () {
  const loader = document.getElementById("page-loader");

  // Small delay so the loader is visible just long enough to feel intentional,
  // not so long that it slows people down. Change 500 to any millisecond value.
  setTimeout(function () {
    loader.classList.add("loader-hidden");
  }, 100);
});


/* =========================================================================
   2. STICKY HEADER SHADOW ON SCROLL
   Adds a soft shadow to the header once the page has been scrolled down,
   so it looks flat and clean at the very top of the page.
   ========================================================================= */
const siteHeader = document.getElementById("siteHeader");

function updateHeaderShadow() {
  if (window.scrollY > 10) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
}

window.addEventListener("scroll", updateHeaderShadow);
updateHeaderShadow(); // run once on page load in case the page opens mid-scroll


/* =========================================================================
   3. MOBILE HAMBURGER + SIDEBAR MENU
   ========================================================================= */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileSidebar = document.getElementById("mobileSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
const sidebarLinks = document.querySelectorAll(".sidebar-link, .sidebar-cta");

function openSidebar() {
  mobileSidebar.classList.add("is-open");
  sidebarOverlay.classList.add("is-visible");
  hamburgerBtn.classList.add("is-active");
  hamburgerBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden"; // stops background scrolling while menu is open
}

function closeSidebar() {
  mobileSidebar.classList.remove("is-open");
  sidebarOverlay.classList.remove("is-visible");
  hamburgerBtn.classList.remove("is-active");
  hamburgerBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = ""; // restores normal scrolling
}

hamburgerBtn.addEventListener("click", function () {
  const isOpen = mobileSidebar.classList.contains("is-open");
  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

sidebarCloseBtn.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// Close the sidebar automatically whenever a link inside it is tapped
sidebarLinks.forEach(function (link) {
  link.addEventListener("click", closeSidebar);
});


/* =========================================================================
   4. SCROLL-REVEAL ANIMATIONS
   Every element with the "reveal" class starts hidden (see CSS) and fades
   into view the moment it enters the viewport, using IntersectionObserver.
   ========================================================================= */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target); // animate once, then stop watching
      }
    });
  },
  {
    threshold: 0.15, // element must be 15% visible before it animates in
  }
);

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});


/* =========================================================================
   5. CONTACT FORM
   This is a placeholder handler so the form feels functional right away.
   To actually send messages, connect this to an email service (like
   Formspree, EmailJS, or your own backend) and replace the code below.
   ========================================================================= */
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stops the page from reloading

    // TODO: replace this with a real submission (fetch/EmailJS/Formspree, etc.)
    formNote.textContent = "Thanks! Your request has been received — we'll be in touch shortly.";
    formNote.style.color = "#2e7d32";

    contactForm.reset();
  });
}


/* =========================================================================
   6. AUTO-UPDATE FOOTER YEAR
   Keeps the copyright year correct without ever needing a manual edit.
   ========================================================================= */
const currentYearEl = document.getElementById("currentYear");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}
/* =========================================================================
   7. COUNTER ANIMATION
   Starts only when the counter section becomes visible.
   Works correctly even if a page loader is used.
========================================================================= */

const counterSection = document.querySelector(".counter-section");
const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

  if (counterStarted) return;

  counterStarted = true;

  counters.forEach(function (counter) {

    const target = Number(counter.dataset.target);

    let current = 0;

    const increment = target / 100;

    function updateCounter() {

      current += increment;

      if (current < target) {

        counter.innerText = Math.ceil(current);

        requestAnimationFrame(updateCounter);

      } else {

        counter.innerText = target + "+";

      }

    }

    updateCounter();

  });

}

if (counterSection) {

  const counterObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        startCounters();

        counterObserver.unobserve(counterSection);

      }

    });

  }, {
    threshold: 0.4
  });

  counterObserver.observe(counterSection);

}
const scrollBtn = document.getElementById("scrollTop");

if(scrollBtn){

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

scrollBtn.style.display="flex";

}else{

scrollBtn.style.display="none";

}

});

scrollBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}
