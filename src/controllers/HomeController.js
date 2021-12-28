const path = require("path");

class HomeController {
  index(_req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
  }
}

module.exports = HomeController;
