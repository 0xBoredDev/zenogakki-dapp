import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "../../components/Spinner.css";
import labbg from "../../images/lab/labbg.gif";
import labbgv from "../../images/lab/labbgv.gif";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
var storyModal;

function StoryPage() {
  gsap.registerPlugin(SplitText);
  const stories = [
    "This is story 1 and it is a very very thrilling story about something. Just wait for number 2, it will be even better I promise. Are you ready for the next story? I hope you are sure. Click next to find out what happens. This is filling in the the empty spacing so I know how much text can fit inside of this old broken down computer screen and to make sure you can read it.",
    "This is story 2 and it is even more thrilling than story 1. Just wait for number 3, it will be even better I promise. Are you ready for the next story? I hope you are sure. Click next to find out what happens. This is filling in the the empty spacing so I know how much text can fit inside of this old broken down computer screen and to make sure you can read it.",
    "This is story 3 and it is even more thrilling than story 2. Just wait for number 4, it will be even better I promise. Are you ready for the next story? I hope you are sure. Click next to find out what happens. This is filling in the the empty spacing so I know how much text can fit inside of this old broken down computer screen and to make sure you can read it.",
  ];
  const [computerText, setComputerText] = useState(stories[0]);
  const [storyNum, setStoryNum] = useState(0);
  const [open, setOpen] = useState(false);
  const [smallView, setSmallView] = useState(window.innerWidth <= 1023.98);
  function updateSize() {
    setSmallView(window.innerWidth <= 1023.98);
  }

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      updateSize();
    });
  }, []);

  // function animateText() {

  // }
  // console.log(chars);
  useEffect(() => {
    // var tl = gsap.timeline(),
    //   mySplitText = new SplitText("#computertext", { type: "words,chars" }),
    //   chars = mySplitText.chars;
    // gsap.set("#computertext", {});
    // tl.from(chars, {
    //   duration: 0.01,
    //   opacity: 0,
    //   scale: 0,
    //   ease: "linear",
    //   stagger: 0.07,
    // });
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
    <main>
      <div className="relative lg:block h-screen w-full overflow-hidden">
        <div
          className="bg-black aspect-[1/1] lg:aspect-[5000/4000] top-[50%] left-[50%]  min-h-screen min-w-[100vw] absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ willChange: "transform" }}>
            <img
              height="100%"
              className="absolute"
              src={smallView ? labbgv : labbg}
            />
          </div>
          {/* <video
            width="100%"
            height="100%"
            className="absolute"
            autoPlay={true}
            muted={true}
            preload="auto"
          >
            <source src={text1}></source>
          </video> */}
        </div>
        <div className="overflow-hidden pointer-events-none aspect-[1/1] lg:aspect-[5000/4000] min-h-screen min-w-[100vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full relative">
            <div
              className="absolute w-[48vw] sm:w-[40vw] lg:w-[16vw] h-[16vh] pointer-events-auto top-[46%] left-[25%] lg:top-[38%] lg:left-[22%] cursor-pointer -rotate-6"
              onClick={(e) => {
                setOpen(!open);
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 sm:bottom-10 left-2 w-auto h-4 flex flex-row transition-all delay-1000 duration-700 opacity-100">
        <h3 className="font-800 cursor-default uppercase text-2xl sm:text-4xl uppercase font-black text-white scale-y-125 sm:scale-y-100">
          <span className="lg:ml-2 primary-font drop-shadow-lg bg-white/[.3] rounded py-0 px-1">
            Story
          </span>
        </h3>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Archived Story 1
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 text-justify">
                            {stories[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Next
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </main>
  );
}

export default StoryPage;
