import React, { useEffect } from "react";
import gem from "../images/gem.svg";
// import { gsap } from "gsap";

const Header = () => {
  function toggleMenu() {
    var menu = document.getElementById("menu").classList;

    // if (menu.contains("menu-open")) {
    //   menu.remove("menu-open");
    // } else {
    //   menu.add("menu-open");
    // }
  }

  useEffect(() => {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.addEventListener("hidden.bs.offcanvas", (event) => {
      toggleMenu();
    });
    // sideMenu.addEventListener("show.bs.offcanvas", (event) => {
    //   gsap.from(".menu-line", {
    //     stagger: 0.2,
    //     duration: 1.2,
    //     x: 200,
    //   });
    // });
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
    // <nav className="navbar fixed-top navbar-expand-lg" id="navbar">
    //   <div className="container-fluid p-0">
    //     <a className="nav-link" href="/home">
    //       {/* <img src={logo} id="logo" height={120} width={100} /> */}
    //     </a>
    //     <div className="navbar" id="navbarNav">
    //       <div className="header-end">
    //         <ul className="navbar-nav">
    //           <li className="nav-item">
    //             <a
    //               className="nav-link p-0"
    //               onClick={toggleMenu}
    //               data-bs-toggle="offcanvas"
    //               data-bs-target="#sideMenu"
    //               aria-controls="sideMenu"
    //             >
    //               <img src={gem} className="img-fluid" id="menu" />
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Header;
