export default (source) => {
  const audio = new Audio();
  audio.setAttribute('src', source);

  const promise = new Promise((res) => {
    audio.addEventListener('load', res);
  });

  const instance = {
    play() {
      audio.play();
    },
  };

  return {
    instance,
    loaded: promise.then(() => instance),
  };
};
