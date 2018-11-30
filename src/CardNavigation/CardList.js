import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SpyProvider from '../Helpers/Spy/SpyProvider';
import CardListContent from './CardListContent';

const selectedCardHasChanged = (prevState, nextState) =>
  nextState.currentCard !== prevState.currentCard;

const locationHasChanged = (prevProps, nextProps) =>
  prevProps.location.pathname !== nextProps.location.pathname;

const locationIsHome = props => props.location.pathname === '/';

const locationMatchesCurrentCard = (props, state) =>
  props.location.pathname === props.cards[state.currentCard].path;

const getCurrentCardFromProps = props => {
  const index = props.cards.findIndex(
    card => props.location.pathname === card.path
  );
  return index >= 0 ? index : 0;
};

class CardList extends Component {
  constructor(props) {
    super();
    this.state = {
      currentCard: getCurrentCardFromProps(props)
    };
    this.goTo = this.goTo.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !locationMatchesCurrentCard(this.props, this.state) &&
      !locationIsHome(this.props)
    ) {
      if (selectedCardHasChanged(prevState, this.state)) {
        this.props.push('/');
      } else if (locationHasChanged(prevProps, this.props)) {
        this.goTo(getCurrentCardFromProps(this.props));
      }
    }
  }

  goTo(newCard) {
    this.setState({
      currentCard: newCard
    });
  }

  render() {
    return (
      <SpyProvider>
        <CardListContent
          goTo={this.goTo}
          currentCard={this.state.currentCard}
          cards={this.props.cards}
        />
      </SpyProvider>
    );
  }
}

export default withRouter(CardList);
