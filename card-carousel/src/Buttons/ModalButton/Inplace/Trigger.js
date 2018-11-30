import React from 'react'
import createOrigin from '../Generic/createOrigin'

const DefaultButton = ({setOrigin, onClick, className, children}) => (
  <button
    ref={setOrigin}
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
)

class Trigger extends React.Component {
  render () {
    const Component = this.props.component || DefaultButton
    return <Component
      setOrigin={this.props.setOrigin}
      onClick={this.props.onClick}
      className='button-modal__trigger'
    >
      {this.props.children}
    </Component>
  }
}

Trigger.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
  setOrigin: React.PropTypes.func.isRequired,
  component: React.PropTypes.any
}

export default createOrigin()(Trigger)
