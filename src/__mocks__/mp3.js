const instance = {
  play() {
  },
};

const obj = {
  instance,
  loaded: Promise.resolve(instance),
};

export default obj.instance;

export const { loaded } = obj;
