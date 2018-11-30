import React from 'react'
import spyTarget from '../../../Helpers/Spy/spyTarget'
import nodeToPosition from '../../../Helpers/Spy/nodeToPosition'

export default () => (BaseComponent) => {
  const Origin = ({setSpyTarget, ...props}) => (
    <BaseComponent {...props} setOrigin={setSpyTarget} />
  )

  return spyTarget({
    key: 'origin',
    nodeTransformer: nodeToPosition
  })(Origin)
}
