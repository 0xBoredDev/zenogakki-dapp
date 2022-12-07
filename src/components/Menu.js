import { useContext } from "react";
// import gem from "../images/gem.png";
import menu_light from "../images/menu_light.png";
import menu_dark from "../images/menu_dark.png";
import menu_line from "../images/menu_line.png";
import menu_spinner1 from "../images/menu_spinner1.png";
import menu_spinner2 from "../images/menu_spinner2.png";
import menu_spinner3 from "../images/menu_spinner3.png";
import menu_spinner4 from "../images/menu_spinner4.png";
import menu_spinner5 from "../images/menu_spinner5.png";
import { themeContext } from "../App";
import themes from "../helpers/themes";

const Menu = () => {
  const theme = useContext(themeContext);

  return (
    <div
      className={`offcanvas offcanvas-start`}
      tabIndex="-1"
      id="sideMenu"
      aria-labelledby="sideMenuLabel"
    >
      <img
        src={theme.current == themes.LIGHT ? menu_light : menu_dark}
        className="menu-bg"
      />
      <div className="menu-spinners">
        <img
          src={menu_spinner1}
          className="menu-spinner"
          style={{ top: "40%", left: "20%", width: "250px" }}
        />
        <img
          src={menu_spinner3}
          className="menu-spinner"
          style={{ top: "5%", left: "1%", width: "9rem" }}
        />
        <img
          src={menu_spinner2}
          className="menu-spinner-reverse"
          style={{ top: "4%", left: "60%", width: "8rem" }}
        />
        <img
          src={menu_spinner4}
          className="menu-spinner"
          style={{ top: "73%", left: "2%", width: "8rem" }}
        />
        <img
          src={menu_spinner5}
          className="menu-spinner-reverse"
          style={{ top: "78%", left: "60%", width: "8rem" }}
        />
      </div>
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="menu-links">
          <li>
            {/* <a href="/home" className={`menu-link ${theme.current}`}> */}
            <a href="/home" className={`menu-link`}>
              <span className="primary">Home</span>
              <span className="secondary">Home</span>
              <img src={menu_line} className="menu-line" alt="menu-line" />
            </a>
          </li>
          <li>
            <a href="/utopia" className="menu-link">
              <span className="primary">Utopia</span>
              <span className="secondary">Utopia</span>
              <img src={menu_line} className="menu-line" alt="menu-line" />
            </a>
          </li>
          <li>
            <a href="/story" className="menu-link">
              <span className="primary">Story</span>
              <span className="secondary">Story</span>
              <img src={menu_line} className="menu-line" alt="menu-line" />
            </a>
          </li>
          <li>
            <a href="/staking" className="menu-link">
              <span className="primary">Staking</span>
              <span className="secondary">Staking</span>
              <img src={menu_line} className="menu-line" alt="menu-line" />
            </a>
          </li>
          <li>
            <a href="/raffle" className="menu-link">
              <span className="primary">Raffle</span>
              <span className="secondary">Raffle</span>
              <img src={menu_line} className="menu-line" alt="menu-line" />
            </a>
          </li>
          <li>
            <a href="/shop" className="menu-link">
              <span className="primary">Shop</span>
              <span className="secondary">Shop</span>
              <img src={menu_line} className="menu-line" alt="menu-line" />
            </a>
          </li>
        </ul>
        {/* <div>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </div> */}
        {/* <div className="dropdown mt-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Dropdown button
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Menu;
