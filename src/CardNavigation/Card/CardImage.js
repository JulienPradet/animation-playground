import React, { Component, PropTypes } from 'react';

class CardImage extends Component {
  render() {
    return (
      <div className="card-image-wrapper">
        <img
          src={this.props.src}
          alt=""
          title={this.props.title}
          style={{ transform: `translate(${0 - this.props.position * 3}em)` }}
        />

      </div>
    );
  }
}

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default CardImage;
