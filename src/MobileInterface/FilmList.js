import React from 'react'
import Route from 'react-router-dom/Route'

const ListContainer = (props) => (
  <div className='film-list-wrapper'>
    <div className='film-list'>
      {props.children}
    </div>
  </div>
)

class FilmList extends React.Component {
  render () {
    return (
      <Route
        path='/'
        children={({match}) => (
          <ListContainer>
            {this.props.children}
          </ListContainer>
        )}
      />
    )
  }
}

export default FilmList
