const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const header = document.getElementById("header");

// فتح / إغلاق القائمة
navToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // منع غلقها عند الضغط على الزر نفسه
  navMenu.classList.toggle("show");
  navToggle.classList.toggle("active");
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("show") &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    navMenu.classList.remove("show");
    navToggle.classList.remove("active");
  }
});

// Add background on scroll
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});
