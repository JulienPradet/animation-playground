import React, { Component, PropTypes } from 'react';

class SlideContent extends Component {
  render() {
    return (
      <div className="slide-content">
        {this.props.children}
      </div>
    );
  }
}

SlideContent.propTypes = {
  children: PropTypes.element.isRequired
};

export default SlideContent;
