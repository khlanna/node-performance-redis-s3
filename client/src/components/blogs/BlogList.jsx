import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useApp } from "../../context/AppContext";

export default function BlogList() {
  const { blogs, fetchBlogs } = useApp();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div>
      {Object.values(blogs).map((blog) => (
        <div className="card darken-1 horizontal" key={blog._id}>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action">
              <Link to={`/blogs/${blog._id}`}>Read</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
