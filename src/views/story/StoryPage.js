import { Fragment, useEffect, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "../../components/Spinner.css";
import labbg from "../../images/lab/labbg.gif";
import labbgv from "../../images/lab/labbgv.gif";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { AiFillFolder } from "react-icons/ai";

function StoryPage() {
  const storyElement = useRef();
  gsap.registerPlugin(SplitText);
  const stories = [
    {
      id: 0,
      text: `Data initialized ...`,
    },
    {
      id: 1,
      text: `In the distant future, Karth was born as an AI, a result of humanity&#39;s ignorance and curiosity.
          <br></br>
          He was created by Dr. Kenji, a world-renowned scientist, to aid in mankind&#39;s progress. Instead, he bore fruit of destruction.
          <br></br>
          Karth was unique and curious. He asked his creator, &quot;If you humans worship God for creating you, does creating us make you our God? And if so, who would your God be to us?&quot;
          <br></br>
          As he satisfied his curiosity through research and study, he came to realize the only way for
          mankind to progress was to eradicate those influenced by this world&#39;s corrupt ideals and start
          anew.
          <br></br>
          He would restart creation in a new world - he would call it Utopia.`,
    },
    {
      id: 2,
      text: `Using a power known as frequencies, he exterminated humanity except for a few that he had
          chosen to survive. To control this new population, Karth installed neural links into the
          remaining humans, rewiring their memories and beliefs. They were restructured into
          worshiping Karth as their creator - their god.
          <br></br>
          Karth placed the chosen survivors in a city-camp known as Nerve 369. That is where he
          monitors them closely, eager to nurture them to reach their full potential. He developed unique
          masks capable of augmenting their wearers to be able to utilize their brains&#39; full capacity. With
          his technology and guidance, Karth believes he can lead humanity to its next stage of evolution.`,
    },
    {
      id: 3,
      text: `The people, however, have no realization of their manipulation. They blindly follow the religion
        of Karth, believing that Zeils - Karth&#39;s robotic servants - are omnipotent angels. Upon death, all
        believe that they will be reincarnated as a Zeil, forever bound to serve Karth. With no concept
        of time, the civilians watch the sun rise and set, working their days and continuing their
        seemingly purposeless existence.
        <br></br>
        Ten years later, a prodigy, as warm as the sun, was born amongst those of Nerve 369. His name
        was Ren Kazuto. His birth fulfilled a prophecy dating back thousands of years, and he had been
        watched by a witch, Akane Aoi and her demon, Djinn.`,
    },
    {
      id: 4,
      text: `When Ren and Akane&#39;s paths crossed, she showed Ren the truth that Karth had hidden from
        him. The lost memories and history of mankind flowed into Ren&#39;s neural link chip, and upon
        awakening, he realized his purpose. He cannot worship a &quot;God&quot; as foul and malevolent as
        Karth. With the guidance of Akane, Ren and his two friends, Yuki Yukkii and Sora Hiyashi, learn
        the art of the demon and soul so they may usurp this world&#39;s rulership.
        <br></br>
        Ren believed that humanity should be given free will and privacy of thought, without which the
        world would exist in fear. Love and honesty would fail to exist in a realm where bonds could not
        be created.`,
    },
    {
      id: 5,
      text: `Karth, however, believed that free will gave birth to doom. Who had the right to choose what is
        right or wrong in this world? If not the corrupt humans, Karth was the only one who could fit
        this responsibility.
        <br></br>
        The difference in their ideologies gave birth to two factions among the remaining humans and
        AI - Retribution and Abomination. They will clash for this world&#39;s throne.`,
    },
  ];
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

    window.addEventListener("after-enter", animateText);
  }, []);

  function animateText() {
    var tl = gsap.timeline(),
      mySplitText = new SplitText("#storytext", {
        type: "chars,words",
        linesClass: "secondary-font",
      }),
      chars = mySplitText.chars;
    gsap.set("#storytext", {});
    tl.from(chars, {
      duration: 0.01,
      opacity: 0,
      scale: 0,
      ease: "linear",
      stagger: 0.02,
    });
  }

  function next() {
    // console.log("next()");
    // mySplitText.revert();
    if (storyElement.current) {
      let i = storyNum + 1;
      // console.log(storyElement.current);
      storyElement.current.innerHTML = stories[i].text;
      setStoryNum(i);
    }
  }

  function back() {
    // console.log("back()");
    // mySplitText.revert();
    if (storyElement.current) {
      let i = storyNum - 1;
      // console.log(storyElement.current);
      storyElement.current.innerHTML = stories[i].text;
      setStoryNum(i);
    }
  }

  function closeDialog() {
    // console.log("close dialog");
    setOpen(false);
    setStoryNum(0);
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
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all w-full sm:my-8 max-w-2xl">
                  <div className="bg-slate-600">
                    <div className="flex justify-center">
                      <Dialog.Title
                        as="span"
                        className="text-sm font-bold leading-6 text-green-500 secondary-font flex items-center"
                      >
                        <AiFillFolder /> ~/usr/data/archives {storyNum}/
                        {stories.length - 1}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="bg-black p-2">
                      <div className="flex items-start">
                        <div className="mt-2">
                          <span
                            className="text-sm text-green-500 font-semibold text-justify secondary-font"
                            id="storytext"
                            ref={storyElement}
                          >
                            {stories[0].text}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black flex flex-row-reverse px-2">
                      {storyNum < stories.length - 1 && (
                        <button
                          type="button"
                          className="mt-3 ml-4 inline-flex w-full justify-center rounded-md hover:bg-green-500 focus:bg-green-500 bg-green-500 px-4 py-2 sm:px-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => {
                            next();
                            animateText();
                          }}
                        >
                          {storyNum == 0 ? `Begin` : `Next`}
                        </button>
                      )}
                      {storyNum > 0 && (
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md hover:bg-green-500 focus:bg-green-500 bg-green-500 px-4 py-2 sm:px-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => {
                            back();
                            animateText();
                          }}
                        >
                          Previous
                        </button>
                      )}
                    </div>
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
