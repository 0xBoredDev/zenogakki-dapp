import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundSrc from "../../images/staking.png";
import backgroundl from "../../images/staking_l.png";
import backgroundr from "../../images/staking_r.png";
import { useStatus } from "../../contexts/statusContext";
import {
  connectWallet,
  getCurrentWalletConnected,
  checkApproval,
  setApproval,
  getNoStakedNFT,
  stakeNFT,
  getTokenBalance,
  getTokenStacked,
  getEarningOnStacked,
  unStakeNFT,
  claimReward,
  getClaimableStatus,
} from "../../utils/staking/interact";
import gsap from "gsap";

const toastStyle = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const StakingPage = () => {
  useEffect(() => {
    gsap.from("#bgl", { duration: 1, x: -600, y: 200 });
    gsap.from("#bgr", { duration: 1, x: 600, y: 200 });
  }, []);

  const { status, setStatus } = useStatus();

  const [walletAddress, setWalletAddress] = useState("");

  const [stakeBtn, setStakeBtn] = useState(true);
  const [loadingStake, setLoadingStake] = useState(false);
  const [stakeIDs, setStakeIDs] = useState("");

  const [unStakeBtn, setUnStakeBtn] = useState(true);
  const [loadingUnStake, setLoadingUnStake] = useState(false);
  const [unStakeIDs, setUnStakeIDs] = useState("");

  const [isApproved, setIsApproved] = useState(false);
  const [approveBtn, setApproveBtn] = useState(false);

  const [noStaked, setNoStaked] = useState(0);
  const [noUnclaimed, setNoUnClaimed] = useState(0);
  const [tokenBal, setTokenBal] = useState(0);
  const [tokenIdsStacked, setTokenIdsStacked] = useState([]);

  const [claimingReward, setClaimingReward] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

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

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
    // toast.success(walletResponse.status, toastStyle);
  };

  useEffect(() => {
    currentData();
  }, [walletAddress]);

  useEffect(() => {
    const fetchData = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setWalletAddress(address);
    };
    fetchData();
    addWalletListener();
  }, []);

  const currentData = async () => {
    setLoadingPage(true);

    if (walletAddress != "") {
      const response = await checkApproval(walletAddress);
      console.log("if approved", response);
      setIsApproved(response);

      const totalStacked = await getNoStakedNFT();
      setNoStaked(parseInt(totalStacked));
      console.log("total stacked: ", totalStacked);

      const tokensIdsStacked = await getTokenStacked();
      setTokenIdsStacked(tokensIdsStacked);
      console.log("total ids stacked: ", tokensIdsStacked);

      if (tokensIdsStacked.length > 0) {
        const earning = await getEarningOnStacked(tokensIdsStacked);
        console.log("earnings:", earning);
        setNoUnClaimed(parseFloat(earning).toFixed(5));
      } else {
        setNoUnClaimed(0);
      }

      const tokenBalance = await getTokenBalance();
      setTokenBal(parseFloat(tokenBalance).toFixed(5));

      toast.success(
        "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38),
        toastStyle
      );
    }

    setLoadingPage(false);
  };

  const handleStakeIDs = (e) => {
    const { name, value } = e.target;
    setStakeIDs(value);
    var regNumber = /^(\d{1,5},)*\d{1,5}$/;
    setStakeBtn(!regNumber.test(value));
  };

  const handleUnStakeIDs = (e) => {
    const { name, value } = e.target;
    setUnStakeIDs(value);
    var regNumber = /^(\d{1,5},)*\d{1,5}$/;
    setUnStakeBtn(!regNumber.test(value));
  };

  const approveNft = async () => {
    setApproveBtn(true);
    console.log("approved: ", walletAddress);
    const { status, success } = await setApproval(walletAddress);
    if (success) toast.success(status, toastStyle);
    if (!success) toast.error(status, toastStyle);
    setIsApproved(success);
    setApproveBtn(false);
  };

  const claimRewards = async () => {
    console.log("calim rewards");
    setClaimingReward(true);
    const { status, success } = await claimReward(
      walletAddress,
      tokenIdsStacked
    );
    if (success) {
      await currentData();
      toast.success(status, toastStyle);
    } else {
      toast.error(status, toastStyle);
    }
    setClaimingReward(false);
  };

  const stakeNft = async () => {
    let array = stakeIDs.replace(/, +/g, ",").split(",").map(Number);
    console.log("staking", array);
    setLoadingStake(true);
    const { status, success } = await stakeNFT(walletAddress, array);
    if (success) {
      await currentData();
      toast.success(status, toastStyle);
    } else {
      toast.error(status, toastStyle);
    }
    setLoadingStake(false);
  };

  const unStakeNft = async () => {
    let array = unStakeIDs.replace(/, +/g, ",").split(",").map(Number);
    console.log("unstaking", array);
    setLoadingUnStake(true);
    const { status, success } = await unStakeNFT(walletAddress, array);
    if (success) {
      await currentData();
      toast.success(status, toastStyle);
    } else {
      toast.error(status, toastStyle);
    }
    setLoadingUnStake(false);
  };

  return (
    <main id="main">
      <div className="relative lg:block h-screen w-full overflow-hidden">
        <div
          className="overflow-hidden bg-black utopia-ratio min-h-screen min-w-[100vw] absolute transform -translate-x-1/2 -translate-y-1/2"
          id="mouse-parallax-container"
          style={{
            overflow: "hidden",
            position: "relative",
            top: "50%",
            left: "50%",
          }}
        >
          <div style={{ willChange: "transform" }}>
            {/* <img height="100%" className="absolute" src={backgroundSrc} /> */}
            <img
              id="bgr"
              height="100%"
              className="absolute"
              src={backgroundr}
            />
            <img
              id="bgl"
              height="100%"
              className="absolute"
              src={backgroundl}
            />
          </div>
        </div>
        <div className="absolute inset-0  w-auto h-4 flex flex-row transition-all delay-1000 duration-700 opacity-100">
          <div className="container mx-auto">
            {walletAddress != "" ? (
              <>
                {loadingPage ? (
                  <div
                    className="flex items-center justify-center space-x-2"
                    style={{ marginTop: "200px" }}
                  >
                    <svg
                      role="status"
                      className="inline mr-3 w-12 h-12 text-indigo-500 animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ) : (
                  <div>
                    {!isApproved ? (
                      <div className="w-full items-center flex justify-center items-center py-12 px-6 mt-10">
                        <div className="border-purple-900 max-w-xl h-64 flex flex-col justify-between dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                          <div className="text-center">
                            <h4 className="text-white font-bold mb-3">
                              INFORMATION
                            </h4>
                            <p className="text-white text-m">
                              To start staking your NFT, you need to allow the
                              staking system access to your NFT.
                            </p>
                          </div>
                          <div className="items-center flex justify-center items-center">
                            {approveBtn ? (
                              <div className="text-center">
                                <svg
                                  role="status"
                                  className="inline mr-3 w-8 h-8 text-indigo-500 animate-spin"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <button
                                // className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                className="hover:text-purple-500 hover:border-purple-500 cursor-pointer px-4 py-2 my-2 font-extrabold text-purple-300 border border-purple-300 rounded-md"
                                onClick={approveNft}
                              >
                                Approval For All
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="max-w-full pt-8 sm:mx-auto sm:px-6 lg:px-8 mt-10">
                          <div className="sm:flex sm:space-x-4">
                            <div className="inline-block align-bottom dark:bg-gray-800/[.6] rounded-lg text-left overflow-hidden drop-shadow-lg transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                              <div className="sm:flex sm:items-start justify-center">
                                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                  <h3 className="text-sm leading-6 font-medium text-white">
                                    Your Balance
                                  </h3>
                                  <p className="text-3xl font-bold text-white">
                                    {tokenBal}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="inline-block align-bottom dark:bg-gray-800/[.6] rounded-lg text-left overflow-hidden drop-shadow-lg transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                              <div className="sm:flex sm:items-start justify-center">
                                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                  <h3 className="text-sm leading-6 font-medium text-white">
                                    Rewards (unclaimed)
                                  </h3>
                                  <p className="text-3xl font-bold text-white">
                                    {noUnclaimed}
                                  </p>
                                  {tokenIdsStacked.length > 0 && (
                                    <>
                                      {claimingReward ? (
                                        <svg
                                          role="status"
                                          className="mt-5 inline mr-3 w-6 h-6 text-indigo-500 animate-spin"
                                          viewBox="0 0 100 101"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                          />
                                          <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                          />
                                        </svg>
                                      ) : (
                                        <button
                                          className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                          onClick={claimRewards}
                                        >
                                          Claim
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="inline-block align-bottom dark:bg-gray-800/[.6] rounded-lg text-left overflow-hidden drop-shadow-lg transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                              <div className="sm:flex sm:items-start justify-center">
                                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                  <h3 className="text-sm leading-6 font-medium text-white">
                                    Total Staked
                                  </h3>
                                  <p className="text-3xl font-bold text-white">
                                    {noStaked}
                                  </p>{" "}
                                  <span className="text-sm text-white">
                                    Token IDs: {tokenIdsStacked.toString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full items-center justify-center items-center sm:px-6 lg:px-8">
                          <div className="sm:flex sm:space-x-4">
                            <div className="flex-1 dark:bg-gray-800/[.6] rounded-lg text-left overflow-hidden drop-shadow-lg transform transition-all p-6 mb-4">
                              <div className="">
                                <h1 className="text-2xl font-bold text-white mb-1">
                                  Stake
                                </h1>
                                <span className="text-sm text-gray-300">
                                  Each staked NFT yields 10 $ORB per minute.
                                </span>

                                <div className="flex flex-col justify-items-start mt-10">
                                  <h4 className="font-semibold text-white mb-1">
                                    Token IDs
                                  </h4>
                                  <div className="md:w-full w-full">
                                    <input
                                      className="bg-indigo-900 text-white appearance-none border-2 border-indigo-500 rounded w-full py-2 px-4 leading-tight"
                                      type="text"
                                      placeholder="e.g 1,30,7,455,6"
                                      value={stakeIDs || ""}
                                      onChange={handleStakeIDs}
                                    />
                                    <p className="text-gray-500 text-xs italic">
                                      Token ids should be seperated with
                                      comma(,)
                                    </p>
                                  </div>

                                  {loadingStake ? (
                                    <button
                                      className="mt-5 md:w-full w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                      type="button"
                                      disabled
                                    >
                                      <div className="text-center">
                                        <svg
                                          role="status"
                                          className="inline mr-3 w-4 h-4 text-white animate-spin"
                                          viewBox="0 0 100 101"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                          />
                                          <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                          />
                                        </svg>
                                      </div>
                                    </button>
                                  ) : (
                                    <button
                                      className="hover:text-purple-500 hover:border-purple-500 cursor-pointer px-4 py-2 mt-5 font-extrabold text-purple-300 border border-purple-300 rounded-md drop-shadow-lg"
                                      type="button"
                                      onClick={stakeNft}
                                      disabled={stakeBtn}
                                    >
                                      Stake
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {noStaked <= 0 && (
                              <div className="flex-1 dark:bg-gray-800/[.6] rounded-lg text-left overflow-hidden drop-shadow-lg transform transition-all p-6 mb-4">
                                <div className="">
                                  <h1 className="text-2xl font-semibold text-white mb-1">
                                    Unstake
                                  </h1>
                                  <span className="text-sm text-gray-300">
                                    Unstake you NFT and get it back in your
                                    wallet.
                                  </span>

                                  <div className="flex flex-col justify-items-start mt-10">
                                    <h4 className="font-semibold text-white mb-1">
                                      Token IDs
                                    </h4>
                                    <div className="md:w-full w-full">
                                      <input
                                        className="bg-indigo-900 text-white appearance-none border-2 border-indigo-500 rounded w-full py-2 px-4 leading-tight"
                                        type="text"
                                        placeholder="e.g 1,30,7,455,6"
                                        value={unStakeIDs || ""}
                                        onChange={handleUnStakeIDs}
                                      />
                                      <p className="text-gray-500 text-xs italic">
                                        Token ids should be seperated with
                                        comma(,)
                                      </p>
                                    </div>

                                    {loadingUnStake ? (
                                      <button
                                        className="hover:text-purple-500 hover:border-purple-500 cursor-pointer px-4 py-2 mt-5 font-extrabold text-purple-300 border border-purple-300 rounded-md"
                                        type="button"
                                        disabled
                                      >
                                        <div className="text-center">
                                          <svg
                                            role="status"
                                            className="inline mr-3 w-4 h-4 text-white animate-spin"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                              fill="#E5E7EB"
                                            />
                                            <path
                                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                              fill="currentColor"
                                            />
                                          </svg>
                                        </div>
                                      </button>
                                    ) : (
                                      <button
                                        className="hover:text-purple-500 hover:border-purple-500 cursor-pointer px-4 py-2 mt-5 font-extrabold text-purple-300 border border-purple-300 rounded-md"
                                        type="button"
                                        onClick={unStakeNft}
                                        disabled={unStakeBtn}
                                      >
                                        Unstake
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full items-center flex justify-center items-center py-12 px-6 mt-10">
                <div>
                  <div className="max-w-xl h-64 flex flex-col dark:bg-gray-800 rounded-lg drop-shadow-lg mb-6 py-5 px-4">
                    <div className="text-center">
                      <h2 className="text-white font-bold">
                        Stake Your NFT's To Earn $ORB
                      </h2>
                    </div>
                    <button
                      className="hover:text-purple-500 hover:border-purple-500 cursor-pointer px-4 py-2 mt-5 font-extrabold text-purple-300 border border-purple-300 rounded-md"
                      type="button"
                      onClick={connectWalletPressed}
                    >
                      CONNECT WALLECT
                    </button>
                  </div>
                </div>
              </div>

              // <div className="flex items-center justify-center">
              //   <section className="text-center mx-6 mt-10 w-2/3">
              //     <h1 className="mt-20 text-black mb-1 text-2xl lg:text-3xl">
              //       Stake Your NFT's To Earn $ORB
              //     </h1>
              //     <div>
              //       <button
              //         className="mt-5 hover:text-purple-500 hover:border-purple-500 cursor-pointer px-4 py-2 font-extrabold text-purple-300 border border-purple-300 rounded-md"
              //         type="button"
              //         onClick={connectWalletPressed}
              //       >
              //         CONNECT WALLECT
              //       </button>
              //     </div>
              //   </section>
              // </div>
            )}
          </div>
        </div>
        <ToastContainer />
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
