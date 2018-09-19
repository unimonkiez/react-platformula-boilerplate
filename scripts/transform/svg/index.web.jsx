import React from 'react';
// Used in app, no need to check here
/* eslint-disable */
import jss from 'jss';
import jssNested from 'jss-nested';
/* eslint-enable */

jss.use(jssNested());

const getCssWidthOrHeight = v => (Number.isNaN(v) ? v : `${v}px`);

export default (_svgString) => {
  const svgString = _svgString.replace(/(fill|stroke)="replace"/g, '');
  return ({
    fill = '#000',
    stroke,
    width,
    height,
  } = {}) => {
    const { classes } = jss.createStyleSheet({
      main: {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        '&>svg': {
          fill: `${fill}!important`,
          stroke: stroke ? `${stroke}!important` : undefined,
          width: getCssWidthOrHeight(width),
          height: getCssWidthOrHeight(height),
        },
      },
    }).attach();

    return (
      () => (
        // Must use inner html to inject svgs, this method should only be used in build time
        // eslint-disable-next-line react/no-danger
        <span className={classes.main} dangerouslySetInnerHTML={{ __html: svgString }} />
      )
    );
  };
};
