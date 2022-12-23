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
    swordsSound.play();
    setTimeout(() => {
      navigate("/raffle/dashboard");
    }, 2000);
  }

  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <div className="throne">
        <img src={throne} />
        <img
          id="arrow"
          className={arrowClass}
          src={arrow}
          // onClick={arrowClicked}
          // onAnimationEnd={toDashboard}
          onClick={toDashboard}
        />
      </div>
    </div>
  );
}

export default RafflePage;
