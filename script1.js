// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});


// ===============================
// ACTIVE NAV LINK ON SCROLL
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) {
            a.classList.add("active");
        }
    });
});


// ===============================
// SCROLL ANIMATION (FADE IN)
// ===============================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll("section, .card, .gallery img").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


// ===============================
// IMAGE MODAL (CLICK TO VIEW)
// ===============================
const images = document.querySelectorAll(".gallery img");

const modal = document.createElement("div");
modal.classList.add("modal");

const modalImg = document.createElement("img");
modal.appendChild(modalImg);

document.body.appendChild(modal);

images.forEach(img => {
    img.addEventListener("click", () => {
        modal.classList.add("active");
        modalImg.src = img.src;
    });
});

modal.addEventListener("click", () => {
    modal.classList.remove("active");
});


// ===============================
// PROJECT FILTER
// ===============================
function filterSelection(category) {
    let items = document.querySelectorAll(".gallery img");

    items.forEach(item => {
        if (category === "all") {
            item.style.display = "block";
        } else {
            if (item.classList.contains(category)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    });
}


// ===============================
// BUTTON RIPPLE EFFECT
// ===============================
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripple = document.createElement("span");
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});