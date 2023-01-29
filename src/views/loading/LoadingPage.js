import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import karth from "../../images/karth.png";
// import gem from "../../images/gem.png";
import orb from "../../images/orb.png";
import "../../components/Spinner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingAudio from "../../sounds/loading.mp3";
import gemAudio from "../../sounds/gem.wav";
// import { gsap } from "gsap";
// import MotionPathPlugin from "gsap/MotionPathPlugin";

function LoadingPage() {
  const gemSound = new Audio(gemAudio);
  const loadingSound = new Audio(loadingAudio);
  const navigate = useNavigate();
  // gsap.registerPlugin(MotionPathPlugin);
  // let tl = gsap.timeline({
  //   repeat: 0,
  // });

  useEffect(() => {
    var gem = document.getElementById("gem");
    var orb = document.getElementById("orb");

    orb.onclick = () => {
      loadingSound.play();
    };

    gem.onclick = () => {
      // console.log("gem clicked");
      gemSound.play();
      var karth = document.getElementById("karth");
      karth.className = "parallax-layer loading-bg flash";

      // gsap.to("#gem", {
      //   duration: 3,
      //   ease: "none",
      //   immediateRender: true,
      //   motionPath: {
      //     path: [{ scale: 1.2 }],
      //     curviness: 0,
      //   },
      // });

      // tl.to("#gem", {
      //   duration: 3,
      //   ease: "none",
      //   immediateRender: true,
      //   motionPath: {
      //     path: "M 100 150 l 100 50",
      //     align: "#path",
      //     alignOrigin: [0.5, 0.5],
      //   },
      // });

      // tl.call(navigateHome);
      setTimeout(() => {
        navigateHome();
      }, 1500);
    };
  });

  function navigateHome() {
    navigate("/home");
    loadingSound.pause();
  }

  return (
    <div className="parallax">
      <img src={karth} id="karth" className="parallax-layer loading-bg"></img>
      <img src={orb} id="orb" className="parallax-layer orb"></img>
      <div className="parallax-layer-overlay">
        <div id="gem"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoadingPage;
