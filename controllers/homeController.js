module.exports = {
  index: function(req, res, next) {
    res.render("index", { title: "Future Leader" });
  },
  about: function(req, res, next) {
    res.render("about", { title: "Aku Future Leader" });
  }
};
