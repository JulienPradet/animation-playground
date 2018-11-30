import React from 'react';
import { Route } from 'react-router';
import compose from '../Helpers/compose';
import spySubscriber from '../Helpers/Spy/spySubscriber';
import spyTarget from '../Helpers/Spy/spyTarget';
import FlipContainer from '../Helpers/Flip/Container';
import Slide from './Slide';
import Card from './Card';
import './CardList.css';

const CardListContainer = compose(
  spyTarget({
    key: 'container',
    nodeTransformer: node => {
      return {
        width: node.clientWidth,
        height: node.clientHeight,
        left: node.offsetLeft
      };
    }
  })
)(props => {
  return (
    <div className="card-list-wrapper" ref={props.setSpyTarget}>
      <div className="card-list">
        {props.children}
      </div>
    </div>
  );
});

const CardListContent = props => {
  let offsets;
  if (props.spyTargets.container) {
    offsets = new Array(props.cards.length).fill(null);
    props.cards.forEach((_, index) => {
      if (index === 0) {
        offsets[index] = 0;
      } else {
        offsets[index] = offsets[index - 1] + props.spyTargets[index - 1].width;
      }
    });

    let globalOffset = 0;
    if (props.spyTargets.container) {
      globalOffset = props.spyTargets.container.width / 2 -
        props.spyTargets[props.currentCard].width / 2 -
        offsets[props.currentCard];
    }

    offsets = offsets.map(offset => offset + globalOffset);
  }

  let maxHeight = 0;
  if (props.spyTargets.container) {
    maxHeight = Object.keys(props.spyTargets)
      .map(key => props.spyTargets[key].height)
      .reduce((max, curr) => Math.max(max, curr), 0);
  }

  return (
    <Slide
      goTo={props.goTo}
      current={props.currentCard}
      length={props.cards.length}
      height={maxHeight}
    >
      <FlipContainer shouldAnimate={true}>
        {({ animating }) => (
          <CardListContainer selected={props.cards[props.currentCard]}>
            {props.cards.map((card, index) => (
              <Route
                key={card.path}
                path={card.path}
                children={options => (
                  <Card
                    index={index}
                    card={card}
                    position={index - props.currentCard}
                    offset={offsets && offsets[index]}
                    selected={Boolean(
                      options.match && props.currentCard === index
                    )}
                  />
                )}
              />
            ))}
          </CardListContainer>
        )}
      </FlipContainer>
    </Slide>
  );
};

export default spySubscriber(props => targets => targets)(CardListContent);
