import React from 'react';

export default ClockFace;

function ClockFace() {
  return (
    <g transform="translate(204, 400) rotate(4) scale(1.02)"
       fill="none"
       stroke="#333"
       strokeWidth="1"
       opacity="0.7">
      <circle r="185" cx="0" cy="0"
              strokeWidth="4" />
      <circle r="189" cx="0" cy="0" />

      <path d="M-1 -185 L-1 185" />
      <path d="M1 -185 L1 185" />

      <path d="M91 -160 L62 174" />
      <path d="M93 -160 L64 174" />

      <path d="M167 -78 L118 142" />
      <path d="M169 -78 L120 142" />

      <path d="M-91 -160 L-62 174" />
      <path d="M-93 -160 L-64 174" />

      <path d="M-167 -78 L-118 142" />
      <path d="M-169 -78 L-120 142" />

      <path d="M-182 -32 L182 -32"
            strokeWidth="2" />
    </g>
  );
}
