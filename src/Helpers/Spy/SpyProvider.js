import React from 'react';

class SpyProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      targets: {}
    };
    this.registerTarget = this.registerTarget.bind(this);
  }

  getChildContext() {
    return {
      spy: {
        registerTarget: this.registerTarget,
        targets: this.state.targets
      }
    };
  }

  registerTarget(key, target) {
    this.setState(state => ({
      targets: {
        ...state.targets,
        [key]: target
      }
    }));
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

SpyProvider.propTypes = {
  children: React.PropTypes.node.isRequired
};

SpyProvider.childContextTypes = {
  spy: React.PropTypes.shape({
    registerTarget: React.PropTypes.func.isRequired,
    targets: React.PropTypes.object.isRequired
  }).isRequired
};

export default SpyProvider;
