import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "axios";

const AppContext = createContext(null);

const indexById = (blogs) =>
  blogs.reduce((acc, blog) => {
    acc[blog._id] = blog;
    return acc;
  }, {});

export function AppProvider({ children }) {
  // auth: null = unknown/loading, false = logged out, object = logged-in user
  const [auth, setAuth] = useState(null);
  const [blogs, setBlogs] = useState({});

  const fetchUser = useCallback(async () => {
    const res = await axios.get("/api/current_user");
    setAuth(res.data || false);
  }, []);

  const fetchBlogs = useCallback(async () => {
    const res = await axios.get("/api/blogs");
    setBlogs((prev) => ({ ...prev, ...indexById(res.data) }));
  }, []);

  const fetchBlog = useCallback(async (id) => {
    const res = await axios.get(`/api/blogs/${id}`);
    setBlogs((prev) => ({ ...prev, [res.data._id]: res.data }));
  }, []);

  const submitBlog = useCallback(async (values, file) => {
    const uploadConfig = await axios.get("/api/upload");
    const { url, key } = uploadConfig.data;
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    const res = await axios.post("/api/blogs", { ...values, imageUrl: key });
    setBlogs((prev) => ({ ...prev, [res.data._id]: res.data }));
    return res.data;
  }, []);

  const value = useMemo(
    () => ({ auth, blogs, fetchUser, fetchBlogs, fetchBlog, submitBlog }),
    [auth, blogs, fetchUser, fetchBlogs, fetchBlog, submitBlog],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
