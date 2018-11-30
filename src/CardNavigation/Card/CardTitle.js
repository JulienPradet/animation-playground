import React, { Component } from 'react';

class CardTitle extends Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
      </div>
    );
  }
}

export default CardTitle;
