import React from 'react';

export default Component => ({
  fill = '#000',
  width,
  height,
} = {}) => (
  () => (
    <Component fill={fill} width={width} height={height} />
  )
);
