import "./navbar.css";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { RiCloseFill, RiMenu2Fill } from "react-icons/ri";
import { useState } from "react";

const Menu = () => {
  return (
    <ul>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/add"}>Add Book</NavLink>
      </li>
      <li>
        <NavLink to={"books"}>All Books</NavLink>
      </li>
    </ul>
  );
};

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__container-logo">
          <Link to={"/"}>
            <img src={logo} alt="booktracker logo" />
          </Link>
        </div>
        <div className="navbar__container-navlinks">{<Menu />}</div>
      </div>
      <div className="navbar__menu">
        <div className="navbar__menu-icon">
          {toggleMenu ? (
            <RiCloseFill
              onClick={() => {
                setToggleMenu(false);
              }}
              color="#ffff"
              size={34}
            />
          ) : (
            <RiMenu2Fill
              onClick={() => {
                setToggleMenu(true);
              }}
              color="#ffff"
              size={34}
            />
          )}
        </div>
        {toggleMenu && (
          <div className="navbar__menu-container scale-up-center">
            {<Menu />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
