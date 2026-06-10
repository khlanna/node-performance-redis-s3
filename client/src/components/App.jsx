import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useApp } from "../context/AppContext";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import BlogNew from "./blogs/BlogNew";
import BlogShow from "./blogs/BlogShow";

export default function App() {
  const { fetchUser } = useApp();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/blogs/new" element={<BlogNew />} />
          <Route path="/blogs/:id" element={<BlogShow />} />
          <Route path="/blogs" element={<Dashboard />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
