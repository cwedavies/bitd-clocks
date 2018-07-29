import React from 'react';

import texture from './texture.jpg';

export default Tick;

function Tick({x, y, rotation = 0}) {
  var transform = `translate(${x} ${y}) rotate(${rotation})`;

  return (
    <g transform={transform}>
      <defs>
        <mask id="tick-mask">
          <image x="-50" y="-50" width="100" href={texture} />
        </mask>
      </defs>
      <g mask="url(#tick-mask)">
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
