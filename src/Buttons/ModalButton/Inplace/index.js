import React from 'react'
import Container from '../Generic/Container'
import Trigger from './Trigger'
import Modal from '../Generic/Modal'
import '../Generic/style.css'

class InplaceButtonModal extends React.Component {
  constructor () {
    super()
    this.state = {
      opened: false,
      displayed: false
    }
    this.toggle = this.toggle.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)
    this.getAnimationSteps = this.getAnimationSteps.bind(this)
  }

  toggle () {
    this.setState({
      opened: !this.state.opened
    })
  }

  updateDisplay (opened) {
    return () => {
      this.setState({displayed: opened})
    }
  }

  shouldDisplayContent () {
    return this.state.opened || this.state.displayed
  }

  getAnimationSteps ({container, origin, modal}) {
    const hiddenButtonStep = {
      containerWidth: origin.size.width,
      containerHeight: origin.size.height,
      containerTop: origin.boundingBox.top - container.boundingBox.top,
      containerLeft: origin.boundingBox.left - container.boundingBox.left,
      containerOpacity: 0,
      modalOpacity: 0,
      modalTranslation: -100,
      modalScale: 0.3
    }

    const visibleButtonStep = {
      containerWidth: origin.size.width,
      containerHeight: origin.size.height,
      containerTop: origin.boundingBox.top - container.boundingBox.top,
      containerLeft: origin.boundingBox.left - container.boundingBox.left,
      containerOpacity: 1,
      modalOpacity: 0,
      modalTranslation: -100,
      modalScale: 0.3
    }

    const positionedButtonStep = {
      containerWidth: origin.size.width,
      containerHeight: origin.size.height,
      containerTop: 0,
      containerLeft: container.size.width / 2 - origin.size.width / 2,
      containerOpacity: 1,
      modalOpacity: 0,
      modalTranslation: -100,
      modalScale: 0.8
    }

    const largeButtonStep = {
      containerWidth: container.size.width,
      containerHeight: origin.size.height,
      containerTop: 0,
      containerLeft: 0,
      containerOpacity: 1,
      modalOpacity: 0,
      modalTranslation: -100,
      modalScale: 0.8
    }

    const fullStep = {
      containerWidth: container.size.width,
      containerHeight: modal ? modal.size.height : container.size.height,
      containerTop: 0,
      containerLeft: 0,
      containerOpacity: 1,
      modalOpacity: 1,
      modalTranslation: 0,
      modalScale: 1
    }

    const steps = [
      {step: hiddenButtonStep, preset: {stiffness: 300, damping: 28}},
      {step: visibleButtonStep, preset: {stiffness: 700, damping: 28}, timeout: 100},
      {step: positionedButtonStep, preset: {stiffness: 400, damping: 32}, timeout: 300},
      {step: largeButtonStep, preset: {stiffness: 400, damping: 32}, timeout: 300},
      {step: fullStep, preset: {stiffness: 300, damping: 24}, timeout: 500}
    ]

    return this.state.opened
      ? steps
      : steps.reverse()
  }

  render () {
    return (
      <Container>
        <Trigger
          onClick={this.toggle}
          component={this.props.triggerComponent}
        >
          {this.props.children}
        </Trigger>
        {this.shouldDisplayContent() && (
          <Modal
            isOpened={false}
            onAnimationEnd={this.updateDisplay(this.state.opened)}
            getAnimationSteps={this.getAnimationSteps}
          >
            {this.props.modalRender(this.toggle)}
          </Modal>
        )}
      </Container>
    )
  }
}

InplaceButtonModal.propTypes = {
  children: React.PropTypes.node.isRequired,
  modalRender: React.PropTypes.func.isRequired,
  triggerComponent: React.PropTypes.any
}

export default InplaceButtonModal
