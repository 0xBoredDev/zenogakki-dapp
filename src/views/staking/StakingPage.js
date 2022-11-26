import React, { useState, useEffect } from "react";
import { useStatus } from "../../contexts/statusContext";

const StakingPage = () => {
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

  useEffect(() => {});

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
    setIsApproved(true);
    setApproveBtn(false);
  };

  const claimRewards = async () => {
    console.log("calim rewards");
    setClaimingReward(true);
    setClaimingReward(false);
  };

  const stakeNft = async () => {
    let array = stakeIDs.replace(/, +/g, ",").split(",").map(Number);
    console.log("staking", array);
    setTokenIdsStacked(array);
    setNoStaked(array.length);
    setLoadingStake(true);
    setLoadingStake(false);
  };

  const unStakeNft = async () => {
    let array = unStakeIDs.replace(/, +/g, ",").split(",").map(Number);
    console.log("unstaking", array);
    setLoadingUnStake(true);
    setLoadingUnStake(false);
  };

  return (
    <main
      id="main"
      className="h-screen py-16"
      style={{ height: "100%", marginBottom: "0px" }}
    >
      <div className="md:container md:mx-auto">
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <h1 className="text-3xl font-semibold text-white mb-8">
            Staking Dashboard
          </h1>

          <div
            className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>
              Every 2 minutes you&apos;ll yield 0.001 NCR for every NFT NAME you
              have staked.
            </p>
          </div>

          {!isApproved ? (
            <div className="w-full items-center flex justify-center items-center py-12 px-6">
              <div>
                <div className="max-w-xl h-64 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                  <div className="text-center">
                    <h4 className="text-gray-800 dark:text-gray font-bold mb-3">
                      INFORMATION
                    </h4>
                    <p className="text-gray-800 dark:text-gray text-sm">
                      To start staking your NFT NAME, you need to allow the
                      staking system access to your NFT NAME. Use the approve
                      button below.
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
                        className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={approveNft}
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex sm:space-x-4">
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                      <div className="sm:flex sm:items-start">
                        <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                          <h3 className="text-sm leading-6 font-medium text-gray-400">
                            Your Balance
                          </h3>
                          <p className="text-3xl font-bold text-black">
                            {tokenBal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                      <div className="sm:flex sm:items-start">
                        <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                          <h3 className="text-sm leading-6 font-medium text-gray-400">
                            Rewards (unclaimed)
                          </h3>
                          <p className="text-3xl font-bold text-black">
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
                  </div>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                      <div className="sm:flex sm:items-start">
                        <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                          <h3 className="text-sm leading-6 font-medium text-gray-400">
                            Total Staked
                          </h3>
                          <p className="text-3xl font-bold text-black">
                            {noStaked}
                          </p>{" "}
                          <span className="text-sm text-gray-900">
                            Token IDs: {tokenIdsStacked.toString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-4 border-indigo-500 rounded px-8 pt-6 pb-8 mb-4 mt-10">
                <h1 className="text-2xl font-semibold text-white mb-1">
                  Stake now
                </h1>
                <span className="text-sm text-gray-300">
                  Each staked NFT yields 0.001 NCR per day.
                </span>

                <div className="flex flex-col justify-items-start mt-10">
                  <h4 className="font-semibold text-white mb-1">NFT IDs</h4>
                  <div className="md:w-full w-full">
                    <input
                      className="bg-indigo-900 text-white appearance-none border-2 border-indigo-500 rounded w-full py-2 px-4 leading-tight"
                      type="text"
                      placeholder="1,30,7,455,6"
                      value={stakeIDs || ""}
                      onChange={handleStakeIDs}
                    />
                    <p className="text-blue-500 text-xs italic">
                      Token ids should be seperated with comma(,)
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
                      className="mt-5 md:w-full w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={stakeNft}
                      disabled={stakeBtn}
                    >
                      Stake
                    </button>
                  )}
                </div>
              </div>

              {noStaked > 0 && (
                <div className="border-t-4 border-indigo-500 rounded px-8 pt-6 pb-8 mb-4 mt-10">
                  <h1 className="text-2xl font-semibold text-white mb-1">
                    Unstake
                  </h1>
                  <span className="text-sm text-gray-300">
                    Unstake you NFT and get it back in your wallet.
                  </span>

                  <div className="flex flex-col justify-items-start mt-10">
                    <h4 className="font-semibold text-white mb-1">NFT IDs</h4>
                    <div className="md:w-full w-full">
                      <input
                        className="bg-indigo-900 text-white appearance-none border-2 border-indigo-500 rounded w-full py-2 px-4 leading-tight"
                        type="text"
                        placeholder="1,30,7,455,6"
                        value={unStakeIDs || ""}
                        onChange={handleUnStakeIDs}
                      />
                      <p className="text-blue-500 text-xs italic">
                        Token ids should be seperated with comma(,)
                      </p>
                    </div>

                    {loadingUnStake ? (
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
                        className="mt-5 md:w-full w-full bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={unStakeNft}
                        disabled={unStakeBtn}
                      >
                        Unstake
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Status */}

        {status && (
          <div
            style={{ position: "fixed", bottom: 60, right: 10 }}
            className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-indigo-400 rounded-md "
          >
            {status}
          </div>
        )}
      </div>
    </main>
  );
};

export default StakingPage;

{
  /* <div id="staking" className="parallax container-fluid">
  <div className="row">
    <div
      className="col-12"
      style={{
        marginLeft: "40px",
        marginRight: "20px",
        marginBottom: "40px",
        marginTop: "40px",
      }}
    >
      <h1 className="font-semibold text-white">Staking Dashboard</h1>
    </div>
  </div>
  <div className="row">
    <div className="col-8 offset-2">
      <div
        className="d-flex items-center bg-blue-500 text-white text-sm font-bold"
        role="alert"
        style={{ padding: 0 }}
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width={20}
          height={20}
          fill="white"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p className="text-white">
          Every 2 minutes you&apos;ll yield 0.001 NCR for every NFT you have
          staked.
        </p>
      </div>
    </div>
  </div>
  <div className="row">
    {!isApproved ? (
      <div className="col-8 offset-2">
        <div>
          <div className="max-w-xl h-64 flex flex-col justify-between dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4">
            <div className="text-center">
              <h4 className="text-white dark:text-gray font-bold mb-3">
                INFORMATION
              </h4>
              <p className="text-white dark:text-gray text-sm">
                To start staking your NFT NAME, you need to allow the staking
                system access to your NFT NAME. Use the approve button below.
              </p>
            </div>
            <div className="d-flex justify-content-center">
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
                  className="btn text-white border border-gray-400"
                  onClick={approveNft}
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
          <div className="sm:flex sm:space-x-4">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">
                      Your Balance
                    </h3>
                    <p className="text-3xl font-bold text-black">{tokenBal}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">
                      Rewards (unclaimed)
                    </h3>
                    <p className="text-3xl font-bold text-black">
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
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">
                      Total Staked
                    </h3>
                    <p className="text-3xl font-bold text-black">{noStaked}</p>{" "}
                    <span className="text-sm text-gray-900">
                      Token IDs: {tokenIdsStacked.toString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-indigo-500 rounded px-8 pt-6 pb-8 mb-4 mt-10">
          <h1 className="text-2xl font-semibold text-white mb-1">Stake now</h1>
          <span className="text-sm text-gray-300">
            Each staked NFT yields 0.001 NCR per day.
          </span>

          <div className="flex flex-col justify-items-start mt-10">
            <h4 className="font-semibold text-white mb-1">NFT IDs</h4>
            <div className="md:w-full w-full">
              <input
                className="bg-indigo-900 text-white appearance-none border-2 border-indigo-500 rounded w-full py-2 px-4 leading-tight"
                type="text"
                placeholder="1,30,7,455,6"
                value={stakeIDs || ""}
                onChange={handleStakeIDs}
              />
              <p className="text-blue-500 text-xs italic">
                Token ids should be seperated with comma(,)
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
                className="mt-5 md:w-full w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={stakeNft}
                disabled={stakeBtn}
              >
                Stake
              </button>
            )}
          </div>
        </div>

        {noStaked > 0 && (
          <div className="border-t-4 border-indigo-500 rounded px-8 pt-6 pb-8 mb-4 mt-10">
            <h1 className="text-2xl font-semibold text-white mb-1">Unstake</h1>
            <span className="text-sm text-gray-300">
              Unstake you NFT and get it back in your wallet.
            </span>

            <div className="flex flex-col justify-items-start mt-10">
              <h4 className="font-semibold text-white mb-1">NFT IDs</h4>
              <div className="md:w-full w-full">
                <input
                  className="bg-indigo-900 text-white appearance-none border-2 border-indigo-500 rounded w-full py-2 px-4 leading-tight"
                  type="text"
                  placeholder="1,30,7,455,6"
                  value={unStakeIDs || ""}
                  onChange={handleUnStakeIDs}
                />
                <p className="text-blue-500 text-xs italic">
                  Token ids should be seperated with comma(,)
                </p>
              </div>

              {loadingUnStake ? (
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
                  className="mt-5 md:w-full w-full bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={unStakeNft}
                  disabled={unStakeBtn}
                >
                  Unstake
                </button>
              )}
            </div>
          </div>
        )}
      </>
    )}
  </div>
 */
}
