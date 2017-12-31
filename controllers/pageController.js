module.exports = {
  index: function(req, res, next) {
    res.render("index", { title: "Aku Future Leader" });
  },
  about: function(req, res, next) {
    res.render("about", { title: "Aku Future Leader" });
  }
};
