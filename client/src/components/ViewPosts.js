import React from "react";
import Post from "./Post";
import { Posts } from "../api";
import { AuthContext } from "../context/AuthContext";

const ViewPosts = ({ title, posts, handleChangeStatus }) => {
  const auth = React.useContext(AuthContext);

  const handleDelete = (id) => {
    return async () => {
      try {
        const response = await Posts.removePostById(id, auth.token);
        handleChangeStatus({ status: response.status });
      } catch (e) {
        console.error(e);
      }
    };
  };

  const handleSave = (id) => {
    return async () => {
      try {
        const response = await Posts.savePost(id, auth.token);
        handleChangeStatus({ status: response.status });
      } catch (e) {
        console.error(e);
      }
    };
  };

  return (
    <section className="section-posts">
      <h1>{title}:</h1>
      {posts.map((post, index) => (
        <Post
          key={`${post.title}-${index}`}
          title={post.title}
          body={post.body}
          handleDelete={handleDelete(post.id)}
          handleSave={handleSave(post.id)}
        />
      ))}
    </section>
  );
};

export default ViewPosts;
