import React, { Component, PropTypes } from 'react';

export const LEFT = 'left';
export const RIGHT = 'right';

class Slide extends Component {
  render() {
    return (
      <div className="slide-action">
        <button onClick={this.props.onClick}>
          {this.props.type === LEFT ? '<' : '>'}
        </button>
      </div>
    );
  }
}

Slide.propTypes = {
  type: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Slide;
