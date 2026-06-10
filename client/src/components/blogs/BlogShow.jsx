import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useApp } from "../../context/AppContext";

export default function BlogShow() {
  const { id } = useParams();
  const { blogs, fetchBlog } = useApp();
  const blog = blogs[id];

  useEffect(() => {
    fetchBlog(id);
  }, [fetchBlog, id]);

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
    </div>
  );
}
