import React from 'react';

import imagePaper from './creampaper.png';

export default Paper;

function Paper(props) {

  return (
    <g>
      <defs>
        <pattern id="paper-fill" width="0.2" height="0.2" patternUnits="objectBoundingBox">
          <image href={imagePaper} />
        </pattern>
        <clipPath id="paper-clip">
          <path id="paper" d="M10 10 L390 10 L390 390 L10 390 Z" />
        </clipPath>
      </defs>
      <use href="#paper" fill="url(#paper-fill)"/>
      <g clipPath="url(#paper-clip)">
        {props.children}
      </g>
    </g>
  );
}
