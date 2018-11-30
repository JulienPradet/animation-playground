import CardList from './CardList';

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

const cards = [
  {
    title: 'Sculpture',
    path: '/sculpture',
    description: 'Qui a demandé du relief ?',
    image: 'http://dev.vlynn.fr/img/3D/skiny.png'
  },
  {
    title: 'Vectorielle',
    path: '/vectorielle',
    description: "Vers l'infini et au delà !",
    image: 'http://dev.vlynn.fr/img/vecto/arbre.png'
  },
  {
    title: 'Pixel art',
    path: '/pixel-art',
    description: "Mais c'est tout pixellisé !",
    image: 'http://dev.vlynn.fr/img/pixelart/gobx2.png'
  }
];

class CardNavigation extends Component {
  render() {
    return (
      <BrowserRouter>
        <CardList cards={cards} />
      </BrowserRouter>
    );
  }
}

CardNavigation.propTypes = {};

export default CardNavigation;
