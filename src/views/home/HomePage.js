import React, { useEffect, useState, useContext } from "react";
import Footer from "../../components/Footer";
// import bg_light from "../../images/home_light.png";
// import bg_dark from "../../images/home_dark.png";
import bg_light from "../../images/home_light.mp4";
import bg_dark from "../../images/home_dark.mp4";
import { themeContext } from "../../App";
import themes from "../../helpers/themes";
import Spinner from "../../components/Spinner";

function HomePage() {
  const theme = useContext(themeContext);
  const [backgroundSrc, setBackgroundSrc] = useState(bg_light);

  useEffect(() => {
    if (theme.current == themes.LIGHT) {
      changeBG(bg_light);
    } else {
      changeBG(bg_dark);
    }
  });

  function changeBG(bg) {
    var video = document.getElementById("video");
    var videosrc = document.getElementById("videosrc");
    videosrc.setAttribute("src", bg);
    video.load();
    setBackgroundSrc(bg);
  }

  return (
    <>
      <div className="parallax">
        {/* <img
          src={backgroundSrc}
          id="home"
          className="parallax-layer home-bg"
        ></img> */}
        <div className="flex flew-row justify-center items-center h-screen">
          <Spinner className="-z-10" />
        </div>
        <video
          width="100%"
          height="100%"
          id="video"
          className="parallax-layer max-w-full"
          autoPlay={true}
          muted={true}
          preload="auto"
          loop={true}
        >
          <source id="videosrc" src={backgroundSrc}></source>
        </video>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
