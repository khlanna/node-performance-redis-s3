import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useApp } from "../../context/AppContext";

const IMAGE_BASE_URL = "https://s3.us-west-2.amazonaws.com/my-blog-bucket/";
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
  const renderImage = () => {
    if (blog.imageUrl) {
      return <img src={IMAGE_BASE_URL + blog.imageUrl} alt={blog.title} />;
    }
    return null;
  };

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      {renderImage()}
    </div>
  );
}
