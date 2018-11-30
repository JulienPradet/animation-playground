/* global requestAnimationFrame */
import React from 'react'
import {Motion, spring} from 'react-motion'

const springify = ({step, preset}) => (
  Object.keys(step)
    .map((key) => ({key, value: step[key]}))
    .map(({key, value}) => ({
      key,
      value: spring(value, preset)
    }))
    .reduce((res, {key, value}) => ({
      ...res,
      [key]: value
    }), {})
)

class StepMotion extends React.Component {
  constructor () {
    super()
    this.state = {
      currentStep: 0
    }
    this.nextStep = this.nextStep.bind(this)
    this.onRest = this.onRest.bind(this)
  }

  componentDidMount () {
    this.nextStep()
  }

  getCurrentStep () {
    return springify(this.props.steps[this.state.currentStep])
  }

  onRest () {
    if (this.state.currentStep === this.props.steps.length - 1) {
      this.props.onRest()
    } else {
      this.nextStep()
    }
  }

  nextStep () {
    if (this.nextStepTimeout) clearTimeout(this.nextStepTimeout)
    requestAnimationFrame(() => {
      this.setState(
        (state) => ({ currentStep: state.currentStep + 1 }),
        () => {
          if (this.state.currentStep + 1 < this.props.steps.length)
          this.nextStepTimeout = setTimeout(this.nextStep, this.props.steps[this.state.currentStep].timeout)
        }
      )
    })
  }

  render () {
    return <Motion
      defaultStyle={this.props.steps[0].step}
      style={this.getCurrentStep()}
      onRest={this.onRest}
    >
      {(interpolatedStyle) => this.props.children(interpolatedStyle)}
    </Motion>
  }
}

StepMotion.propTypes = {
  steps: React.PropTypes.array.isRequired,
  onRest: React.PropTypes.func.isRequired,
  children: React.PropTypes.func.isRequired
}

export default StepMotion
