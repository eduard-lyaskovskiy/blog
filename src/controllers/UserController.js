const UserModel = require("../models/User.js");

class UserController {
  getUserById = async (req, res) => {
    try {
      const id = req.params.id ? req.params.id : req.user.userId;

      if (!id) {
        return res
          .status(400)
          .json({ message: "User not found", status: "error" });
      }

      const user = await UserModel.findById(id, "_id email posts").exec();

      return res.status(200).json({
        result: user,
        status: "success",
      });
    } catch (e) {
      res.status(500).json({
        error: e.message,
        status: "error",
      });
    }
  };
}

module.exports = UserController;
