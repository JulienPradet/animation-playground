import React, { Component } from 'react';

class CardDescription extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.description}
        </div>
      </div>
    );
  }
}

export default CardDescription;
