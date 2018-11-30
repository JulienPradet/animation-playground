import React from 'react'
import classnames from 'classnames'
import compose from '../../../Helpers/compose'
import spyTarget from '../../../Helpers/Spy/spyTarget'
import spySubscriber from '../../../Helpers/Spy/spySubscriber'
import nodeToPosition from '../../../Helpers/Spy/nodeToPosition'
import StepMotion from '../../../Helpers/StepMotion'

class Modal extends React.Component {
  constructor (props) {
    super()
    this.state = {
      isOpened: props.isOpened,
      isFullyOpened: !props.isOpened
    }
    this.onAnimationEnd = this.onAnimationEnd.bind(this)
  }

  componentDidMount () {
    if (this.shouldAnimate()) {
      this.triggerAnimation()
    }
  }

  componentDidUpdate () {
    if (this.shouldAnimate()) {
      this.triggerAnimation()
    }
  }

  shouldAnimate () {
    return this.state.isOpened !== this.props.isOpened
  }

  triggerAnimation () {
    this.setState({
      'isOpened': this.props.isOpened,
      'isFullyOpened': !this.props.isOpened
    })
  }

  onAnimationEnd () {
    this.setState({'isFullyOpened': this.state.isOpened})
    this.props.onAnimationEnd()
  }

  getAnimationSteps () {
    const container = this.props.spyTargets.container
    const origin = this.props.spyTargets.origin
    const modal = this.props.spyTargets.modal

    return this.props.getAnimationSteps({
      container,
      origin,
      modal
    })
  }

  render () {
    return (
      <StepMotion
        steps={this.getAnimationSteps()}
        onRest={this.onAnimationEnd}
      >
        {(interpolatedStyle) => (
          <div
            className={classnames(
              { 'button-modal--closing': !this.state.isOpened && this.state.isFullyOpened }
            )}
            style={{
              height: interpolatedStyle.containerHeight - this.props.spyTargets.origin.size.height
            }}
          >
            <div
              className='button-modal__content__wrapper'
              style={{
                width: interpolatedStyle.containerWidth,
                height: interpolatedStyle.containerHeight,
                top: interpolatedStyle.containerTop,
                left: interpolatedStyle.containerLeft,
                opacity: interpolatedStyle.containerOpacity
              }}
              >
                <div
                  ref={this.props.setSpyTarget}
                  className='button-modal__content'
                  style={{
                    width: this.props.spyTargets.container.size.width,
                    left: (interpolatedStyle.containerWidth - this.props.spyTargets.container.size.width) / 2,
                    opacity: interpolatedStyle.modalOpacity,
                    transform: `translate(0, ${interpolatedStyle.modalTranslation}px) scale(${interpolatedStyle.modalScale})`
                  }}
                  >
                    {this.props.children}
                  </div>
                </div>
          </div>
        )}
      </StepMotion>
    )
  }
}

Modal.propTypes = {
  isOpened: React.PropTypes.bool.isRequired,
  onAnimationEnd: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
  setSpyTarget: React.PropTypes.func.isRequired,
  spyTargets: React.PropTypes.object.isRequired
}

export default compose(
  spyTarget({
    key: 'modal',
    nodeTransformer: nodeToPosition
  }),
  spySubscriber((spyTargets) => ({
    container: spyTargets.container,
    origin: spyTargets.origin,
    modal: spyTargets.modal
  }))
)(Modal)
