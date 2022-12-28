import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundSrc from "../../images/staking.png";
import backgroundl from "../../images/staking_l.png";
import backgroundr from "../../images/staking_r.png";
import stakingAudio from "../../sounds/staking.mp3";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { connectWallet } from "../../utils/staking/interact";

const StakingPage = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const stakingSound = new Audio(stakingAudio);

  useEffect(() => {
    addWalletListener();
  }, []);

  function toDashboard() {
    gsap.to("#stakingbgl", { duration: 1.5, x: 0, y: 0 });
    gsap.to("#stakingbgr", { duration: 1.5, x: 0, y: 0 });
    stakingSound.play();
    setTimeout(() => {
      navigate("/staking/dashboard");
    }, 2000);
  }

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      });
    }
  };

  const truncate = (address) => {
    return (
      String(address).substring(0, 6) + "..." + String(address).substring(38)
    );
  };

  const connectWalletPressed = async () => {
    const { address, status, success } = await connectWallet();
    setWalletAddress(address);
    if (!success) {
      toast.error(status);
    } else {
      toDashboard();
    }
  };

  return (
    <main id="main">
      <ToastContainer />
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
            <img
              height="100%"
              id="stakingbg"
              className="absolute"
              src={backgroundSrc}
            />
            <div className="flex flex-row justify-center h-full">
              {walletAddress.length > 0 ? (
                <button
                  disabled
                  className="relative mt-32 border-solid border-2 border-gray-700 font-semibold rounded-lg p-2 px-4 text-gray"
                >
                  {truncate(walletAddress)}
                </button>
              ) : (
                <button
                  onClick={connectWalletPressed}
                  className="relative mt-32 border-solid border-2 border-gray-700 font-semibold text-lg sm:text-xl lg:text-3xl rounded-lg p-1 px-2 sm:p-2 sm:px-4 text-gray"
                >
                  Connect Wallet
                </button>
              )}
            </div>
            <img
              id="stakingbgr"
              height="100%"
              className="absolute"
              src={backgroundr}
            />
            <img
              id="stakingbgl"
              height="100%"
              className="absolute"
              src={backgroundl}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 sm:bottom-10 left-2 w-auto h-4 flex flex-row transition-all delay-1000 duration-700 opacity-100">
        <h3 className="font-800 cursor-default uppercase text-3xl sm:text-4xl uppercase font-black text-white">
          <span className="lg:ml-2 primary-font drop-shadow-lg bg-white/[.3] rounded py-0 px-1">
            Staking
          </span>
        </h3>
      </div>
    </main>
  );
};

export default StakingPage;
