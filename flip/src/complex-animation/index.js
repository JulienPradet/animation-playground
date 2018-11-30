import "./index.css";
import Flip from "./Flip";
import FlipGroup from "./FlipGroup";

const dropdown = document.querySelector(".js-dropdown");
const detailsContent = document.querySelector(".js-dropdown-details-content");
const detailsBackground = document.querySelector(
  ".js-dropdown-details-background"
);
const toggle = dropdown.querySelector(".js-dropdown-toggle");

toggle.addEventListener("click", toggleDropdown, false);

function toggleDropdown() {
  const isOpening = !dropdown.classList.contains("opened");

  const flipDetails = new Flip(
    detailsContent,
    isOpening ? 15000 : 20000,
    isOpening ? 20000 : 0
  );
  const flipBackground = new Flip(
    detailsBackground,
    isOpening ? 20000 : 20000,
    isOpening ? 0 : 12000
  );
  const flip = new FlipGroup([flipDetails, flipBackground]);

  flip.first();

  dropdown.classList.toggle("opened");
  if (isOpening) {
    detailsBackground.style.height = `${detailsContent.getBoundingClientRect().height}px`;
  } else {
    detailsBackground.style.height = `${dropdown.getBoundingClientRect().height}px`;
  }

  flip.last();
  flip.invert();
  flip.play();
}
