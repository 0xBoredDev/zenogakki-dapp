import React, { useEffect, useState } from "react";
import "../../components/Spinner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";
// import Header from "../../components/Header";
// import Menu from "../../components/Menu";
import backgroundSrc from "../../images/lab.png";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";

var utopiaModal;

function StoryPage() {
  gsap.registerPlugin(SplitText);
  const stories = [
    "This is story 1 and it is a very very thrilling story about something. Just wait for number 2, it will be even better I promise. Are you ready for the next story? I hope you are sure. Click next to find out what happens. This is filling in the the empty spacing so I know how much text can fit inside of this old broken down computer screen and to make sure you can read it.",
    "This is story 2 and it is even more thrilling than story 1. Just wait for number 3, it will be even better I promise. Are you ready for the next story? I hope you are sure. Click next to find out what happens. This is filling in the the empty spacing so I know how much text can fit inside of this old broken down computer screen and to make sure you can read it.",
    "This is story 3 and it is even more thrilling than story 2. Just wait for number 4, it will be even better I promise. Are you ready for the next story? I hope you are sure. Click next to find out what happens. This is filling in the the empty spacing so I know how much text can fit inside of this old broken down computer screen and to make sure you can read it.",
  ];
  const [computerText, setComputerText] = useState(stories[0]);
  const [storyNum, setStoryNum] = useState(0);

  // function animateText() {

  // }
  // console.log(chars);
  useEffect(() => {
    var tl = gsap.timeline(),
      mySplitText = new SplitText("#computertext", { type: "words,chars" }),
      chars = mySplitText.chars;
    gsap.set("#computertext", {});
    tl.from(chars, {
      duration: 0.01,
      opacity: 0,
      scale: 0,
      ease: "linear",
      stagger: 0.07,
    });
    // utopiaModal = new Modal("#utopiaModal", {
    //   backdrop: true,
    // });
  });

  function next() {
    console.log("next()");
    setStoryNum(storyNum + 1);
    setComputerText(stories[storyNum + 1]);
    // mySplitText.revert();
  }

  function back() {
    console.log("back()");
    // mySplitText.revert();
    var ctext = document.getElementById("computertext");
    console.log(stories[storyNum + 1]);
    ctext.innerHTML = stories[storyNum + 1];
  }

  return (
    // <>
    //   <div className="parallax">
    //     <img
    //       src={backgroundSrc}
    //       id="story"
    //       className="parallax-layer home-bg"
    //       height="100%"
    //       ></img>
    //     <ToastContainer />
    //   </div>
    //       </>
    <>
      {/* <Menu /> */}
      {/* <Header /> */}

      <main>
        <div className="relative lg:block h-screen w-full overflow-hidden">
          <div
            className="overflow-hidden bg-black story-ratio min-h-screen min-w-[100vw] absolute transform -translate-x-1/2 -translate-y-1/2"
            id="mouse-parallax-container"
            style={{
              overflow: "hidden",
              position: "relative",
              top: "50%",
              left: "50%",
            }}
          >
            <div style={{ willChange: "transform" }}>
              <img height="100%" className="absolute" src={backgroundSrc} />
            </div>
          </div>
          <div className="overflow-hidden pointer-events-none story-ratio min-h-screen min-w-[100vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full relative">
              <div
                className="absolute pointer-events-auto"
                style={{ top: "35.2%", left: "13%" }}
              >
                <div className="relative">
                  <div>
                    <button
                      className="outline-none"
                      id="storytext"
                      type="button"
                      aria-expanded="false"
                    >
                      <div className="lab-perspective absolute">
                        <div id="computertext">
                          {computerText}
                          <span className="blinking-cursor">|</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="absolute pointer-events-auto"
                style={{ top: "61.5%", left: "35%" }}
              >
                <div className="relative">
                  <div>
                    <button
                      className="outline-none"
                      id="storytext"
                      type="button"
                      aria-expanded="false"
                    >
                      <div className="lab-perspective absolute">
                        <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                          <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                          <span
                            className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                            onClick={(e) => {
                              next();
                            }}
                          ></span>
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="absolute pointer-events-auto"
                style={{ top: "61.5%", left: "31.5%" }}
              >
                <div className="relative">
                  <div>
                    <button
                      className="outline-none"
                      id="storytext"
                      type="button"
                      aria-expanded="false"
                    >
                      <div className="lab-perspective absolute">
                        <span className="flex h-full w-full transition-all duration-1000 hover:opacity-100">
                          <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
                          <span
                            className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"
                            onClick={(e) => {
                              back();
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
        <div className="absolute bottom-14 left-10 w-auto h-4 flex flex-row transition-all delay-1000 duration-700 opacity-100">
          <h3 className="font-800 cursor-default uppercase text-4xl uppercase font-black text-white">
            <span className="lg:ml-2 primary-font drop-shadow-lg">Story</span>
          </h3>
        </div>
      </main>
    </>

    /* <div className="container-fluid" style={{ padding: 0 }}>
        <div className="computer">
          <img src={computer} id="utopia" />
          <div className="item bottom" style={{ top: "28%", left: "50.5%" }}>
    
            <p className="computer-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet consectetur adipiscing elit pellentesque habitant morbi
              tristique. Velit euismod in pellentesque massa placerat duis
              ultricies lacus. Convallis aenean et tortor at risus viverra
              adipiscing at. Vel orci porta non pulvinar neque. Sollicitudin
              tempor id eu nisl nunc mi. Vel pretium lectus quam id. Phasellus
              vestibulum lorem sed risus ultricies. Mauris pharetra et ultrices
              neque. Dui accumsan sit amet nulla facilisi morbi tempus iaculis.
              Justo nec ultrices dui sapien eget mi. Sed arcu non odio euismod
              lacinia. Arcu dictum varius duis at consectetur lorem donec.
              Faucibus pulvinar elementum integer enim neque volutpat ac.
              Vestibulum lorem sed risus ultricies. Massa eget egestas purus
              viverra accumsan in nisl nisi. Augue lacus viverra vitae congue
              eu.
            </p>
          </div>
          <div
            className="item top"
            style={{ top: "76%", left: "55%" }}
            onClick={(e) => {}}
          >
            <div className="icon"></div>
            <div className="tt">
              <h3>Next</h3>
            </div>
          </div>
          <div
            className="item top"
            style={{ top: "76%", left: "45%" }}
            onClick={(e) => {}}
          >
            <div className="icon"></div>
            <div className="tt">
              <h3>Back</h3>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div> */
  );
}

export default StoryPage;
