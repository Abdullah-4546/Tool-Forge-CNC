import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link from react-router-dom
import menuItems from "../../../assets/menuItems.json";
import { useSelector } from "react-redux";


const SellerNavbarVertical = () => {
  const [state, setState] = useState({});
  const location = useLocation(); // Get the current location object
  const currentUrl = location.pathname; // Get the current URL path
  const {isAuthenticated, user, loading} = useSelector((state) => state.auth);
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
        const isActive = currentUrl === subOption.url; // Compare with the current URL

        return (
          <div className="nav-item" key={subOption.name}>
            <Link
              className={`nav-link ${isActive ? "active" : ""}`}
              to={subOption.url}
            >
              {/* <i className={`${subOption.icon} nav-icon me-2`}></i> */}
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
          {loading ? '...' : (isAuthenticated && user && `${user?.sellerInfo?.companyName}`)}
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

export default SellerNavbarVertical;
