const now = function () {
  let a = new Date();
  return (
    a.toLocaleDateString().split("/").join("") +
    a.getHours() +
    a.getMinutes() +
    a.getSeconds()
  );
};

module.exports = { now };
