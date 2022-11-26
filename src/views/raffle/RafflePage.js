import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../../components/Spinner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import throne from "../../images/throne.png";
import arrow from "../../images/arrow.png";

function RafflePage() {
  const navigate = useNavigate();
  const [arrowClass, setArrowClass] = useState("");
  function arrowClicked() {
    console.log("arrowClicked()");
    var arrowImg = document.getElementById("arrow").classList;
    console.log(arrowImg);
    if (!arrowImg.contains("move")) {
      setArrowClass("move");
    }
  }

  function toDashboard() {
    navigate("/raffle/dashboard");
  }

  return (
    <>
      <Menu />
      <Header />
      <div className="container-fluid" style={{ padding: 0 }}>
        <div className="throne">
          <img src={throne} />
          <img
            id="arrow"
            className={arrowClass}
            src={arrow}
            onClick={arrowClicked}
            onAnimationEnd={toDashboard}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default RafflePage;
