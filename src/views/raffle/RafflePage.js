import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import throne from "../../images/throne.png";
import arrow from "../../images/arrow.png";
import swordsAudio from "../../sounds/swords.mp3";

function RafflePage() {
  const navigate = useNavigate();
  const [arrowClass, setArrowClass] = useState("");
  const swordsSound = new Audio(swordsAudio);

  function arrowClicked() {
    console.log("arrowClicked()");
    var arrowImg = document.getElementById("arrow").classList;
    console.log(arrowImg);
    if (!arrowImg.contains("move")) {
      setArrowClass("move");
    }
  }

  function toDashboard() {
    var arrow = document.getElementById("arrow");
    arrow.classList.add("flash");
    swordsSound.play();
    setTimeout(() => {
      navigate("/raffle/dashboard");
    }, 2000);
  }

  return (
    <main>
      <div className="relative lg:block h-screen w-full overflow-hidden">
        <div
          className="overflow-hidden bg-black aspect-[4250/2490] min-h-screen min-w-[100vw] absolute transform -translate-x-1/2 -translate-y-1/2"
          id="mouse-parallax-container"
          style={{
            overflow: "hidden",
            position: "relative",
            top: "50%",
            left: "50%",
          }}
        >
          <div style={{ willChange: "transform" }}>
            <img height="100%" className="absolute throne-ratio" src={throne} />
            <img
              height="100%"
              className="absolute"
              id="arrow"
              src={arrow}
              onClick={toDashboard}
            />
            {/* <img
              id="arrow"
              className={arrowClass}
              src={arrow}
              // onClick={arrowClicked}
              // onAnimationEnd={toDashboard}
              onClick={toDashboard}
            /> */}
          </div>
        </div>
      </div>
    </main>
    // <div className="container-fluid" style={{ padding: 0 }}>
    //   <div className="throne">
    //     <img src={throne} />
    //     <img
    //       id="arrow"
    //       className={arrowClass}
    //       src={arrow}
    //       // onClick={arrowClicked}
    //       // onAnimationEnd={toDashboard}
    //       onClick={toDashboard}
    //     />
    //   </div>
    // </div>
  );
}

export default RafflePage;
