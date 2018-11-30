class FlipGroup {
  constructor(flips) {
    this.flips = flips;
  }

  first() {
    this.flips.forEach(flip => flip.first());
  }

  last() {
    this.flips.forEach(flip => flip.last());
  }

  invert() {
    this.flips.forEach(flip => flip.invert());
  }

  play() {
    this.flips.forEach(flip => flip.play());
  }
}

export default FlipGroup;
