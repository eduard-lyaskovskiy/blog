import React from "react";
import { Posts, User } from "../api";
import { AuthContext } from "../context/AuthContext";
import ViewPosts from "../components/ViewPosts";

const PostPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [savedPosts, setSavedPosts] = React.useState([]);
  const [status, setStatus] = React.useState({});
  const auth = React.useContext(AuthContext);

  React.useEffect(() => {
    Posts.getPosts(auth.token).then((result) => {
      setPosts(result.posts);
    });
  }, [auth.token]);

  React.useEffect(() => {
    User.getMe(auth.token).then((response) => {
      setUser(response.result);
    });
  }, [status]);

  React.useEffect(() => {
    if (user?.posts) {
      if (!user.posts.length) {
        setSavedPosts(user.posts);
      }

      user.posts.forEach((post) => {
        Posts.getPostById(post, auth.token).then((response) => {
          setSavedPosts((prev) => [
            ...prev.filter((p) => p.id !== post),
            response.post,
          ]);
        });
      });
    }
  }, [user]);

  const handleChangeStatus = (status) => setStatus(status);

  return (
    <div>
      {savedPosts.length > 0 && (
        <ViewPosts
          title="Saved Posts"
          posts={savedPosts}
          handleChangeStatus={handleChangeStatus}
        />
      )}
      <br />
      <hr />
      <br />
      {posts.length > 0 && (
        <ViewPosts
          title="Posts"
          posts={posts}
          handleChangeStatus={handleChangeStatus}
        />
      )}
    </div>
  );
};

export default PostPage;
