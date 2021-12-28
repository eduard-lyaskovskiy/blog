const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail, "Invalid email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
    posts: Array,
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    }
  }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;


