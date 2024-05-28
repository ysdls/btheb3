// script.js
let currentSection = 0;
const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".dot");
const totalSections = sections.length;
let isScrolling = false;

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    isScrolling = true;

    if (event.deltaY > 0) {
        // Scrolling down
        currentSection = Math.min(currentSection + 1, totalSections - 1);
    } else {
        // Scrolling up
        currentSection = Math.max(currentSection - 1, 0);
    }
    scrollToSection(currentSection);

    setTimeout(() => {
        isScrolling = false;
    }, 700); // Adjust the delay to match the transition time
});

dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        currentSection = parseInt(dot.getAttribute("data-index"));
        scrollToSection(currentSection);
    });
});

function scrollToSection(sectionIndex) {
    sections.forEach((section, index) => {
        section.style.transform = `translateY(-${sectionIndex * 100}vh)`;
    });
    updatePagination(sectionIndex);
}

function updatePagination(sectionIndex) {
    dots.forEach((dot) => {
        dot.classList.remove("active");
    });
    dots[sectionIndex].classList.add("active");
}

// Initialize the pagination on load
updatePagination(currentSection);

//popup
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("popupClosedToday")) {
        showPopup();
    }
});

function showPopup() {
    document.getElementById("popup").style.display = "block";
    // document.getElementById("overlay").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    // document.getElementById("overlay").style.display = "none";
}

function doNotShowToday() {
    closePopup();
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    localStorage.setItem("popupClosedToday", true);
    localStorage.setItem("popupExpiration", midnight.getTime());
}

if (localStorage.getItem("popupExpiration")) {
    const expirationTime = parseInt(localStorage.getItem("popupExpiration"), 10);
    const now = new Date().getTime();
    if (now > expirationTime) {
        localStorage.removeItem("popupClosedToday");
        localStorage.removeItem("popupExpiration");
    }
}
