import React from 'react';

import _ from 'lodash/fp';

import ClockFace from './ClockFace';
import Tick from './Tick';

const config = {
  TICKS: [
    { x: 100, y: 140, rotation: 74 },
    { x: 200, y: 110, rotation: 178 },
    { x: 280, y: 160, rotation: 2 },
    { x: 287, y: 260, rotation: 34 },
    { x: 210, y: 315, rotation: 2 },
    { x: 120, y: 260, rotation: 34 },
  ]
};

export default Clock;

function Clock({caption, ticks}) {
  return (
    <article>
      <svg viewBox="0 0 400 400">
        <ClockFace caption={caption} />
        {
          _.map(
            ([idx, tick]) => <Tick key={idx} {...tick} />,
            _.entries(_.take(ticks, config.TICKS))
          )
        }
      </svg>
    </article>
  );
}
