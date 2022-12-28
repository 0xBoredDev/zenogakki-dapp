import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";
import utopia from "../../images/utopia/utopia.png";
import utopia_sm from "../../images/utopia/utopia_vertical.png";
//earth
import earth1 from "../../images/utopia/earth/earth1.png";
import earth2 from "../../images/utopia/earth/earth2.png";
import earth3 from "../../images/utopia/earth/earth3.png";
import earthv1 from "../../images/utopia/earth/earthv1.png";
import earthv2 from "../../images/utopia/earth/earthv2.png";
import earthv3 from "../../images/utopia/earth/earthv3.png";
//fire
import fire1 from "../../images/utopia/fire/fire1.png";
import fire2 from "../../images/utopia/fire/fire2.png";
import fire3 from "../../images/utopia/fire/fire3.png";
import firev1 from "../../images/utopia/fire/firev1.png";
import firev2 from "../../images/utopia/fire/firev2.png";
import firev3 from "../../images/utopia/fire/firev3.png";
//light
import light1 from "../../images/utopia/light/light1.png";
import light2 from "../../images/utopia/light/light2.png";
import light3 from "../../images/utopia/light/light3.png";
import lightv1 from "../../images/utopia/light/lightv1.png";
import lightv2 from "../../images/utopia/light/lightv2.png";
import lightv3 from "../../images/utopia/light/lightv3.png";
//mecha
import mecha1 from "../../images/utopia/mecha/mecha1.png";
import mecha2 from "../../images/utopia/mecha/mecha2.png";
import mecha3 from "../../images/utopia/mecha/mecha3.png";
import mechav1 from "../../images/utopia/mecha/mechav1.png";
import mechav2 from "../../images/utopia/mecha/mechav2.png";
import mechav3 from "../../images/utopia/mecha/mechav3.png";
//lostcity
import lostcity1 from "../../images/utopia/lostcity/lostcity1.png";
import lostcity2 from "../../images/utopia/lostcity/lostcity2.png";
import lostcity3 from "../../images/utopia/lostcity/lostcity3.png";
import lostcityv1 from "../../images/utopia/lostcity/lostcityv1.png";
import lostcityv2 from "../../images/utopia/lostcity/lostcityv2.png";
import lostcityv3 from "../../images/utopia/lostcity/lostcityv3.png";
//wind
import wind1 from "../../images/utopia/wind/wind1.png";
import wind2 from "../../images/utopia/wind/wind2.png";
import wind3 from "../../images/utopia/wind/wind3.png";
import windv1 from "../../images/utopia/wind/windv1.png";
import windv2 from "../../images/utopia/wind/windv2.png";
import windv3 from "../../images/utopia/wind/windv3.png";
//water
import water1 from "../../images/utopia/water/water1.png";
import water2 from "../../images/utopia/water/water2.png";
import water3 from "../../images/utopia/water/water3.png";
import waterv1 from "../../images/utopia/water/waterv1.png";
import waterv2 from "../../images/utopia/water/waterv2.png";
import waterv3 from "../../images/utopia/water/waterv3.png";
//mystical
import mystical1 from "../../images/utopia/mystical/mystical1.png";
import mystical2 from "../../images/utopia/mystical/mystical2.png";
import mystical3 from "../../images/utopia/mystical/mystical3.png";
import mysticalv1 from "../../images/utopia/mystical/mysticalv1.png";
import mysticalv2 from "../../images/utopia/mystical/mysticalv2.png";
import mysticalv3 from "../../images/utopia/mystical/mysticalv3.png";
//theunknown
import theunknown1 from "../../images/utopia/theunknown/theunknown1.png";
import theunknownv1 from "../../images/utopia/theunknown/theunknownv1.png";
//shadow
import shadow1 from "../../images/utopia/shadow/shadow1.png";
import shadow2 from "../../images/utopia/shadow/shadow2.png";
import shadow3 from "../../images/utopia/shadow/shadow3.png";
import shadow4 from "../../images/utopia/shadow/shadow4.png";
import shadowv1 from "../../images/utopia/shadow/shadowv1.png";
import shadowv2 from "../../images/utopia/shadow/shadowv2.png";
import shadowv3 from "../../images/utopia/shadow/shadowv3.png";
import shadowv4 from "../../images/utopia/shadow/shadowv4.png";

var utopiaModal;
const elemImages = {
  lostcity: [
    { id: 0, img: lostcity1, imgv: lostcityv1 },
    { id: 1, img: lostcity2, imgv: lostcityv2 },
    { id: 2, img: lostcity3, imgv: lostcityv3 },
  ],
  mecha: [
    { id: 0, img: mecha1, imgv: mechav1 },
    { id: 1, img: mecha2, imgv: mechav2 },
    { id: 2, img: mecha3, imgv: mechav3 },
  ],
  water: [
    { id: 0, img: water1, imgv: waterv1 },
    { id: 1, img: water2, imgv: waterv2 },
    { id: 2, img: water3, imgv: waterv3 },
  ],
  wind: [
    { id: 0, img: wind1, imgv: windv1 },
    { id: 1, img: wind2, imgv: windv2 },
    { id: 2, img: wind3, imgv: windv3 },
  ],
  light: [
    { id: 0, img: light1, imgv: lightv1 },
    { id: 1, img: light2, imgv: lightv2 },
    { id: 2, img: light3, imgv: lightv3 },
  ],
  theunknown: [{ id: 0, img: theunknown1, imgv: theunknownv1 }],
  earth: [
    { id: 0, img: earth1, imgv: earthv1 },
    { id: 1, img: earth2, imgv: earthv2 },
    { id: 2, img: earth3, imgv: earthv3 },
  ],
  fire: [
    { id: 0, img: fire1, imgv: firev1 },
    { id: 1, img: fire2, imgv: firev2 },
    { id: 2, img: fire3, imgv: firev3 },
  ],
  mystical: [
    { id: 0, img: mystical1, imgv: mysticalv1 },
    { id: 1, img: mystical2, imgv: mysticalv2 },
    { id: 2, img: mystical3, imgv: mysticalv3 },
  ],
  shadow: [
    { id: 0, img: shadow1, imgv: shadowv1 },
    { id: 1, img: shadow2, imgv: shadowv2 },
    { id: 2, img: shadow3, imgv: shadowv3 },
    { id: 3, img: shadow4, imgv: shadowv4 },
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

  const [smallView, setSmallView] = useState(window.innerWidth <= 1023.98);
  function updateSize() {
    setSmallView(window.innerWidth <= 1023.98);
  }

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      updateSize();
    });
  }, []);

  function showItem(element = "") {
    console.log("showItem()");
    setModalText(element);
    setModalImgs(elemImages[element.replace(" ", "")]);
    utopiaModal.show();
  }

  function carouselItems() {
    let items = modalImgs.map((item) => (
      <div
        className={item.id == 0 ? "carousel-item active" : "carousel-item"}
        key={item.id}
      >
        <img
          src={smallView ? item.imgv : item.img}
          className="d-block w-100 h-screen aspect-[4250/2490]"
          alt="..."
        />
        <div className="carousel-caption">
          <p className="primary-font text-xl lg:text-4xl">
            <span className="bg-white/[.3] rounded py-0 px-1 uppercase">
              {modalText}
            </span>
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
      <div className="relative lg:block h-screen w-full overflow-hidden">
        <div
          className="bg-black aspect-[1/1] lg:aspect-[4250/2490] min-h-screen min-w-[100vw] absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            overflow: "hidden",
            position: "relative",
            top: "50%",
            left: "50%",
          }}
        >
          <div style={{ willChange: "transform" }}>
            <img
              height="100%"
              className="absolute"
              src={smallView ? utopia_sm : utopia}
            />
          </div>
        </div>
        <div className="overflow-hidden pointer-events-none aspect-[1/1] lg:aspect-[4250/2490] min-h-screen min-w-[100vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full relative">
            <div className="absolute w-20 h-20 pointer-events-auto top-[20%] left-[25%] lg:top-[36%] lg:left-[17%]">
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
                            showItem("lost city");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute w-20 h-20 pointer-events-auto top-[22%] left-[57%] lg:top-[26%] lg:left-[40%]">
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

            <div className="absolute w-20 h-20 pointer-events-auto top-[47%] left-[30%] lg:top-[61%] lg:left-[19%]">
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

            <div className="absolute w-20 h-20 pointer-events-auto top-[36%] left-[70%] lg:top-[23%] lg:left-[75%]">
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

            <div className="absolute w-20 h-20 pointer-events-auto top-[10%] left-[36%] lg:top-[12%] lg:left-[30%]">
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
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white z-100"
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
            <div className="absolute w-20 h-20 pointer-events-auto top-[35%] left-[50%] lg:top-[53%] lg:left-[65%]">
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

            <div className="absolute w-20 h-20 pointer-events-auto top-[57%] left-[64%] lg:top-[51%] lg:left-[50%]">
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

            <div className="absolute w-20 h-20 pointer-events-auto top-[74%] left-[50%]">
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
            <div className="absolute w-20 h-20 pointer-events-auto top-[90%] left-[60%] lg:top-[80%] lg:left-[75%]">
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
                            showItem("the unknown");
                          }}
                        ></span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute w-20 h-20 pointer-events-auto top-[80%] left-[25%] lg:top-[77%] lg:left-[20%]">
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
        <h3 className="font-800 cursor-default uppercase text-2xl sm:text-4xl uppercase font-black text-white">
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
          <div className="modal-content rounded-none border-0">
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
}

export default UtopiaPage;
