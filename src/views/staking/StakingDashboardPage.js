import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import staking_dashboard_text from "../../images/staking_dashboard.svg";
import divider from "../../images/divider.svg";
import {
  connectWallet,
  getCurrentWalletConnected,
  getTokenBalance,
  getEarnings,
  getTokenIdsStaked,
  getTokenInformation,
  checkApproval,
  setApproval,
  stakeNFT,
  batchStakeNFT,
  unStakeNFT,
  batchUnStakeNFT,
  claimReward,
} from "../../utils/staking/interact";

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

export default function StakingDashboardPage() {
  const [stage, setStage] = useState(0);
  const [loadingPage, setLoadingPage] = useState({
    home: true,
    dashboard: false,
    nft: true,
  });
  const [walletAddress, setWalletAddress] = useState("");
  const [claimingReward, setClaimingReward] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [selectedToken, setSelectedToken] = useState([]);
  const [noStaked, setNoStaked] = useState(0);
  const [noUnstaked, setNoUnstaked] = useState(0);
  const [tokenBal, setTokenBal] = useState(0);
  const [tokenBalUnclaimed, setTokenBalUnclaimed] = useState(0);
  const [tokenIdsStacked, setTokenIdsStacked] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(false);

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
    const { success, status, address } = await connectWallet();
    setWalletAddress(address);
    if (!success) toast.error(status);
  };

  const fetchData = async () => {
    const { success, status, address } = await getCurrentWalletConnected();
    setWalletAddress(address);
    if (!success) toast.error(status);
    setLoadingPage({ ...loadingPage, home: false });
  };

  useEffect(() => {
    fetchData();
    addWalletListener();
  }, []);

  const getUserData = async () => {
    if (walletAddress.length > 0) {
      setLoadingPage({ ...loadingPage, dashboard: true });
      await getStakingInfo();
      setLoadingPage({ ...loadingPage, dashboard: false });
      await getNFTMetdata();
      setLoadingPage({ ...loadingPage, nft: false });
      toast.success("Connected: " + truncate(walletAddress));
    }
  };

  useEffect(() => {
    getUserData();
  }, [walletAddress]);

  const getNFTMetdata = async () => {
    let resultArray = await getTokenInformation(walletAddress);
    if (resultArray.length > 0) {
      setNfts(resultArray);
    } else {
      setNfts([]);
      toast.error(`You do not have any NFT to stake`);
    }
  };

  const getStakingInfo = async () => {
    setTokenBal(Number(await getTokenBalance(walletAddress)).toFixed(2));
    setTokenBalUnclaimed(Number(await getEarnings(walletAddress)).toFixed(2));
    setTokenIdsStacked(await getTokenIdsStaked(walletAddress));
  };

  const clearSelectedPressed = async () => {
    setSelectedToken([]);
    setNoStaked(0);
    setNoUnstaked(0);
  };

  const stakeBtnPressed = async () => {
    // console.log("stake all");
    setDisabledBtn(true);
    const approved = await checkApproval(walletAddress);
    // console.log("approved", approved);
    let tokensId = selectedToken.map(function (obj) {
      return Number(obj.tokenId);
    });
    // console.log("staking", tokensId);

    let proceed = false;
    if (!approved) {
      const toastOne = toast.loading(`Requesting for approval for nfts...`);
      const { success, status } = await setApproval(walletAddress);
      proceed = success;
      toast.dismiss(toastOne);
      if (success) {
        toast.success(status);
      } else {
        toast.error(status);
      }
    }

    if (approved || proceed) {
      const toastTwo = toast.loading(`Staking your nfts...`);
      const { success, status } = await (tokensId.length > 1
        ? batchStakeNFT(tokensId, walletAddress)
        : stakeNFT(Number(tokensId), walletAddress));
      toast.dismiss(toastTwo);
      if (success) {
        await clearSelectedPressed();
        await getStakingInfo();
        await getNFTMetdata();
        toast.success(status);
      } else {
        toast.error(status);
      }
    }

    setDisabledBtn(false);
  };

  const unStakeBtnPressed = async () => {
    setDisabledBtn(true);
    let tokensId = selectedToken.map(function (obj) {
      return Number(obj.tokenId);
    });
    // console.log("unstake", tokensId);
    const toastTwo = toast.loading(`Unstaking your nfts...`);
    const { success, status } = await (tokensId.length > 1
      ? batchUnStakeNFT(tokensId, walletAddress)
      : unStakeNFT(Number(tokensId), walletAddress));
    toast.dismiss(toastTwo);
    if (success) {
      await clearSelectedPressed();
      await getStakingInfo();
      await getNFTMetdata();
      toast.success(status);
    } else {
      toast.error(status);
    }
    setDisabledBtn(false);
  };

  const claimRewards = async () => {
    setClaimingReward(true);
    const toastOne = toast.loading(`Claiming rewards...`);
    const { success, status } = await claimReward(walletAddress);
    toast.dismiss(toastOne);
    if (success) {
      await getStakingInfo();
      toast.success(status);
    } else {
      toast.error(status);
    }
    setClaimingReward(false);
  };

  const aCardPressed = async (tokenId, staked) => {
    // console.log("card pressed");
    if (disabledBtn) return;
    if ((staked && noStaked > 0) || (!staked && noUnstaked > 0)) return;

    if (selectedToken.map((x) => x.tokenId).includes(tokenId)) {
      if (staked) setNoUnstaked(noUnstaked - 1);
      if (!staked) setNoStaked(noStaked - 1);
      setSelectedToken(
        selectedToken.filter((item) => Number(item.tokenId) !== Number(tokenId))
      );
    } else {
      if (staked) setNoUnstaked(noUnstaked + 1);
      if (!staked) setNoStaked(noStaked + 1);
      setSelectedToken([
        ...selectedToken,
        { tokenId: tokenId, staked: staked },
      ]);
    }
  };

  return (
    <main id="main">
      <div className="relative lg:block h-screen w-full bg-black">
        <div className="flex flex-wrap justify-start pl-2 max-w-screen-xl sm:mt-2">
          <div className="flex items-center connect mt-3 pt-[2px]">
            <button
              disabled={walletAddress.length > 0}
              onClick={connectWalletPressed}
              className="bg-gradient-to-b from-pink to-purple rounded-3xl py-1 px-3 shadow-[0_4px_73px_rgba(255,0,245,0.72)] text-white ml-1.5 text-sm secondary-font"
            >
              {walletAddress.length > 0
                ? truncate(walletAddress)
                : `Connect Wallet`}
            </button>
          </div>
        </div>
        <div className="flex w-full h-42 justify-center mt-4">
          <img
            height="100%"
            width="100%"
            id="stakingtext"
            className="absolute h-18 w-64 sm:w-96 items-start"
            src={staking_dashboard_text}
          />
        </div>
        <div className="inset-0 w-auto h-full flex flex-row transition-all delay-1000 duration-700">
          <div className="mx-auto">
            {!walletAddress.length > 0 ? (
              <>
                {loadingPage.home ? (
                  <div className="flex items-center justify-center space-x-2 mt-40">
                    <div role="status">
                      <svg
                        className="inline mr-2 w-10 h-10 text-black dark:text-white secondary-font animate-spin fill-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center ">
                    <section className="text-center mx-6 lg:w-2/3">
                      <p className="mt-20 text-pink secondary-font font-bold">
                        CONNECT YOUR WALLET TO GET STATRED
                      </p>
                      <button
                        onClick={connectWalletPressed}
                        className="mt-2 bg-gradient-to-r from-[#FF00F5]/[.75] to-[#6B61F3] border-2 border-t-white border-x-white/[.5] border-b-transparent font-semibold rounded-lg p-2 px-4 text-white secondary-font"
                      >
                        Connect Wallet
                      </button>
                    </section>
                  </div>
                )}
              </>
            ) : (
              <>
                {!loadingPage.dashboard ? (
                  <>
                    <div className="container max-w-full pt-8 sm:mx-auto sm:px-6 lg:px-8 mt-10">
                      <div className="sm:flex sm:space-x-4 xl:space-x-8">
                        <div className="inline-block align-bottom overflow-hidden rounded-xl border-2 border-white/[.75] shadow-[0_4px_73px_rgba(255,0,245,0.72)] transform transition-all mb-4 w-full sm:w-1/3 sm:my-8 bg-purple">
                          <div className="sm:flex sm:items-start justify-center p-2">
                            <div className="text-center">
                              <h3 className="text-sm leading-6 font-medium text-white secondary-font">
                                ORB Balance
                              </h3>
                              <p className="text-3xl font-semibold text-white secondary-font">
                                {tokenBal}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="inline-block align-bottom overflow-hidden rounded-xl border-2 border-white/[.75] shadow-[0_4px_73px_rgba(255,0,245,0.72)] transform transition-all mb-4 w-full sm:w-1/3 sm:my-8 bg-purple">
                          <div className="sm:flex sm:items-start justify-center p-2">
                            <div className="text-center">
                              <h3 className="text-sm leading-6 font-medium text-white secondary-font">
                                ORB (unclaimed)
                              </h3>
                              <p className="text-3xl font-semibold text-white secondary-font">
                                {tokenBalUnclaimed}
                              </p>
                              {tokenIdsStacked.length > 0 && (
                                <>
                                  {claimingReward ? (
                                    <svg
                                      role="status"
                                      className="mt-5 inline mr-3 w-6 h-6 animate-spin fill-gray-600"
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
                                      className="border-2 border-white/[.75] bg-gradient-to-b from-pink to-purple text-white secondary-font font-semibold p-2 px-4 rounded-md mt-1"
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
                        <div className="inline-block align-bottom overflow-hidden bg-purple rounded-xl border-2 border-white/[.75] shadow-[0_4px_73px_rgba(255,0,245,0.72)] transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                          <div className="sm:flex sm:items-start justify-center p-2">
                            <div className="text-center">
                              <h3 className="text-sm leading-6 font-medium text-white secondary-font">
                                Total Staked
                              </h3>
                              <p className="text-3xl font-semibold text-white secondary-font">
                                {tokenIdsStacked.length}
                              </p>{" "}
                              {tokenIdsStacked.length > 0 && (
                                <span className="text-sm text-white secondary-font">
                                  Token IDs:{" "}
                                  {tokenIdsStacked
                                    .map((item) => item.tokenId)
                                    .toString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex flex-col mt-14 w-full">
                        <span className="text-center text-white text-2xl mb-2 secondary-font">
                          NFT's
                        </span>

                        <img
                          height="100%"
                          width="100%"
                          id="stakingtext"
                          className=""
                          src={divider}
                        />
                      </div>
                    </div>
                    <div className="container rounded p-8 mb-4">
                      <div className="float-right space-x-1.5">
                        {(noStaked > 0 || noUnstaked > 0) && (
                          <button
                            onClick={clearSelectedPressed}
                            disabled={disabledBtn}
                            className="text-white bg-purple secondary-font font-thin p-2 px-4 rounded-md mb-2"
                          >
                            Clear
                          </button>
                        )}
                        {noUnstaked > 0 && (
                          <button
                            onClick={unStakeBtnPressed}
                            disabled={disabledBtn}
                            className="text-white bg-purple secondary-font font-thin p-2 px-4 rounded-md mb-2"
                          >
                            {disabledBtn
                              ? `Processing...`
                              : `Unstake ${noUnstaked}`}
                          </button>
                        )}
                        {noStaked > 0 && (
                          <button
                            onClick={stakeBtnPressed}
                            disabled={disabledBtn}
                            className="text-white bg-purple secondary-font font-thin p-2 px-4 rounded-md mb-2"
                          >
                            {disabledBtn
                              ? `Processing...`
                              : `Stake ${noStaked}`}
                          </button>
                        )}
                      </div>
                      {!loadingPage.nft ? (
                        <div className="mt-7 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-5">
                          {nfts.map((item, i) => {
                            return (
                              <div
                                key={i}
                                onClick={() =>
                                  aCardPressed(item.tokenId, item.staked)
                                }
                                className={`${
                                  (item.staked && noStaked > 0) ||
                                  (!item.staked && noUnstaked > 0)
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                } ${
                                  selectedToken.some(
                                    (data) => data.tokenId == item.tokenId
                                  )
                                    ? "ring-2 ring-pink"
                                    : ""
                                } rounded-3xl overflow-hidden shadow-[0_4px_73px_rgba(255,0,245,0.72)] bg-purple`}
                              >
                                <img
                                  className="mx-auto"
                                  src={item.img}
                                  alt="pfp"
                                ></img>
                                <div className="flex flex-col">
                                  <div className="text-center p-2">
                                    <span className="text-white font-medium text-md secondary-font">
                                      #{item.tokenId}
                                    </span>
                                    {item.staked && (
                                      <div className="mt-2">
                                        <span className="inline-flex text-center p-2 text-sm font-semibold bg-green bg-green-500 rounded-full">
                                          <svg
                                            aria-hidden="true"
                                            className="w-3.5 h-3.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"
                                            ></path>
                                          </svg>
                                        </span>
                                        <p className="text-white font-thin mt-2 mb-0">
                                          Staked
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center mt-40">
                          <div role="status">
                            <svg
                              className="inline mr-2 w-10 h-10 text-white-200 animate-spin dark:text-white-600 fill-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center mt-60">
                    <div role="status">
                      <svg
                        className="inline mr-2 w-10 h-10 text-black dark:text-white secondary-font animate-spin fill-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </main>
  );
}
