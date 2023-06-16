function random() {
  const o = Math.random();
  let r = o.toString().split(".")[1];
  return r;
}

module.exports = { random };
