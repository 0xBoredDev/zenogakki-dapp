import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundSrc from "../../images/staking.png";
import backgroundl from "../../images/staking_l.png";
import backgroundr from "../../images/staking_r.png";
import staking_text from "../../images/staking.svg";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { connectWallet } from "../../utils/staking/interact";

const StakingPage = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    addWalletListener();
    gsap.to("#stakingbgl", { duration: 1.5, x: 0, y: 0 });
    gsap.to("#stakingbgr", { duration: 1.5, x: 0, y: 0 });
  }, []);

  function toDashboard() {
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
          <img
            height="100%"
            id="stakingbg"
            className="absolute"
            src={backgroundSrc}
          />
          <div className="absolute flex justify-center items-center w-full h-full p-10 sm:p-2 transition">
            <div className="flex flex-col rounded-2xl bg-[#383838]/[.59] items-center min-w-max min-h-max h-64 lg:h-72 2xl:h-96 w-2/6 py-2 px-8 top-[50%] mb-32 sm:mb-20">
              <div className="flex w-full h-full justify-center px-8 py-4">
                <img
                  height="100%"
                  width="100%"
                  id="stakingtext"
                  className="absolute h-18 w-64 items-start"
                  src={staking_text}
                />
                {walletAddress.length > 0 ? (
                  <button
                    disabled
                    className="self-end h-auto bg-gradient-to-r from-[#FF00F5]/[.75] to-[#6B61F3] border-2 border-t-white border-x-white/[.5] border-b-transparent font-semibold text-lg sm:text-xl lg:text-2xl rounded-2xl py-2 px-4 sm:px-4 text-white z-50"
                  >
                    {truncate(walletAddress)}
                  </button>
                ) : (
                  <button
                    onClick={connectWalletPressed}
                    className="self-end h-auto bg-gradient-to-r from-[#FF00F5]/[.75] to-[#6B61F3] border-2 border-t-white border-x-white/[.5] border-b-transparent font-semibold text-lg sm:text-xl lg:text-2xl rounded-2xl py-2 px-4 sm:px-4 text-white z-50"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
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
    </main>
  );
};

export default StakingPage;
