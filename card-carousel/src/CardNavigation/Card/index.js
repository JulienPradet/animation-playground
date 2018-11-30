import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import compose from '../../Helpers/compose';
import spyTarget from '../../Helpers/Spy/spyTarget';
import FlipContainer from '../../Helpers/Flip/Container';
import flipElement from '../../Helpers/Flip/Element';
import CardImage from './CardImage';
import CardTitle from './CardTitle';
import CardDescription from './CardDescription';
import './Card.css';

class Card extends Component {
  render() {
    const style = {
      opacity: this.props.position === 0
        ? 1
        : Math.abs(this.props.position) === 1
            ? 0.8
            : Math.abs(this.props.position) === 2 ? 0.2 : 0,
      transform: this.props.position === 0
        ? null
        : `
        translate(${0 - this.props.position}em)
        scale(${1 - Math.abs(this.props.position) / 10})
        `
    };

    return (
      <div
        className={classnames('card-wrapper', {
          selected: this.props.selected
        })}
        ref={node => {
          this.props.setSpyTarget(node);
          this.props.flip.setFlipElement(node);
        }}
        style={{
          position: 'absolute',
          left: this.props.selected ? 0 : this.props.offset
        }}
      >
        <FlipContainer>
          {({ animating }) => (
            <div className="card" style={style}>
              <CardImage
                src={this.props.card.image}
                title={this.props.card.title}
                position={this.props.position}
              />
              <div className="card-content">
                <Link to={this.props.card.path}>
                  <CardTitle title={this.props.card.title} />
                </Link>
                <CardDescription description={this.props.card.description} />
                {this.props.selected &&
                  <div>
                    <Link to="/">PROUT</Link>
                  </div>}
              </div>
            </div>
          )}
        </FlipContainer>
      </div>
    );
  }
}

export default compose(
  flipElement({ duration: 500 }),
  spyTarget({
    key: props => props.index,
    nodeTransformer: node => {
      return {
        left: node.offsetLeft,
        width: node.clientWidth,
        height: node.clientHeight
      };
    }
  })
)(Card);
