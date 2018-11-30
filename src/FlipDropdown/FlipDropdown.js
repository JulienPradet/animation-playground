import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FlipContainer from '../Helpers/Flip/Container';
import FlipElement from '../Helpers/Flip/Element';
import './flipdropdown.css';
import './flipdropdown.css';

const Container = props => (
  <div
    className={classnames(
      'dropdown',
      `dropdown--${props.opened ? 'opened' : 'closed'}`
    )}
  >
    {props.children}
  </div>
);
Container.propTypes = {
  opened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

const Trigger = props => (
  <div className="dropdown-trigger">
    {props.children}
  </div>
);
Trigger.propTypes = {
  children: PropTypes.node.isRequired
};

const Content = FlipElement()(props => (
  <div className="dropdown-content" ref={props.flip.setFlipElement}>
    {props.children}
  </div>
));
Content.propTypes = {
  children: PropTypes.node.isRequired
};

class CardFlip extends Component {
  constructor() {
    super();
    this.state = {
      opened: false
    };
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle() {
    this.setState(state => ({
      opened: !state.opened
    }));
  }

  close() {
    this.setState({ opened: false });
  }

  render() {
    return (
      <FlipContainer>
        {({ animating }) => (
          <Container opened={this.state.opened}>
            <Trigger>
              {this.props.renderTrigger({ toggle: this.toggle })}
            </Trigger>
            <Content>
              {this.props.children({ close: this.close })}
            </Content>
          </Container>
        )}
      </FlipContainer>
    );
  }
}

CardFlip.propTypes = {
  renderTrigger: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};

export default CardFlip;
