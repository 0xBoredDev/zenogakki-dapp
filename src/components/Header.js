import React, { useEffect } from "react";
import gem from "../images/gem.png";
import { gsap } from "gsap";

const Header = () => {
  function toggleMenu() {
    var menu = document.getElementById("menu");

    if (menu.className == "img-fluid") {
      menu.className = "img-fluid menu-open";
    } else if (menu.className == "img-fluid menu-open") {
      menu.className = "img-fluid";
    }
  }

  useEffect(() => {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.addEventListener("hidden.bs.offcanvas", (event) => {
      toggleMenu();
    });
    sideMenu.addEventListener("show.bs.offcanvas", (event) => {
      gsap.from(".menu-line", {
        stagger: 0.2,
        duration: 1.2,
        x: 200,
      });
    });
  });

  return (
    <nav className="navbar fixed-top navbar-expand-lg" id="navbar">
      <div className="container-fluid">
        <a className="nav-link" href="/home">
          {/* <img src={logo} id="logo" height={120} width={100} /> */}
        </a>
        <div className="navbar" id="navbarNav">
          <div className="header-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={toggleMenu}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#sideMenu"
                  aria-controls="sideMenu"
                >
                  <img src={gem} className="img-fluid" id="menu" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
