import React from 'react';

import _ from 'lodash/fp';

import textTexture from '../assets/grunge/texture13.png';
import clockTexture from '../assets/grunge/texture15.png';

export default ClockFace;

function ClockFace({caption}) {
  caption = _.isArray(caption) ?
    _.reverse(_.clone(caption)) :
    [caption];

  return (
    <g transform="translate(200, 220) rotate(5)"
       fill="none"
       stroke="#000"
       strokeWidth="1"
       opacity="0.7">
      <defs>
        <path id="text-path"
              d="M-152 0 a152 152 0 0 1 304 0" />
        <path id="text-path-2"
              d="M-180 0 a180 180 0 0 1 360 0" />
        <mask id="face-mask">
          <image x="-400" y="-200" width="600" href={clockTexture} />
        </mask>
        <mask id="text-mask">
          <image x="-400" y="-200" width="600" href={textTexture} />
        </mask>
      </defs>
      <text stoke="none"
            fill="#000"
            mask="url(#text-mask)">
        <textPath href="#text-path-2" startOffset="50%" textAnchor="middle">
          {caption[1]}
        </textPath>
        <textPath href="#text-path"
                  startOffset="50%"
                  textAnchor="middle">
          {caption[0]}
        </textPath>
      </text>
      <g mask="url(#face-mask)">
        <circle r="140" cx="0" cy="0"
                strokeWidth="4" />
        <circle r="145" cx="0" cy="0" />
        <path d="M-140 0 140 0"
              strokeWidth="2" />
        <path d="M-140 0 140 0"
              strokeWidth="2"
              transform="rotate(60)" />
        <path d="M-140 0 140 0"
              strokeWidth="2"
              transform="rotate(120)" />
      </g>
    </g>
  );
}
