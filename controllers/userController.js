module.exports = {
  index: function(req, res, next) {
    res.render("index", { title: "Aku Future Leader" });
  }
};