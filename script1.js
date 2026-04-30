// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Typing animation
const typingElement = document.querySelector('.typing-text');
const texts = ['Medical Student 📚', 'Digital Illustrator 🎨', 'Published Writer ✍️', 'Creative Freelancer 💫'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;
  const currentText = texts[textIndex];
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }
  
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }
  
  setTimeout(typeEffect, isDeleting ? 100 : 150);
}

typeEffect();

// Smooth scroll
document.querySelectorAll('a[href^="#"]:not([target="_blank"])').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Publication links alert (for demo - remove when adding actual PDFs)
document.querySelectorAll('.pub-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      alert('📄 To add actual PDF: Place your PDF files in a "pdfs" folder and update the href attribute.\n\nExample: href="pdfs/your-story.pdf"');
    }
  });
});

// Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .portfolio-item, .contact-card, .pub-card, .edu-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Custom cursor
const cursor = document.querySelector('.cursor-follower');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}


// LIGHTBOX FUNCTIONALITY - View Sticker Button Works!
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const viewButtons = document.querySelectorAll('.view-sticker-btn');

// Open lightbox when clicking "View Sticker" button
viewButtons.forEach(button => {
  button.addEventListener('click', function() {
    const imagePath = this.getAttribute('data-image');
    const stickerName = this.closest('.sticker-card-fixed').querySelector('h4').innerText;
    
    lightboxImg.src = imagePath;
    lightbox.style.display = 'block';
    
    // Update caption
    const caption = document.querySelector('.lightbox-caption');
    if (caption) {
      caption.innerText = stickerName + ' — PNG/SVG · 300 DPI';
    }
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  });
});

// Close lightbox when clicking X
if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && lightbox.style.display === 'block') {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});