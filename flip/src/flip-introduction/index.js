import "./index.css";

const dropdown = document.querySelector(".js-dropdown");
const details = document.querySelector(".js-dropdown-details");
const toggle = dropdown.querySelector(".js-dropdown-toggle");

toggle.addEventListener("click", toggleDropdown, false);

function toggleDropdown() {
  // FIRST
  const firstPosition = details.getBoundingClientRect();
  const firstStyle = getComputedStyle(details);
  const first = {
    top: firstPosition.top,
    opacity: parseFloat(firstStyle.opacity)
  };
  console.log("FIRST", first);

  // LAST
  details.style.transform = null;
  details.style.opacity = null;
  dropdown.classList.toggle("opened");
  const lastPosition = details.getBoundingClientRect();
  const lastStyle = getComputedStyle(details);
  const last = {
    top: lastPosition.top,
    opacity: parseFloat(lastStyle.opacity)
  };
  console.log("LAST", last);

  // INVERT
  const invert = {
    top: first.top - last.top,
    opacity: first.opacity - last.opacity
  };
  console.log("INVERT", invert);

  // PLAY
  const duration = 300;
  const start = window.performance.now();
  requestAnimationFrame(animate);
  function animate() {
    const now = window.performance.now();
    const progress = (now - start) / duration;

    details.style.transform = `
	translate(0, ${invert.top * (1 - progress)}px)
	`;
    details.style.opacity = last.opacity + invert.opacity * (1 - progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      details.style.transform = null;
      details.style.opacity = null;
    }
  }
}
