import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/shared/redux-store/hooks";
import { fetchAllPostsAsync } from "./postsSlice";

export const PostsList = () => {
  const posts = useAppSelector((state) => state.posts.entities);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchAllPostsAsync());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
