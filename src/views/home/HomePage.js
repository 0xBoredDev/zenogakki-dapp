import React, { useEffect, useState, useContext } from "react";
import Footer from "../../components/Footer";
// import bg_light from "../../images/home_light.png";
// import bg_dark from "../../images/home_dark.png";
import bg_light from "../../images/home_light.mp4";
import bg_dark from "../../images/home_dark.mp4";
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
      <div className="parallax">
        {/* <img
          src={backgroundSrc}
          id="home"
          className="parallax-layer home-bg"
        ></img> */}
        <video
          width="100%"
          height="100%"
          className="parallax-layer max-w-full"
          autoPlay={true}
          muted={true}
          preload="auto"
          loop={true}
        >
          <source src={backgroundSrc}></source>
        </video>
        {/* <div id="home" className="parallax-layer home-bg"></div> */}
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
