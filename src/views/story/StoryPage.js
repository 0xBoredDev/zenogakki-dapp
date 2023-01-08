import { Fragment, useEffect, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "../../components/Spinner.css";
import labbg from "../../images/lab/labbg.gif";
import labbgv from "../../images/lab/labbgv.gif";
import logo from "../../images/logo.png";
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
      text: `               IN THE DISTANT FUTURE, KARTH WAS AN AI BORN AS A
                            RESULT OF HUMANITY'S IGNORANCE AND CURIOSITY.
                            <br></br>
                            HE WAS CREATED BY A WORLD-RENOWNED SCIENTIST. DR.
                            KENJ, TO AID IN MANKIND'S PROGRESS, BUT INSTEAD, HE
                            BORE FRUIT OF DESTRUCTION.
                            <br></br>
                            KARTH WAS UNIQUE AND CURIOUS. HE ASKED HIS CREATOR,
                            IF YOU HUMANS WORSHIP GOD FOR CREATING YOU, DOES
                            CREATING US MAKE YOU OUR God?
                            <br></br>
                            AND IF SO, WHO WOULD YOUR GOD BE TO US?
                            <br></br>
                            AS HE SATED HIS CURIOSITY THROUGH RESEARCH AND
                            STUDY, HE CAME TO REALIZE THE ONLY WAY FOR MANKIND
                            TO PROGRESS WAS TO ERADICATE THOSE INFLUENCED BY
                            THIS WORLD'S CORRUPT IDEALS AND START ANEW.
                            <br></br>
                            HE WOULD RESTART CREATION IN A NEW WORLD
                            <br></br>
                            HE WOULD CALL.
                            <br></br>
                            UTOPIA.`,
    },
    {
      id: 2,
      text: `USING A POWER, KNOWN AS FREQUENCIES, HE EXTERMINATED HUMANITY EXCEPT FOR A FEW THAT HE'D CHOSEN TO SURVIVE. TO CONTROL THIS NEW POPULATION, HE INSTALLED NEURAL -LINKS INTO THE REMAINING HUMANS AND REWIRED THEIR MEMORIES AND BELIEFS TO MAKE THEM BELIEVE KARTH WAS THEIR CREATOR, THEIR GOD. 
      <br></br>KARTH PLACED THE CHOSEN SURVIVORS IN A CITY-CAMP. KNOWN AS NERVE 369, AND MONITORS THEM CLOSELY. EAGER TO NURTURE THE HUMANS TO REACH THEIR FULL POTENTIAL. HE DEVELOPED UNIQUE MASKS, CAPABLE OF AUGMENTING ITS WEARERS TO BE ABLE TO UTILIZE THEIR BRAIN'S FULL CAPACITY. WITH HIS TECHNOLOGY AND GUIDANCE, KARTH BELIEVES HE CAN LEAD HUMANITY TO ITS NEXT STAGE OF EVOLUTION.`,
    },
    {
      id: 3,
      text: `THE PEOPLE, HOWEVER, HAVE NO REALIZATION OF THEIR MANIPULATION. THEY BLINDLY FOLLOW THE RELIGION OF KARTH, BELIEVING THAT ZEILS. KARTH'5 ROBOTIC SERVANTS, ARE OMNIPOTENT ANGELS. UPON DEATH. ALL BELIEVE THAT THEY WILL BE REINCARNATED AS A ZEIL. FOREVER BOUND TO SERVE KARTH. WITH NO CONCEPT OF TIME, THE CIVILIANS WATCH THE SUN RISE AND SET, WORKING THEIR DAYS AND CONTINUING THEIR SEEMINGLY PURPOSELESS EXISTENCE.
      <br></br>
      TEN YEARS LATER, A PRODIGY, AS WARM AS THE SUN, WAS BORN AMONGST THOSE OF NERVE 369. HIS NAME WAS REN KAZUTO. HIS BIRTH FULFILLED. A PROPHECY DATING THOUSANDS OF YEARS AGO AND HE HAS BEEN WATCHED BY A WITCH, AKANE AOl, AND HER DEMON DJINN.`,
    },
    {
      id: 4,
      text: `WHEN REN AND AKANE'S PATH5 CROSS, SHE SHOWS REN THE TRUTH THAT KARTH HAD HIDDEN FROM HIM. THE LOST MEMORIES AND HISTORY OF MANKIND FLOWED INTO REN'S NEURAL LINK CHIP AND UPON AWAKENING, HE REALIZED HIS PURPOSE. HE CANNOT WORSHIP A "GOD" AS FOUL AND MALEVOLENT AS KARTH. WITH THE GUIDANCE OF AKANE. REN AND HIS TWO FRIENDS, YUKI YUKKII AND SORA HIYASHI, LEARN THE ART OF THE DEMON AND SOUL, SO THEY MAY USURP THIS WORLD'5 RULERSHIP.
      <br></br>
      REN BELIEVED THAT HUMANITY SHOULD BE GIVEN FREE WILL AND PRIVACY OF THOUGHT, WITHOUT WHICH THE WORLD WOULD EXIST IN FEAR. LOVE AND HONESTY WOULD FAIL TO EXIST IN A REALM WHERE BONDS COULD NOT BE CREATED.`,
    },
    {
      id: 5,
      text: `KARTH, HOWEVER, BELIEVED THAT FREE WILL GAVE BIRTH TO DOOM. WHO HAD THE RIGHT TO CHOOSE WHAT IS RIGHT OR WRONG IN THIS WORLD?
      <br></br>
      IF NOT THE CORRUPT HUMANS, KARTH WAS THE ONLY ONE WHO COULD FIT THIS RESPONSIBILITY.
      <br></br>
      THE DIFFERENCE IN THEIR IDEOLOGIES GAVE
      BIRTH TO TWO FACTIONS AMONG THE REMAINING HUMANS AND AI, RETRIBUTION AND ABOMINATION.
      THEY WILL CLASH FOR THIS WORLD'S THRONE.`,
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
    console.log("next()");
    // mySplitText.revert();
    if (storyElement.current) {
      let i = storyNum + 1;
      console.log(storyElement.current);
      storyElement.current.innerHTML = stories[i].text;
      setStoryNum(i);
    }
  }

  function back() {
    console.log("back()");
    // mySplitText.revert();
    if (storyElement.current) {
      let i = storyNum - 1;
      console.log(storyElement.current);
      storyElement.current.innerHTML = stories[storyNum].text;
      setStoryNum(i);
    }
  }

  function closeDialog() {
    console.log("close dialog");
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
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
                    <div className="bg-black flex flex-row-reverse">
                      {storyNum < stories.length && (
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md hover:bg-green-500 focus:bg-green-500 bg-green-500 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
                          className="mt-3 inline-flex w-full justify-center rounded-md hover:bg-green-500 focus:bg-green-500 bg-green-500 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
