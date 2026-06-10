import { Link } from "react-router-dom";

import { useApp } from "../context/AppContext";

export default function Header() {
  const { auth } = useApp();

  const renderContent = () => {
    switch (auth) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <>
            <li style={{ margin: "0 10px" }}>
              <Link to="/blogs">My Blogs</Link>
            </li>
            <li>
              <a href="/auth/logout">Logout</a>
            </li>
          </>
        );
    }
  };

  return (
    <nav className="indigo">
      <div className="nav-wrapper">
        <Link
          to={auth ? "/blogs" : "/"}
          className="left brand-logo"
          style={{ marginLeft: "10px" }}
        >
          Blogster
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
}
