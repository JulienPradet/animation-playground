import React from 'react'

const spySubscriber = (mapTargetsToProps) => (BaseComponent) => {
  class SpySubscriber extends React.Component {
    render () {
      return <BaseComponent spyTargets={mapTargetsToProps(this.props)(this.context.spy.targets)} {...this.props} />
    }
  }

  SpySubscriber.contextTypes = {
    spy: React.PropTypes.shape({
      registerTarget: React.PropTypes.func.isRequired,
      targets: React.PropTypes.object.isRequired
    }).isRequired
  }

  return SpySubscriber
}

export default spySubscriber
