const home = (req, res, next) => {
  const title = "Home";
  return res.render("index", { title });
};

module.exports = {
  home,
};
