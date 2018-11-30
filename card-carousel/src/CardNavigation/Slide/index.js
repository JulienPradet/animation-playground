import React, { Component, PropTypes } from 'react';
import SlideAction, { RIGHT, LEFT } from './SlideAction';
import SlideContent from './SlideContent';
import './Slide.css';

class Slide extends Component {
  constructor() {
    super();
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  prev() {
    this.props.goTo(
      (this.props.current - 1 + this.props.length) % this.props.length
    );
  }

  next() {
    this.props.goTo(
      (this.props.current + 1 + this.props.length) % this.props.length
    );
  }

  render() {
    return (
      <div className="slide" style={{ minHeight: this.props.height }}>
        <SlideAction type={LEFT} onClick={this.prev} />
        <SlideContent>
          {this.props.children}
        </SlideContent>
        <SlideAction type={RIGHT} onClick={this.next} />
      </div>
    );
  }
}

Slide.propTypes = {
  children: PropTypes.element.isRequired,
  current: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  goTo: PropTypes.func.isRequired
};

export default Slide;
