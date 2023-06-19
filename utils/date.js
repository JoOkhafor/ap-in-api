const now = function () {
  let a = new Date();
  return a.toLocaleDateString().split("/").join("");
};

module.exports = { now };
