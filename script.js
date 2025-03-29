// Import GSAP
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    })
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
    })
  })

  // Hover effect on links and buttons
  const links = document.querySelectorAll("a, button")
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-hover")
      cursorFollower.classList.add("cursor-hover")
    })
    link.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hover")
      cursorFollower.classList.remove("cursor-hover")
    })
  })


  // Navbar scroll effect
  const header = document.querySelector("header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
      header.classList.add("nav-hidden")
    } else {
      header.classList.remove("nav-hidden")
    }
    lastScrollY = window.scrollY
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // GSAP animations
  gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
  })

  gsap.from(".hero-image", {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 0.8,
  })

  gsap.from(".about-content", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
  })

  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
  })

  gsap.from(".skill-category", {
    scrollTrigger: {
      trigger: ".skills",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
  })

  // Skill bar animation
  const skillLevels = document.querySelectorAll(".skill-level")

  skillLevels.forEach((level) => {
    const width = level.style.width
    level.style.width = "0"

    ScrollTrigger.create({
      trigger: level,
      start: "top 80%",
      onEnter: () => {
        gsap.to(level, {
          width: width,
          duration: 1.5,
          ease: "power2.out",
        })
      },
    })
  })

  // Project filter
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          gsap.to(card, { opacity: 1, scale: 1, duration: 0.3 })
        } else {
          gsap.to(card, { opacity: 0.3, scale: 0.8, duration: 0.3 })
        }
      })
    })
  })

  // Form submission
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)

    try {
      const response = await fetch("send_email.php", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Error sending message: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  })

})

