import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg"; // Import CgProfile icon
import menuItems from "../../../assets/adminItems.json";
const AdminNavbarVertical = () => {
  const [state, setState] = useState({});
  const location = useLocation();
  const currentUrl = location.pathname;
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const handleClick = (item, url) => {
    setState((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const renderMenuItem = (children) => {
    if (!children) {
      return null;
    }

    return children.map((subOption) => {
      if (!subOption.children) {
        const isActive = currentUrl === subOption.url;

        return (
          <div className="nav-item" key={subOption.name}>
            <Link
              className={`nav-link ${isActive ? "active" : ""}`}
              to={subOption.url}
            >
              <span className="">{subOption.name}</span>
            </Link>
          </div>
        );
      }

      const isParentActive = subOption.children.some(
        (child) => currentUrl === child.url
      );

      return (
        <div className="nav-item" key={subOption.name}>
          <a
            className={`nav-link ${isParentActive ? "active" : ""}`}
            onClick={() => handleClick(subOption.name)}
            style={{ cursor: "pointer" }}
          ></a>
          <div className={`collapse ${state[subOption.name] ? "show" : ""}`}>
            {renderMenuItem(subOption.children)}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="navbar-vertical">
        <Link to="/" className="nav-brand ">
          <h1 className="text-2xl text-white py-10">
            {loading ? '...' : (
              isAuthenticated && user && (
                <>
                  <CgProfile className="inline-block align-text-top text-xl w-10 h-10" />
                  <span className="ml-2">{user?.username}</span>
                </>
              )
            )}
          </h1>
        </Link>
        <div className="">
          <nav className="nav-list flex-column d-flex">
            {renderMenuItem(menuItems.data)}
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminNavbarVertical;
