export const makeEventId = () => {
  if (window && window.crypto && window.crypto.getRandomValues && Uint32Array) {
    var o = new Uint32Array(1);
    window.crypto.getRandomValues(o);
    return o[0];
  } else {
    console.warn('Falling back to pseudo-random client seed');
    return Math.floor(Math.random() * Math.pow(2, 32));
  }
};
