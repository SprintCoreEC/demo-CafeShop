import React from 'react';

const Tag = ({ text }) => (
  <span className="bg-white font-bold text-[9px] rounded-md border-[1px] border-lines px-[0.8em] py-[0.2em] text-subtitle">
    {text}
  </span>
);

export default Tag;