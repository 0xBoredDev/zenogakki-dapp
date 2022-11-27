import React, { useEffect, useState, useContext } from "react";
// import "../components/Spinner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "../../components/Header";
// import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import bg_light from "../../images/home_light.png";
import bg_dark from "../../images/home_dark.png";
import { themeContext } from "../../App";
import themes from "../../helpers/themes";

function HomePage() {
  const theme = useContext(themeContext);
  const [backgroundSrc, setBackgroundSrc] = useState(bg_light);

  useEffect(() => {
    if (theme.current == themes.LIGHT) {
      setBackgroundSrc(bg_light);
    } else {
      setBackgroundSrc(bg_dark);
    }
  });
  return (
    <>
      {/* <Menu /> */}
      {/* <MenuV2 /> */}
      {/* <Header /> */}
      <div className="parallax">
        <img
          src={backgroundSrc}
          id="home"
          className="parallax-layer home-bg"
        ></img>
        {/* <div id="home" className="parallax-layer home-bg"></div> */}
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
