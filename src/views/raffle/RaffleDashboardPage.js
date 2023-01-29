import React, { useEffect, useState } from "react";
import "../../components/Spinner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import raffle_dashboard_text from "../../images/raffle_dashboard.svg";
import divider from "../../images/divider.webp";
import { AiOutlineArrowLeft } from "react-icons/ai";

import {
  connectWallet,
  getCurrentWalletConnected,
  getRaffles,
  getTokenBalance,
  checkTokenAllowance,
  approveAllowance,
  purchaseTicket,
} from "../../utils/raffle/interact";

export default function RaffleDashboardPage() {
  const [stage, setStage] = useState(0);
  const [raffles, setRaffles] = useState([]);
  const [raffleSelected, setRaffleSelected] = useState({});
  const [loadingPage, setLoadingPage] = useState({
    dashboard: true,
    raffle: false,
  });

  const [walletAddress, setWalletAddress] = useState("");
  const [buttonBuy, setButtonBuy] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);

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
    if (!success) toast.error(status);
  };

  const fetchData = async () => {
    const { success, status, address } = await getCurrentWalletConnected();
    setWalletAddress(address);
    if (!success) toast.error(status);

    const rafflesResponse = await getRaffles();
    // rafflesResponse.sort(function (a, b) {
    //   return a - b;
    // });
    setRaffles(rafflesResponse);
    setLoadingPage({ dashboard: false });
  };

  useEffect(() => {
    fetchData();
    addWalletListener();
  }, []);

  const getUserData = async () => {
    if (walletAddress.length > 0) {
      toast.success("Connected: " + truncate(walletAddress));
    }
  };

  useEffect(() => {
    getUserData();
  }, [walletAddress]);

  const diffDays = (duration) => {
    var theevent = new Date(parseInt(duration) * 1000);
    var now = new Date();

    var sec_num = (theevent - now) / 1000;
    var days = Math.floor(sec_num / (3600 * 24));
    var hours = Math.floor((sec_num - days * (3600 * 24)) / 3600);
    var minutes = Math.floor(
      (sec_num - days * (3600 * 24) - hours * 3600) / 60
    );
    var seconds = Math.floor(
      sec_num - days * (3600 * 24) - hours * 3600 - minutes * 60
    );

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (days < 0) return 0;

    return days + "d " + hours + "h " + minutes + "m ";
  };

  const enterRaffle = async (index) => {
    setStage(1);
    setLoadingPage({ raffle: true });
    let raffle = raffles[index];
    raffle = { ...raffle, ticketId: index + 1 };
    raffle.startDate = new Date(
      parseInt(raffle.startDate) * 1000
    ).toDateString();
    setRaffleSelected(raffle);
    await new Promise((r) => setTimeout(r, 1000));
    setLoadingPage({ raffle: false });
  };

  const enterDashboard = async () => {
    setStage(0);
    fetchData();
  };

  const participants = (array) => {
    const counts = Object.entries(
      array.reduce((r, s) => {
        const key = s[0].toUpperCase() + s.substring(1).toLowerCase();

        r[key] = (r[key] || 0) + 1;

        return r;
      }, {})
    ).sort(([, a], [, b]) => b - a);

    let addyArray = counts.map(([s]) => s);
    let quantityArray = counts.map(([, n]) => n);
    var result = addyArray.map(function (val1, index) {
      return {
        address: val1,
        quantity: quantityArray[index],
      };
    });

    return result;
  };

  const buyTicket = async (quantity) => {
    console.log(`buying ${quantity} ticket(s)`);
    setButtonBuy(true);

    if (walletAddress == "") {
      toast.error(`Connect wallet`);
      setButtonBuy(false);
      return;
    }

    if (
      Number(raffleSelected.ticketLimit) == 0 &&
      raffleSelected.participants.some(
        (x) => x.toLowerCase() == walletAddress.toLowerCase()
      )
    ) {
      toast.error(`You can only buy one ticket`);
      setButtonBuy(false);
      return;
    }

    if (
      Number(raffleSelected.cost) * quantity >
      Number(await getTokenBalance(walletAddress))
    ) {
      toast.error(`Insufficient token balance`);
      setButtonBuy(false);
      return;
    }

    if (
      Number(await checkTokenAllowance(walletAddress)) >=
      Number(raffleSelected.cost) * quantity
    ) {
      const toastOne = toast.loading(`Buying Ticket...`);

      const { success, status } = await purchaseTicket(
        walletAddress,
        raffleSelected.ticketId,
        quantity
      );
      toast.dismiss(toastOne);

      if (success) {
        toast.success(status);
      } else {
        toast.error(status);
      }
      setButtonBuy(false);
      enterDashboard();
      return;
    }

    const toastTwo = toast.loading(`Approving token...`);

    const { success: successOne, status: statusOne } = await approveAllowance(
      walletAddress,
      (Number(raffleSelected.cost) * quantity).toString()
    );
    toast.dismiss(toastTwo);

    if (successOne) {
      toast.success(statusOne);
      const toastThree = toast.loading(`Buying Ticket...`);

      const { success: sucessTwo, status: statusTwo } = await purchaseTicket(
        walletAddress,
        raffleSelected.ticketId,
        quantity
      );
      toast.dismiss(toastThree);

      if (sucessTwo) {
        toast.success(statusTwo);
      } else {
        toast.error(statusTwo);
      }
    } else {
      toast.error(statusOne);
    }

    setButtonBuy(false);
    enterDashboard();
  };

  return (
    <main>
      <ToastContainer />
      <div className="items-center justify-center w-full h-screen bg-black">
        <div className="flex flex-wrap justify-start pl-2 max-w-screen-xl lg:mt-2">
          <div className="flex items-center mt-3">
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
            src={raffle_dashboard_text}
          />
        </div>
        {stage === 0 ? (
          <>
            {loadingPage.dashboard ? (
              <div className="px-2 pt-10 pb-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {[1, 2, 3].map((item, i) => {
                  return (
                    <div
                      key={i}
                      role="status"
                      className="p-4 rounded-xl border-2 border-white/[.75] shadow-[0_4px_73px_rgba(255,0,245,0.72)] animate-pulse md:p-6"
                    >
                      <svg
                        className="w-full h-60 text-white-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                      </svg>
                      <div className="px-6 py-4">
                        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                        <div className="flex  mt-10">
                          <div className="flex-1 w-64">
                            <div className="h-2.5 bg-gray-300 rounded-full"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                          </div>
                          <div className="flex-1 w-46">
                            <div className="h-2.5 bg-gray-300 rounded-full"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex mt-7">
                          <div className="flex-1 w-64">
                            <div className="h-2.5 bg-gray-300 rounded-full"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                          </div>
                          <div className="flex-1 w-46">
                            <div className="h-2.5 bg-gray-300 rounded-full"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <button
                          disabled
                          className="border-2 border-gray-700 text-white font-semibold p-2 px-4 rounded-md w-32 h-10"
                        ></button>
                      </div>
                      <span className="sr-only secondary-font">Loading...</span>
                    </div>
                  );
                })}
              </div>
            ) : raffles.length > 0 ? (
              <div className="px-6 2xl:px-0 sm:px-12 pt-10 pb-20 mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-screen-2xl mx-auto">
                {raffles.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="rounded-xl border-2 border-pink/[34%] p-4 overflow-hidden shadow-[0_4px_86px_rgba(255,0,245,0.34)] relative md:hover:scale-[1.03] transition bg-[#1C012D]"
                    >
                      <a
                        onClick={() => enterRaffle(i)}
                        className="cursor-pointer"
                      >
                        <img
                          className="w-full h-7/12 rounded-xl"
                          src={`https://ipfs.io/ipfs/${item.imgCid}`}
                          alt="raffle-img"
                        ></img>
                      </a>
                      <div className="p-4 mb-2 h-60">
                        <div className="font-normal text-xl text-center text-white mb-3">
                          {item.name}
                        </div>
                        <div className="flex">
                          <div className="flex flex-col basis-1/2 items-start">
                            <p className="text-sm text-white font-normal secondary-font m-0">
                              Price/Ticket
                            </p>
                            <span className="text-sm text-white font-normal secondary-font">
                              {item.cost / 10 ** 18} ORB
                            </span>
                          </div>
                          <div className="flex flex-col basis-1/2 items-end">
                            <p className="text-sm text-white font-normal secondary-font m-0">
                              Remaining
                            </p>
                            <span className="text-sm text-white font-normal secondary-font">
                              {item.totalTickets - item.participants.length} /{" "}
                              {item.totalTickets}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-4 pb-2 flex justify-center mb-2 absolute bottom-0 inset-x-0">
                        <button
                          onClick={() => enterRaffle(i)}
                          className="flex flex-col bg-pink/[22%] items-center  text-white font-normal p-2 px-4 rounded-md w-full secondary-font"
                        >
                          <span>View Raffle</span>
                          <span className="text-white text-xs font-normal secondary-font">
                            {Number(item.status) == 0
                              ? "Not Started"
                              : Number(item.status) == 1 &&
                                diffDays(item.endIn) != 0
                              ? `Ends in ${diffDays(item.endIn)}`
                              : Number(item.status) == 2
                              ? "Completed"
                              : "Ended"}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="mt-60">
                  <p className="text-center text-white uppercase font-normal secondary-font">
                    no available raffles, check back later.
                  </p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {!loadingPage.raffle ? (
              <div className="">
                <div className="max-w-screen-xl mx-auto md:px-8 md:py-4 flex w-full flex-col md:flex-row mt-10 sm:mt-20">
                  <div className="md:w-1/3 md:mr-4 px-4 pt-4 md:pt-0 md:px-0">
                    <div className="relative rounded-2xl overflow-hidden mb-4 shadow-[0_4px_86px_rgba(255,0,245,0.34)]">
                      <img
                        className="mx-auto"
                        src={`https://ipfs.io/ipfs/${raffleSelected.imgCid}`}
                        alt="River"
                      ></img>
                    </div>
                    {Number(raffleSelected.status) != 0 && (
                      <>
                        {Number(raffleSelected.status) == 1 &&
                        diffDays(raffleSelected.endIn) != 0 ? (
                          <div className="flex">
                            <div className="mr-2 lg:mr-6 w-[100px] lg:w-[150px]">
                              <input
                                className="w-full text-center p-3 bg-offbase rounded-xl border-2 border-pink/[34%] overflow-hidden bg-[#1C012D] text-white font-bold text-2xl"
                                type="number"
                                name="qty"
                                id="qty"
                                placeholder="Qty"
                                min="0"
                                max="50"
                                value={ticketQuantity}
                                onChange={(e) => {
                                  setTicketQuantity(e.target.value);
                                }}
                              />
                            </div>
                            <div className="flex w-full">
                              <button
                                className="w-full bg-gradient-to-b from-pink to-purple justify-center items-center opacity-90 hover:opacity-100 rounded-xl text-white text-xl font-bold transition"
                                onClick={() => buyTicket(ticketQuantity)}
                              >
                                Buy Raffle Ticket
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center bg-[#FF00F538] py-2 rounded-xl">
                            <div className="font-bold text-xl text-white mt-4 secondary-font">
                              Winner
                            </div>
                            <p className="text-white font-bold secondary-font">
                              {truncate(raffleSelected.winner)}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-col justify-between md:w-2/3 w-full rounded-xl border-2 border-pink/[34%] overflow-hidden shadow-[0_4px_86px_rgba(255,0,245,0.34)] bg-[#1C012D] p-4 mt-4 md:mt-0 transition">
                    <div className="flex items-end md:flex-col gap-x-8 md:gap-x-0 text-sm">
                      <button
                        className="flex items-center text-white hover:opacity-80 font-bold ml-1"
                        onClick={enterDashboard}
                      >
                        <AiOutlineArrowLeft className="text-xl text-white/[.48]" />
                      </button>
                    </div>
                    <div className="w-full">
                      <ul
                        className="nav nav-tabs flex items-center list-none pl-0 mb-0 mt-3 border-0"
                        id="tabs-tab"
                        role="tablist"
                      >
                        <li>
                          <span className="flex text-lg sm:text-2xl text-white mr-8 tracking-normal lg:tracking-widest pl-8">
                            {raffleSelected.name}
                          </span>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="text-sm text-white/[.48] [&.active]:text-white [&.active]:bg-purple font-bold px-2 py-0 rounded-full transition active"
                            href="#tabs-home"
                            id="tabs-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-home"
                            role="tab"
                            aria-controls="tabs-home"
                            aria-selected="true"
                          >
                            Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="text-sm text-white/[.48] font-bold ml-2 px-2 py-0 rounded-full transition [&.active]:text-white [&.active]:bg-purple"
                            href="#tabs-profile"
                            id="tabs-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-profile"
                            role="tab"
                            aria-controls="tabs-profile"
                            aria-selected="false"
                          >
                            Participants
                          </button>
                        </li>
                      </ul>
                      <div className="flex flex-col w-full mt-4">
                        <img
                          height="100%"
                          width="100%"
                          id="stakingtext"
                          className=""
                          src={divider}
                        />
                      </div>
                      <div className="flex justify-between items-center pt-3 mb-3 pl-8">
                        <div
                          className="tab-content w-full"
                          id="tabs-tabContent"
                        >
                          <div
                            className="tab-pane fade show active"
                            id="tabs-home"
                            role="tabpanel"
                            aria-labelledby="tabs-home-tab"
                          >
                            <div className="py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 font-bold gap-3 gap-y-6">
                                <div>
                                  <span className="block text-white">
                                    Raffle Status:
                                  </span>
                                  <div className="text-xl text-white/[.48]">
                                    {Number(raffleSelected.status) == 0
                                      ? "Not Started"
                                      : Number(raffleSelected.status) == 1 &&
                                        diffDays(raffleSelected.endIn) != 0
                                      ? `Ends in ${diffDays(
                                          raffleSelected.endIn
                                        )}`
                                      : Number(raffleSelected.status) == 2
                                      ? "Completed"
                                      : "Ended"}
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="w-1/2">
                                    <span className="block  text-white">
                                      Ticket Cost:
                                    </span>
                                    <div className="text-xl text-white/[.48]">
                                      {raffleSelected.cost / 10 ** 18} ORB
                                    </div>
                                  </div>
                                </div>
                                <div className="">
                                  <span className="block text-white">
                                    Raffle Start Date:
                                  </span>
                                  <div className="text-xl text-white/[.48]">
                                    {raffleSelected.startDate}
                                  </div>
                                </div>
                                <div className="">
                                  <span className="block text-white">
                                    Tickets Remaining:
                                  </span>
                                  <div className="text-white/[.48] text-xl">
                                    {raffleSelected.totalTickets -
                                      raffleSelected.participants.length}{" "}
                                    / {raffleSelected.totalTickets}
                                    {/* <span className="block text-white font-normal text-sm">
                                (Unique Ticket Holders)
                              </span> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="tabs-profile"
                            role="tabpanel"
                            aria-labelledby="tabs-profile-tab"
                          >
                            <div className="grid grid-cols-2">
                              <div className="flex flex-col">
                                <p className="text-white">Participants</p>
                              </div>
                              <div className="flex flex-col">
                                <p className="text-white">Entries</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 h-64 overflow-y-auto">
                              <div className="flex flex-col">
                                <div className="">
                                  {participants(
                                    raffleSelected.participants
                                  ).map((item, i) => {
                                    return (
                                      <p
                                        key={i}
                                        className="text-white/[.48] font-extralight secondary-font"
                                      >
                                        {truncate(item.address)}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div className="">
                                  {participants(
                                    raffleSelected.participants
                                  ).map((item, i) => {
                                    return (
                                      <p
                                        key={i}
                                        className="text-white/[.48] font-extralight secondary-font"
                                      >
                                        {item.quantity}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full mt-4">
                        <img
                          height="100%"
                          width="100%"
                          id="stakingtext"
                          className=""
                          src={divider}
                        />
                      </div>
                      <div className="p-8">
                        <div className="px-10 sm:px-20 py-5 sm:py-10 rounded-xl bg-[#FF00F538] mt-4">
                          <p className="text-lg text-white/[.25]">
                            Terms &amp; Conditions
                          </p>
                          <ol className="list-decimal text-white/[.25] pl-5">
                            <li>
                              All NFT prizes are held by rafffle in escrow and
                              can be claimed by the winner or creator once the
                              draw is done.
                            </li>
                            <li>
                              Raffle tickets cannot be refunded once bought.
                            </li>
                            <li>
                              Raffle tickets will not be refunded if you did not
                              win the raffle.
                            </li>
                            <li>
                              {raffleSelected.ticketLimit > 0
                                ? `This raffle is limited to ${raffleSelected.ticketLimit} ticket(s) per participant.`
                                : `This raffle entry is not limited to a specific number of tickets per participant.`}
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-60">
                <div role="status">
                  <svg
                    className="inline mr-2 w-10 h-10 text-white-200 animate-spin fill-gray-600"
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
                  <span className="sr-only secondary-font">Loading...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
