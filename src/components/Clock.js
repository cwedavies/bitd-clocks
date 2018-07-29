import React from 'react';

import _ from 'lodash/fp';

import ClockFace from './ClockFaceAlt';
import Paper from './Paper';
import Tick from './Tick';

const CONFIG = {
  ticks: [
    { x: 80, y: 296, rotation: 74 },
    { x: 170, y: 300, rotation: 178 },
    { x: 260, y: 272, rotation: 2 },
    { x: 350, y: 342, rotation: 34 }
  ]
};

export default Clock;

function Clock(props) {
  const { caption, ticks } = props;

  return (
    <article>
      <header>
        <h1>{caption}</h1>
      </header>
      <svg width="400" viewBox="0 0 400 400">
        <ClockFace />
        {
          _.map(
            (tick, idx) => <Tick key={idx} {...tick} />,
            _.take(ticks, CONFIG.ticks)
          )
        }
      </svg>
    </article>
  );
};
