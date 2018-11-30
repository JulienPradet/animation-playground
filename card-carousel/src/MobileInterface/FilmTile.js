import React from 'react';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';
import compose from '../Helpers/compose';
import flipElement from '../Helpers/Flip/Element';
import FlipContainer from '../Helpers/Flip/Container';

const FilmBackground = ({ opened, page }) => (
  <div className="film-cover">
    <Link to={opened ? '/' : page.path}>
      <img src={page.image} role="presentation" />
      <div className="film-cover-gradient" />
    </Link>
  </div>
);

const FilmTitle = ({ page }) => (
  <div className="film-title">
    {page.title}
  </div>
);

const FilmHead = compose(
  withRouter,
  flipElement(props => ({ duration: 250, delay: props.opened ? 0 : 150 }))
)(({ page, opened, flip, push }) => (
  <div className="film-head" ref={flip.setFlipElement}>
    <FilmBackground opened={opened} page={page} />
    <FilmTitle page={page} />
  </div>
));

const FilmUnderlay = flipElement(props => ({
  duration: 250,
  delay: props.opened ? 0 : 150
}))(({ flip }) => <div className="film-underlay" ref={flip.setFlipElement} />);

const FilmContent = flipElement(props => ({
  duration: 250,
  delay: props.opened ? 150 : 0
}))(({ page, opened, flip }) => (
  <div className="film-content-container" ref={flip.setFlipElement}>
    <div className="film-content">COUCOU</div>
  </div>
));

const Film = ({ page, opened, animating }) => (
  <div className="film-wrapper">
    <div
      className={
        `film ${opened ? 'opened' : ''} ${animating ? 'animating' : ''}`
      }
    >
      <div className="film-relative">
        <FilmHead page={page} opened={opened} />
        <FilmUnderlay />
      </div>
      <FilmContent page={page} opened={opened} />
    </div>
  </div>
);

const FilmTile = ({ page }) => (
  <Route
    path={page.path}
    children={({ match }) => (
      <FlipContainer firstClassName="">
        {animating => (
          <Film page={page} opened={!!match} animating={animating} />
        )}
      </FlipContainer>
    )}
  />
);

export default FilmTile;
