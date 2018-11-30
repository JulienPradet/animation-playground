import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import FilmList from './FilmList';
import FilmTile from './FilmTile';
import './index.css';

const pages = [
  {
    title: 'Captain America',
    path: '/captain-america',
    color: '#dddddd',
    image: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.disneyeveryday.com%2Fwp-content%2Fuploads%2F2014%2F02%2Fcaptainamerica252ebf76418156.jpg&f=1'
  },
  {
    title: 'Thor',
    path: '/thor',
    color: '#ddddff',
    image: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fi.enewsi.com%2Fg%2Fgenerated%2FEntertaiment%2FThor_2%2Fthor_the_dark_world_ver3_xlg__scaled_600.jpg&f=1'
  },
  {
    title: 'Iron Man',
    path: '/iron-man',
    color: '#ddffdd',
    image: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fi.enewsi.com%2Fg%2Fgenerated%2FEntertaiment%2FIron_Man_3%2FIron-Man-3-Latino__scaled_600.jpg&f=1'
  },
  {
    title: 'Doctor Strange',
    path: '/doctor-strange',
    color: '#ffdddd',
    image: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.shockya.com%2Fnews%2Fwp-content%2Fuploads%2Fdoctor-strange-movie-poster-new.jpg&f=1'
  }
];

const MobileInterface = () => (
  <BrowserRouter>
    <FilmList>
      <FilmTile page={pages[0]} />
      <FilmTile page={pages[1]} />
      <FilmTile page={pages[2]} />
      <FilmTile page={pages[3]} />
    </FilmList>
  </BrowserRouter>
);

export default MobileInterface;
