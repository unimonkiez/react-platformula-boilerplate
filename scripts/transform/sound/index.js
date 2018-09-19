// Used in app, no need to check here
/* eslint-disable */
import Sound from 'react-native-sound';
/* eslint-enable */

export default (source) => {
  let res;
  let rej;
  const promise = new Promise((_res, _rej) => {
    res = _res;
    rej = _rej;
  });

  const sound = new Sound(source, Sound.MAIN_BUNDLE, (err) => {
    if (err) {
      rej(err);
    } else {
      res();
    }
  });

  const instance = {
    play() {
      sound.play();
    },
    loaded: promise.then(() => instance),
  };

  return instance;
};
