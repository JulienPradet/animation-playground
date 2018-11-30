const debugAnimationFactor = 1;

class Flip {
  constructor(element, duration = 100, delay = 0) {
    this.duration = duration * debugAnimationFactor;
    this.delay = delay * debugAnimationFactor;
    this.element = element;
  }

  first() {
    // FIRST
    const firstPosition = this.element.getBoundingClientRect();
    const firstStyle = getComputedStyle(this.element);
    this._first = {
      top: firstPosition.top,
      height: firstPosition.height,
      opacity: parseFloat(firstStyle.opacity)
    };
    console.log("FIRST", this._first);
  }

  last() {
    // LAST
    this.element.style.transform = null;
    this.element.style.opacity = null;
    const lastPosition = this.element.getBoundingClientRect();
    const lastStyle = getComputedStyle(this.element);
    this._last = {
      top: lastPosition.top,
      height: lastPosition.height,
      opacity: parseFloat(lastStyle.opacity)
    };
    console.log("LAST", this._last);
  }

  invert() {
    this._invert = {
      top: this._first.top - this._last.top,
      height: (this._last.height - this._first.height) / this._last.height,
      opacity: this._first.opacity - this._last.opacity
    };
    console.log("INVERT", this._invert);
  }

  play() {
    console.log("START ANIMATION");
    this.start = window.performance.now() + this.delay;
    this.element.style.willChange = "transform, opacity";
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    const now = window.performance.now();
    let progress = (now - this.start) / this.duration;
    progress = Math.max(0, Math.min(1, progress));
    progress = Math.pow(progress, 0.75);

    this.element.style.transform = `
      translate(0, ${this._invert.top * (1 - progress)}px)
      scale(1, ${1 - this._invert.height * (1 - progress)})
    `;
    this.element.style.opacity =
      this._last.opacity + this._invert.opacity * (1 - progress);

    if (progress < 1) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      console.log("END ANIMATION");
      this.element.style.transform = null;
      this.element.style.opacity = null;
      this.element.style.willChange = null;
    }
  }
}

export default Flip;
