const handleError = require("../utils/handle.error");
const axios = require("axios");
const UserModel = require("../models/User.js");

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

class PostController {
  getPosts = async (req, res) => {
    try {
      const id = req.params.id;
      const myId = req.user.userId;

      if (!myId) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (id) {
        const post = await instance.get(`/posts/${id}`);
        return res.status(200).json({
          post: post.data,
        });
      }

      const posts = await instance.get(`/posts`);

      return res.status(200).json({
        posts: posts.data,
      });
    } catch (e) {
      return handleError(500, e.message, res);
    }
  };

  savePost = async (req, res) => {
    try {
      const myId = req.user.userId;
      const { id } = req.params;

      if (!myId) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const post = await instance.get(`/posts/${id}`);
      const user = await UserModel.findOne({ _id: myId });

      if (!post.data.id) {
        return res.status(404).json({
          message: "Post not found",
          status: "error",
        });
      }

      const updatedPosts = [...user.posts, post.data.id];

      await UserModel.updateOne({ _id: myId }, { posts: updatedPosts })
        .then(() => {
          return res.status(200).json({
            message: "saved post",
          });
        })
        .catch((e) => {
          return handleError(500, e.message, res);
        });
    } catch (e) {
      return handleError(500, e.message, res);
    }
  };

  removePost = async (req, res) => {
    try {
      const myId = req.user.userId;
      const { id } = req.params;

      if (!myId) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = await UserModel.findOne({ _id: myId });

      const updatedPosts = user.posts.filter((post) => post != id);

      await UserModel.updateOne({ _id: myId }, { posts: updatedPosts })
        .then(() => {
          return res.status(200).json({
            message: "deleted post",
          });
        })
        .catch((e) => {
          return handleError(500, e.message, res);
        });
    } catch (e) {
      return handleError(500, e.message, res);
    }
  };
}

module.exports = PostController;
