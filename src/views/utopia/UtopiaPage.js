import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";
// import Header from "../../components/Header";
// import Menu from "../../components/Menu";
import utopia from "../../images/utopia/utopia.png";
//earth
import earth1 from "../../images/utopia/earth/earth1.png";
import earth2 from "../../images/utopia/earth/earth2.png";
import earth3 from "../../images/utopia/earth/earth3.png";
//fire
import fire1 from "../../images/utopia/fire/fire1.png";
import fire2 from "../../images/utopia/fire/fire2.png";
import fire3 from "../../images/utopia/fire/fire3.png";
//light
import light1 from "../../images/utopia/light/light1.png";
import light2 from "../../images/utopia/light/light2.png";
import light3 from "../../images/utopia/light/light3.png";
//mecha
import mecha1 from "../../images/utopia/mecha/mecha1.png";
import mecha2 from "../../images/utopia/mecha/mecha2.png";
import mecha3 from "../../images/utopia/mecha/mecha3.png";
//lostcity
import lostcity1 from "../../images/utopia/lostcity/lostcity1.png";
import lostcity2 from "../../images/utopia/lostcity/lostcity2.png";
import lostcity3 from "../../images/utopia/lostcity/lostcity3.png";
//wind
import wind1 from "../../images/utopia/wind/wind1.png";
import wind2 from "../../images/utopia/wind/wind2.png";
import wind3 from "../../images/utopia/wind/wind3.png";
import wind4 from "../../images/utopia/wind/wind4.png";
//water
import water1 from "../../images/utopia/water/water1.png";
import water2 from "../../images/utopia/water/water2.png";
import water3 from "../../images/utopia/water/water3.png";
//mystical
import mystical1 from "../../images/utopia/mystical/mystical1.png";
import mystical2 from "../../images/utopia/mystical/mystical2.png";
import mystical3 from "../../images/utopia/mystical/mystical3.png";
//theunknown
import theunknown1 from "../../images/utopia/theunknown/theunknown1.png";
//shadow
import shadow1 from "../../images/utopia/shadow/shadow1.png";
import shadow2 from "../../images/utopia/shadow/shadow2.png";
import shadow3 from "../../images/utopia/shadow/shadow3.png";
import shadow4 from "../../images/utopia/shadow/shadow4.png";
import { render } from "@testing-library/react";
import Spinner from "../../components/Spinner";

var utopiaModal;
const elemImages = {
  lostcity: [
    { id: 0, img: lostcity1 },
    { id: 1, img: lostcity2 },
    { id: 2, img: lostcity3 },
  ],
  mecha: [
    { id: 0, img: mecha1 },
    { id: 1, img: mecha2 },
    { id: 2, img: mecha3 },
  ],
  water: [
    { id: 0, img: water1 },
    { id: 1, img: water2 },
    { id: 2, img: water3 },
  ],
  wind: [
    { id: 0, img: wind1 },
    { id: 1, img: wind2 },
    { id: 2, img: wind3 },
    { id: 3, img: wind4 },
  ],
  light: [
    { id: 0, img: light1 },
    { id: 1, img: light2 },
    { id: 2, img: light3 },
  ],
  theunknown: [{ id: 0, img: theunknown1 }],
  earth: [
    { id: 0, img: earth1 },
    { id: 1, img: earth2 },
    { id: 2, img: earth3 },
  ],
  fire: [
    { id: 0, img: fire1 },
    { id: 1, img: fire2 },
    { id: 2, img: fire3 },
  ],
  mystical: [
    { id: 0, img: mystical1 },
    { id: 1, img: mystical2 },
    { id: 2, img: mystical3 },
  ],
  shadow: [
    { id: 0, img: shadow1 },
    { id: 1, img: shadow2 },
    { id: 2, img: shadow3 },
    { id: 3, img: shadow4 },
  ],
};

const elemText = {
  lostcity:
    "lostcity ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  mecha:
    "mecha ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  water:
    "water ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  wind: "wind ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  light:
    "light ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  theunknown:
    "theunknown ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  earth:
    "earth ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  fire: "fire ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  mystical:
    "mystical ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  shadow:
    "shadow ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

function UtopiaPage() {
  const [modalImgs, setModalImgs] = useState(elemImages["water"]);
  const [modalText, setModalText] = useState("");
  useEffect(() => {
    utopiaModal = new Modal("#utopiaModal", {
      backdrop: true,
    });
  });

  useEffect(() => {
    const ele = document.getElementById("mouse-parallax-container");
    ele.style.cursor = "grab";
    // ele.scrollTop = 100;
    // ele.scrollLeft = 150;
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";
      pos = {
        // The current scroll
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      ele.style.cursor = "grab";
      ele.style.removeProperty("user-select");

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    ele.addEventListener("mousedown", mouseDownHandler);
  }, []);

  function showItem(element) {
    console.log("showItem()");
    setModalImgs(elemImages[element]);
    setModalText(elemText[element]);
    utopiaModal.show();
  }

  function carouselItems() {
    let items = modalImgs.map((item) => (
      <div
        className={item.id == 0 ? "carousel-item active" : "carousel-item"}
        key={item.id}
      >
        <img src={item.img} className="d-block w-100" alt="..." />
        <div className="carousel-caption">
          <p className="primary-font text-xl">
            <span className="bg-white/[.3] rounded py-0 px-1">Mecha</span>
          </p>
          {/* <p>{modalText}</p> */}
        </div>
      </div>
    ));

    return items;
  }

  function carouselBtns() {
    let btns = modalImgs.map((item) => (
      <button
        key={item.id}
        type="button"
        data-bs-target="#carouselCaptions"
        data-bs-slide-to={item.id}
        className={item.id == 0 ? "active" : ""}
        aria-current={item.id == 0 ? "true" : "false"}
        aria-label={`Slide ${item.id + 1}`}
      ></button>
    ));
    return btns;
  }

  return (
    <main>
      <div
        className="relative lg:block h-screen w-full"
        id="mouse-parallax-container"
      >
        <div
          className="bg-black utopia-ratio min-h-screen min-w-[100vw] absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            overflow: "hidden",
            position: "relative",
            top: "50%",
            left: "50%",
          }}
        >
          <div style={{ willChange: "transform" }}>
            <img height="100%" className="absolute" src={utopia} />
          </div>
        </div>
        <div className="overflow-hidden pointer-events-none utopia-ratio min-h-screen min-w-[100vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full relative">
            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "20%", left: "25%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("lostcity");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "12%", left: "54%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("mecha");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "30%", left: "65%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("water");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "23%", left: "90%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("wind");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "44%", left: "92%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("light");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "88%", left: "78%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("theunknown");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "53%", left: "65%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("earth");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "53%", left: "50%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("fire");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "74%", left: "49%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("mystical");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="absolute w-20 h-20 pointer-events-auto"
              style={{ top: "83%", left: "10%" }}
            >
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-8 h-8">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                        <span
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                          onClick={(e) => {
                            showItem("shadow");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 sm:bottom-10 left-2 w-auto h-4 flex flex-row transition-all delay-1000 duration-700 opacity-100">
        <h3 className="font-800 cursor-default uppercase text-3xl sm:text-4xl uppercase font-black text-white">
          <span className="lg:ml-2 primary-font drop-shadow-lg bg-white/[.3] rounded py-0 px-1">
            Utopia
          </span>
        </h3>
      </div>
      <div
        className="modal fade fixed transform z-100 w-full h-full"
        id="utopiaModal"
        tabIndex="-1"
        aria-labelledby="utopiaModalLabel"
        aria-hidden="true"
        style={{
          transform: "translate3d(-50%, -50%, 0px) scale(1)",
          left: "50%",
          top: "50%",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div
              id="carouselCaptions"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
              data-bs-pause="false"
            >
              <div className="carousel-indicators">{carouselBtns()}</div>
              <div className="carousel-inner">{carouselItems()}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  // <>
  //   <Menu />
  //   <Header />
  //   <div className="container-fluid" style={{ padding: 0 }}>
  //     <div className="hotspot">
  //       <img src={utopia} id="utopia" />
  //       <div
  //         className="item bottom"
  //         style={{ top: "20%", left: "25%" }}
  //         onClick={(e) => {
  //           showItem("lostcity");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Lost City</h3>
  //         </div>
  //       </div>
  //       <div
  //         className="item bottom"
  //         style={{ top: "12%", left: "54%" }}
  //         onClick={(e) => {
  //           showItem("mecha");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Mecha</h3>
  //         </div>
  //       </div>
  //       <div
  //         className="item bottom"
  //         style={{ top: "30%", left: "65%" }}
  //         onClick={(e) => {
  //           showItem("water");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Water</h3>
  //         </div>
  //       </div>

  //       <div
  //         className="item left"
  //         style={{ top: "23%", left: "90%" }}
  //         onClick={(e) => {
  //           showItem("wind");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Wind</h3>
  //         </div>
  //       </div>

  //       <div
  //         className="item left"
  //         style={{ top: "44%", left: "92%" }}
  //         onClick={(e) => {
  //           showItem("light");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Light</h3>
  //         </div>
  //       </div>

  //       <div
  //         className="item top"
  //         style={{ top: "88%", left: "78%" }}
  //         onClick={(e) => {
  //           showItem("theunknown");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>The Unknown</h3>
  //         </div>
  //       </div>

  //       <div
  //         className="item top"
  //         style={{ top: "53%", left: "65%" }}
  //         onClick={(e) => {
  //           showItem("earth");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Earth</h3>
  //         </div>
  //       </div>

  //       <div
  //         className="item top"
  //         style={{ top: "53%", left: "50%" }}
  //         onClick={(e) => {
  //           showItem("fire");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Fire</h3>
  //         </div>
  //       </div>

  //       <div
  //         className="item top"
  //         style={{ top: "74%", left: "49%" }}
  //         onClick={(e) => {
  //           showItem("mystical");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Mystical</h3>
  //         </div>
  //       </div>
  //       <div
  //         className="item right"
  //         style={{ top: "83%", left: "10%" }}
  //         onClick={(e) => {
  //           showItem("shadow");
  //         }}
  //       >
  //         <div className="icon"></div>
  //         <div className="tt">
  //           <h3>Shadow</h3>
  //         </div>
  //       </div>
  //     </div>
  //     <div
  //       className="modal fade"
  //       id="utopiaModal"
  //       tabIndex="-1"
  //       aria-labelledby="utopiaModalLabel"
  //       aria-hidden="true"
  //     >
  //       <div className="modal-dialog">
  //         <div className="modal-content">
  //           <button
  //             type="button"
  //             className="btn-close"
  //             data-bs-dismiss="modal"
  //             aria-label="Close"
  //           ></button>
  //           <div
  //             id="carouselCaptions"
  //             className="carousel slide carousel-fade"
  //             data-bs-ride="carousel"
  //             data-bs-pause="false"
  //           >
  //             <div className="carousel-indicators">{carouselBtns()}</div>
  //             <div className="carousel-inner">{carouselItems()}</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <ToastContainer />
  //   </div>
  // </>
  // );
}

export default UtopiaPage;
