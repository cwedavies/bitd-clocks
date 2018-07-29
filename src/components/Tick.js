import React from 'react';

import texture from '../assets/grunge/texture1.png';

export default Tick;

function Tick({x, y, rotation = 0}) {
  var transform = `translate(${x} ${y}) rotate(${rotation})`;

  return (
    <g transform={transform}>
      <defs>
        <mask id="tick-mask">
          <image x="-100" y="-100" width="400" href={texture} />
        </mask>
      </defs>
      <g mask="url(#tick-mask)" opacity="0.9">
        <circle r="38" cx="0" cy="0"
                stroke="#A63E31"
                strokeWidth="6"
                fill="none" />
        <circle r="32" cx="0" cy="0"
                fill="#A63E31" />
      </g>
    </g>
  );
}
