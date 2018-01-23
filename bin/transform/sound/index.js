import Sound from 'react-native-sound';

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
  };

  return {
    instance,
    loaded: promise.then(() => instance),
  };
};
