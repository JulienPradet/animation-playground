import React from 'react';
import FlipDropdown from './FlipDropdown';
import './index.css';

const Example = props => (
  <div className="container">
    <FlipDropdown
      renderTrigger={({ toggle }) => (
        <button className="trigger" onClick={toggle}>Toggle</button>
      )}
      children={({ close }) => (
        <div className="card" onClick={close}>
          VERSO
        </div>
      )}
    />
  </div>
);

export default Example;
