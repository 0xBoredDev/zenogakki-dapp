import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";
import closeImg from "../../images/close.png";
import utopia from "../../images/utopia/utopia.webp";
import utopia_sm from "../../images/utopia/utopia_vertical.webp";
//earth
import earth from "../../images/utopia/earth/earth.svg";
import earth1 from "../../images/utopia/earth/earth1.webp";
import earth2 from "../../images/utopia/earth/earth2.webp";
import earth3 from "../../images/utopia/earth/earth3.webp";
import earthv1 from "../../images/utopia/earth/earthv1.webp";
import earthv2 from "../../images/utopia/earth/earthv2.webp";
import earthv3 from "../../images/utopia/earth/earthv3.webp";
//fire
import fire from "../../images/utopia/fire/fire.svg";
import fire1 from "../../images/utopia/fire/fire1.webp";
import fire2 from "../../images/utopia/fire/fire2.webp";
import fire3 from "../../images/utopia/fire/fire3.webp";
import firev1 from "../../images/utopia/fire/firev1.webp";
import firev2 from "../../images/utopia/fire/firev2.webp";
import firev3 from "../../images/utopia/fire/firev3.webp";
//light
import light from "../../images/utopia/light/light.svg";
import light1 from "../../images/utopia/light/light1.webp";
import light2 from "../../images/utopia/light/light2.webp";
import light3 from "../../images/utopia/light/light3.webp";
import lightv1 from "../../images/utopia/light/lightv1.webp";
import lightv2 from "../../images/utopia/light/lightv2.webp";
import lightv3 from "../../images/utopia/light/lightv3.webp";
//mecha
import mecha from "../../images/utopia/mecha/mecha.svg";
import mecha1 from "../../images/utopia/mecha/mecha1.webp";
import mecha2 from "../../images/utopia/mecha/mecha2.webp";
import mecha3 from "../../images/utopia/mecha/mecha3.webp";
import mechav1 from "../../images/utopia/mecha/mechav1.webp";
import mechav2 from "../../images/utopia/mecha/mechav2.webp";
import mechav3 from "../../images/utopia/mecha/mechav3.webp";
//lostcity
import lostcity from "../../images/utopia/lostcity/lostcity.svg";
import lostcity1 from "../../images/utopia/lostcity/lostcity1.webp";
import lostcity2 from "../../images/utopia/lostcity/lostcity2.webp";
import lostcity3 from "../../images/utopia/lostcity/lostcity3.webp";
import lostcityv1 from "../../images/utopia/lostcity/lostcityv1.webp";
import lostcityv2 from "../../images/utopia/lostcity/lostcityv2.webp";
import lostcityv3 from "../../images/utopia/lostcity/lostcityv3.webp";
//wind
import wind from "../../images/utopia/wind/wind.svg";
import wind1 from "../../images/utopia/wind/wind1.webp";
import wind2 from "../../images/utopia/wind/wind2.webp";
import wind3 from "../../images/utopia/wind/wind3.webp";
import windv1 from "../../images/utopia/wind/windv1.webp";
import windv2 from "../../images/utopia/wind/windv2.webp";
import windv3 from "../../images/utopia/wind/windv3.webp";
//water
import water from "../../images/utopia/water/water.svg";
import water1 from "../../images/utopia/water/water1.webp";
import water2 from "../../images/utopia/water/water2.webp";
import water3 from "../../images/utopia/water/water3.webp";
import waterv1 from "../../images/utopia/water/waterv1.webp";
import waterv2 from "../../images/utopia/water/waterv2.webp";
import waterv3 from "../../images/utopia/water/waterv3.webp";
//mystical
import mystical from "../../images/utopia/mystical/mystical.svg";
import mystical1 from "../../images/utopia/mystical/mystical1.webp";
import mystical2 from "../../images/utopia/mystical/mystical2.webp";
import mystical3 from "../../images/utopia/mystical/mystical3.webp";
import mysticalv1 from "../../images/utopia/mystical/mysticalv1.webp";
import mysticalv2 from "../../images/utopia/mystical/mysticalv2.webp";
import mysticalv3 from "../../images/utopia/mystical/mysticalv3.webp";
//theunknown
import theunknown from "../../images/utopia/theunknown/theunknown.svg";
import theunknown1 from "../../images/utopia/theunknown/theunknown1.webp";
import theunknownv1 from "../../images/utopia/theunknown/theunknownv1.webp";
//shadow
import shadow from "../../images/utopia/shadow/shadow.svg";
import shadow1 from "../../images/utopia/shadow/shadow1.webp";
import shadow2 from "../../images/utopia/shadow/shadow2.webp";
import shadow3 from "../../images/utopia/shadow/shadow3.webp";
import shadow4 from "../../images/utopia/shadow/shadow4.webp";
import shadowv1 from "../../images/utopia/shadow/shadowv1.webp";
import shadowv2 from "../../images/utopia/shadow/shadowv2.webp";
import shadowv3 from "../../images/utopia/shadow/shadowv3.webp";
import shadowv4 from "../../images/utopia/shadow/shadowv4.webp";

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
    // console.log("showItem()");
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
              alt="utopia"
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
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={lostcity}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("lost city");
                          }}
                        ></img>
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
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={mecha}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("mecha");
                          }}
                        ></img>
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
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={water}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("water");
                          }}
                        ></img>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute w-20 h-20 pointer-events-auto top-[36%] left-[70%] lg:top-[23%] lg:left-[77%]">
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={wind}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("wind");
                          }}
                        ></img>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute w-20 h-20 pointer-events-auto top-[10%] left-[36%] lg:top-[10%] lg:left-[30%]">
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={light}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("light");
                          }}
                        ></img>
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
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={earth}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("earth");
                          }}
                        ></img>
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
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={fire}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("fire");
                          }}
                        ></img>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute w-20 h-20 pointer-events-auto top-[73%] left-[53%]">
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={mystical}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("mystical");
                          }}
                        ></img>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute w-20 h-20 pointer-events-auto top-[88%] left-[60%] lg:top-[80%] lg:left-[75%]">
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={theunknown}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("the unknown");
                          }}
                        ></img>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute w-20 h-20 pointer-events-auto top-[77%] left-[25%] lg:top-[77%] lg:left-[20%]">
              <div className="relative">
                <div>
                  <button
                    className="outline-none"
                    id="headlessui-popover-button-82"
                    type="button"
                    aria-expanded="false"
                  >
                    <div className="w-12 h-12">
                      <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-100/70"></span>
                        <img
                          src={shadow}
                          className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-10 w-10 z-100 drop-shadow-lg bg-white/[.7]"
                          alt="utopia_icon"
                          onClick={(e) => {
                            showItem("shadow");
                          }}
                        ></img>
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
            <button type="button" data-bs-dismiss="modal" aria-label="Close">
              <img src={closeImg} className="btn-close" alt="close" />
            </button>
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
