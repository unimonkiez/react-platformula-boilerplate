import jss from 'jss';
import uuid from 'uuid/v4';

const fontType = {
  eot: 0,
  woff: 1,
  ttf: 2,
  svg: 3,
};

const createUrl = ({
  url,
  hash,
  format,
  afterHash = '',
}) => `url("${url}${hash ? `?${hash}` : ''}${afterHash}")${format ? ` format("${format}")` : ''}`;

const createUrlParamters = ({ type, url, hash }) => {
  let format;
  let afterHash;

  switch (type) {
    case fontType.eot: {
      format = 'embedded-opentype';
      afterHash = '?#iefix';
      break;
    }
    case fontType.woff: {
      format = 'woff';
      break;
    }
    case fontType.ttf: {
      format = 'truetype';
      break;
    }
    case fontType.svg: {
      format = 'svg';
      afterHash = '#font-loader';
      break;
    }
    default:
      return undefined;
  }

  return {
    url,
    hash,
    format,
    afterHash,
  };
};

const getUrl = param => createUrl(createUrlParamters(param));

export default ({
  eot,
  woff,
  ttf,
  svg,
  hash,
}) => {
  const fontName = `font-${uuid()}`;

  jss.createStyleSheet({
    '@font-face': {
      'font-family': JSON.stringify(fontName),
      src: [
        {
          url: eot,
          type: fontType.eot,
        },
        {
          url: woff,
          type: fontType.woff,
        },
        {
          url: ttf,
          type: fontType.ttf,
        },
        {
          url: svg,
          type: fontType.svg,
        },
      ]
        .filter(({ url }) => url !== undefined)
        .map(({ url, type }) => getUrl({ url, type, hash }))
        .join(', '),
    },
  }).attach();

  return fontName;
};
