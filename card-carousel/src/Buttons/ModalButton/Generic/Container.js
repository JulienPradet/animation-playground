import React from 'react'
import spyTarget from '../../../Helpers/Spy/spyTarget'
import SpyProvider from '../../../Helpers/Spy/SpyProvider'
import nodeToPosition from '../../../Helpers/Spy/nodeToPosition'

const Container = (props) => (
  <div className='button-modal__wrapper'>
    <div className='button-modal' ref={props.setSpyTarget}>
      {props.children}
    </div>
  </div>
)

Container.propTypes = {
  children: React.PropTypes.node.isRequired,
  setSpyTarget: React.PropTypes.func.isRequired
}

const ContainerTarget = spyTarget({
  key: 'container',
  nodeTransformer: nodeToPosition
})(Container)

export default (props) => (
  <SpyProvider>
    <ContainerTarget>
      {props.children}
    </ContainerTarget>
  </SpyProvider>
)
