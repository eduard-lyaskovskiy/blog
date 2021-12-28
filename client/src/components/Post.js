import React from "react";

const Post = ({ title, body, handleDelete, handleSave }) => {
  return (
    <div className="post">
      <h2 className="post_title">{title}</h2>
      <div className="post_content">{body}</div>
      <button onClick={handleSave}>Save Post</button>
      <button onClick={handleDelete}>Del Post</button>
    </div>
  );
};

export default Post;
