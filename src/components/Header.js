import React, { useEffect } from "react";
import gem from "../images/gem.svg";

const Header = () => {
  function toggleMenu() {
    var menu = document.getElementById("menu").classList;
  }

  useEffect(() => {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.addEventListener("hidden.bs.offcanvas", (event) => {
      toggleMenu();
    });
  });

  return (
    <div className="flex flex-row absolute top-0 right-0 overflow-hidden">
      <a
        className="nav-link p-0 z-10"
        onClick={toggleMenu}
        data-bs-toggle="offcanvas"
        data-bs-target="#sideMenu"
        aria-controls="sideMenu"
      >
        <img src={gem} className="img-fluid" id="menu" />
      </a>
    </div>
  );
};

export default Header;
