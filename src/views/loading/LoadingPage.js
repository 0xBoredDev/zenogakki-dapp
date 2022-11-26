import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import karth from "../../images/karth.png";
// import gem from "../../images/gem.png";
import orb from "../../images/orb.png";
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import "../../components/Spinner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingAudio from "../../sounds/loading.mp3";
import gemAudio from "../../sounds/gem.wav";
// import HomePage from "../home/HomePage";

function LoadingPage() {
  gsap.registerPlugin(MotionPathPlugin);
  const gemSound = new Audio(gemAudio);
  const loadingSound = new Audio(loadingAudio);
  const navigate = useNavigate();

  useEffect(() => {
    var gem = document.getElementById("gem");
    var orb = document.getElementById("orb");

    orb.onclick = () => {
      loadingSound.play();
    };

    gem.onclick = () => {
      console.log("gem clicked");
      gemSound.play();
      var karth = document.getElementById("karth");
      karth.className = "parallax-layer loading-bg flash";

      gsap.to("#gem", {
        duration: 3,
        ease: "none",
        immediateRender: true,
        motionPath: {
          path: [{ scale: 1.5 }, { scale: 0.6 }],
          curviness: 0,
        },
      });

      gsap.to("#gem", {
        duration: 1,
        ease: "back.out(.2)",
        immediateRender: true,
        motionPath: {
          path: "M 150,200 l -150 200",
          align: "#path",
          alignOrigin: [0.5, 0.5],
        },
      });

      setTimeout(() => {
        gsap.to("#gem", {
          duration: 3,
          ease: "back.out(.2)",
          immediateRender: true,
          motionPath: {
            path: `M 0,400 l ${window.innerWidth * 0.6} ${-(
              window.innerHeight * 0.4
            )})`,
            align: "#path",
            alignOrigin: [0.5, 0.5],
          },
        });
      }, 1000);

      setTimeout(() => {
        gsap.to("#gem", {
          duration: 2,
          ease: "back.out(.2)",
          rotation: -75,
        });
      }, 1500);

      setTimeout(() => {
        navigate("/home");
        loadingSound.pause();
      }, 3500);
    };
  });

  return (
    <div className="parallax">
      {/* <div id="karth" className="parallax-layer loading-bg"></div> */}
      <img src={karth} id="karth" className="parallax-layer loading-bg"></img>
      <img src={orb} id="orb" className="parallax-layer orb"></img>
      {/* <svg id="motionPath">
        <path
          id="path"
          d="M 150,200 l -150 200 l 900 -400"
          stroke="black"
          fill="transparent"
        />
      </svg> */}
      <div className="parallax-layer-overlay">
        <div id="gem"></div>
      </div>
      <ToastContainer />
      {/* <audio src={loadingSound} autoPlay={true} loop="loop"></audio> */}
    </div>
  );
}

export default LoadingPage;
