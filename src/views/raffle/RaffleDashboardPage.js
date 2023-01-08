import React, { useEffect, useState, useContext } from "react";
import { themeContext } from "../../App";
import "../../components/Spinner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "../../components/Header";
// import Menu from "../../components/Menu";

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
  const theme = useContext(themeContext);
  console.log(theme);
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
    setRaffleSelected(raffle);
    await new Promise((r) => setTimeout(r, 1000));
    setLoadingPage({ raffle: false });
  };

  const enterDashboard = async () => {
    setStage(0);
    setTicketQuantity(1);
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
    console.log("buy ticket", quantity);

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
    <main className="bg-purple/[.2] dark:bg-black">
      <ToastContainer />
      <div className="items-center justify-center w-full h-screen">
        <div className="flex flex-wrap justify-start pl-2 max-w-screen-xl">
          <div className="flex items-center lg:order-2 connect mt-4">
            {walletAddress.length > 0 ? (
              <button
                disabled
                className="dark:bg-white/[.3] font-semibold rounded-lg p-1 px-2 sm:p-2 sm:px-4 text-black dark:text-white ml-1.5 secondary-font"
              >
                {truncate(walletAddress)}
              </button>
            ) : (
              <button
                onClick={connectWalletPressed}
                className="bg-black/[.1] hover:bg-black/[.3] dark:bg-white/[.3] dark:hover:bg-slate-200/[.5] font-semibold rounded-lg p-1 px-2 sm:p-2 sm:px-4 text-black dark:text-white ml-1.5 secondary-font"
              >
                Connect Wallet
              </button>
            )}
          </div>
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
                      className="p-4 rounded-xl border-2 border-gray-700 shadow-2xl animate-pulse md:p-6 dark:border-gray-700"
                    >
                      <svg
                        className="w-full h-60 text-black-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                      </svg>
                      <div className="px-6 py-4">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="flex  mt-10">
                          <div className="flex-1 w-64">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                          <div className="flex-1 w-46">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                        </div>
                        <div className="flex mt-7">
                          <div className="flex-1 w-64">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                          <div className="flex-1 w-46">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <button
                          disabled
                          className="border-2 border-gray-700 text-black font-semibold p-2 px-4 rounded-md w-32 h-10"
                        ></button>
                      </div>
                      <span className="sr-only secondary-font">Loading...</span>
                    </div>
                  );
                })}
              </div>
            ) : raffles.length > 0 ? (
              <div className="px-6 xl:px-0 sm:px-12 pt-10 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-screen-2xl mx-auto">
                {raffles.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="rounded-xl border-4 border-transparent hover:border-pink overflow-hidden shadow relative md:hover:scale-[1.03] transition bg-white"
                    >
                      <a
                        onClick={() => enterRaffle(i)}
                        className="cursor-pointer"
                      >
                        <img
                          className="w-full h-7/12"
                          src={`https://ipfs.io/ipfs/${item.imgCid}`}
                          alt="raffle-img"
                        ></img>
                      </a>
                      <div className="p-4 mb-2 h-60">
                        <div className="font-bold text-xl text-purple mb-3">
                          {item.name}
                        </div>
                        <div className="flex">
                          <div className="flex flex-col basis-1/2 items-start">
                            <p className="text-sm text-gray-500 font-semibold secondary-font m-0">
                              Price/Ticket
                            </p>
                            <span className="text-purple dark:text-pink font-bold secondary-font">
                              {item.cost / 10 ** 18} ORB
                            </span>
                          </div>
                          <div className="flex flex-col basis-1/2 items-end">
                            <p className="text-sm text-gray-500 font-semibold secondary-font m-0">
                              Remaining
                            </p>
                            <span className="text-purple dark:text-pink font-bold secondary-font">
                              {item.totalTickets - item.participants.length} /{" "}
                              {item.totalTickets}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-4 pb-2 flex justify-center mb-2 absolute bottom-0 inset-x-0">
                        <button
                          onClick={() => enterRaffle(i)}
                          className="flex flex-col bg-purple items-center border-2 border-gray-700 text-white font-semibold p-2 px-4 rounded-md w-full secondary-font"
                        >
                          <span>View Raffle</span>
                          <span className="text-white text-xs font-semibold secondary-font">
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
                  <p className="text-center text-black uppercase font-semibold secondary-font">
                    no available raffle, check back later.
                  </p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {!loadingPage.raffle ? (
              <div className="">
                {/* <div className="float-left space-x-1.5">
                  <button
                    onClick={enterDashboard}
                    className="dark:bg-white/[.3] dark:hover:bg-slate-200/[.5] dark:text-white text-black font-semibold p-2 px-4 rounded-md secondary-font"
                  >
                    Back
                  </button>
                  {buttonBuy ||
                  Number(raffleSelected.status) == 2 ||
                  diffDays(raffleSelected.endIn) == 0 ||
                  raffleSelected.participants.length >=
                    raffleSelected.totalTickets ? (
                    <>
                      
                    </>
                  ) : Number(raffleSelected.ticketLimit) == 0 ? (
                    <>
                      <button
                        onClick={() => buyTicket(1)}
                        className="dark:bg-white/[.3] dark:hover:bg-slate-200/[.5] dark:text-white text-black font-semibold p-2 px-4 rounded-md secondary-font"
                      >
                        Buy Ticket: {raffleSelected.cost / 10 ** 18} ORB
                      </button>
                    </>
                  ) : (
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        onClick={() =>
                          setTicketQuantity((prev) =>
                            prev === 1 ? 1 : prev - 1
                          )
                        }
                        type="button"
                        className="font-black border-2 border-gray-700 text-black p-2 px-4 rounded-md"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => buyTicket(ticketQuantity)}
                        className="border-2 border-gray-700 text-black font-semibold p-2 px-4 rounded-md secondary-font"
                      >
                        Buy Ticket:{" "}
                        {(raffleSelected.cost / 10 ** 18) * ticketQuantity} ORB
                      </button>
                      <button
                        onClick={() =>
                          setTicketQuantity((prev) =>
                            prev === 10 ? 10 : prev + 1
                          )
                        }
                        type="button"
                        className="font-black border-2 border-gray-700 text-black p-2 px-4 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div> */}
                <div className="max-w-screen-xl mx-auto md:px-8 md:py-4 flex w-full flex-col md:flex-row">
                  <div className="md:w-1/3 md:mr-4 px-4 pt-4 md:pt-0 md:px-0">
                    <div className="relative rounded-2xl overflow-hidden mb-4">
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
                                className="border-2 w-full bg-transparent text-center border-white dark:border-primary focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none p-3 bg-offbase rounded-2xl text-white font-bold text-2xl"
                                type="number"
                                name="qty"
                                id="qty"
                                placeholder="Qty"
                                min="0"
                                max="50"
                                value={ticketQuantity}
                              />
                            </div>
                            <div className="flex w-full">
                              <button
                                className="w-full bg-gradient-to-t from-lime-600 to-lime-400 justify-center items-center opacity-90 hover:opacity-100 rounded-xl text-white text-xl font-bold transition"
                                onClick={() => buyTicket(ticketQuantity)}
                              >
                                Buy Raffle Ticket
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center border-4 border-pink py-2 rounded-xl">
                            <div className="font-bold text-xl text-black mt-4 secondary-font">
                              Winner
                            </div>
                            <p className="text-purple font-bold secondary-font">
                              {truncate(raffleSelected.winner)}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="md:w-2/3 bg-white dark:bg-offbase w-full md:rounded-2xl p-4 md:pt-0 mt-4 md:mt-0 flex flex-col justify-between transition">
                    <div className="w-full">
                      <div className="flex flex-col md:flex-row flex-between">
                        <div className="w-full">
                          <div>
                            <strong className="text-4xl pb-1 text-black">
                              {raffleSelected.name}
                            </strong>
                          </div>
                          {/* <div className="flex mt-3 md:mt-1 text-sm">
                            <div className="text-center md:text-left ml-8 text-slate-400">
                              <span>
                                Total Ticket Value:{" "}
                                <strong className="block md:inline text-purple-600">
                                  
                                </strong>
                              </span>
                            </div>
                          </div> */}
                        </div>
                        <div className="flex justify-between md:justify-start md:flex-col mt-4 md:mt-0 gap-x-8 md:gap-x-0 text-sm">
                          <button
                            className="flex items-center text-purple-600 hover:opacity-80 font-bold ml-1"
                            onClick={enterDashboard}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 192 512"
                              className="w-2 mr-1 fill-current"
                            >
                              <path d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"></path>
                            </svg>
                            <span className="ml-1">Back</span>
                          </button>
                          {/* <button className="flex items-center text-purple-600 hover:opacity-80 font-bold my-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-4 mr-1 fill-current"
                            >
                              <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                            </svg>{" "}
                            Share
                          </button> */}
                        </div>
                      </div>

                      <ul
                        className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none pl-0 mb-0 mt-4 border-0"
                        id="tabs-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="text-purple [&.active]:text-white [&.active]:bg-purple font-bold px-4 py-2 rounded-full transition active"
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
                            className="text-purple font-bold px-4 py-2 rounded-full transition [&.active]:text-white [&.active]:bg-purple"
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
                      <div className="flex justify-between items-center pt-3 mb-3">
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
                            <div className="py-4 border-t border-b border-gray-200 dark:border-primary">
                              <div className="grid grid-cols-1 md:grid-cols-2 font-bold gap-3 gap-y-6">
                                <div>
                                  <strong className="block text-sm text-gray-500 dark:text-purple-400/70">
                                    Raffle Status:
                                  </strong>
                                  <div className="text-xl text-purple">
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
                                    <strong className="block text-sm text-gray-500 dark:text-purple-400/70">
                                      Ticket Cost:
                                    </strong>
                                    <div className="text-xl text-pruple">
                                      {raffleSelected.cost / 10 ** 18} ORB
                                    </div>
                                  </div>
                                </div>
                                <div className="">
                                  <strong className="block text-sm text-gray-500 dark:text-purple-400/70">
                                    Raffle Start Date:
                                  </strong>
                                  <div className="text-xl text-pruple">
                                    Jan 6, 2023
                                  </div>
                                </div>
                                <div className="">
                                  <strong className="block text-sm text-gray-500">
                                    Tickets Sold:
                                  </strong>
                                  <div className="text-purple text-xl">
                                    {raffleSelected.totalTickets -
                                      raffleSelected.participants.length}{" "}
                                    / {raffleSelected.totalTickets}
                                    {/* <span className="block text-black dark:text-white font-normal text-sm">
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
                            <div className="py-4 border-t border-b border-gray-200 dark:border-primary">
                              <p className="font-semibold text-black">
                                Participants
                              </p>
                              <div className="overflow-y-scroll">
                                {participants(raffleSelected.participants).map(
                                  (item, i) => {
                                    return (
                                      <p
                                        key={i}
                                        className="text-black font-extralight secondary-font"
                                      >
                                        {truncate(item.address)} -{" "}
                                        {item.quantity}
                                      </p>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border border-purple-200 rounded-xl bg-pink/[.5] mt-4">
                        <p className="font-bold text-lg text-purple">
                          Terms &amp; Conditions
                        </p>
                        <ol className="list-decimal dark:text-white pl-5">
                          <li>
                            All NFT prizes are held by rafffle in escrow and can
                            be claimed by the winner or creator once the draw is
                            done.
                          </li>
                          <li>
                            Raffle tickets cannot be refunded once bought.
                          </li>
                          <li>
                            Raffle tickets will not be refunded if you did not
                            win the raffle.
                          </li>
                          <li>You can only buy 20% of total tickets.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="px-2 pt-10 pb-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-2xl mx-auto">
                  <div className="rounded-xl overflow-hidden shadow relative">
                    <img
                      className="w-full h-1/2"
                      src={`https://ipfs.io/ipfs/${raffleSelected.imgCid}`}
                      alt="River"
                    ></img>
                  </div>
                  <div className="rounded-xl border-4 border-transparent hover:border-pink overflow-hidden shadow relative md:hover:scale-[1.03] transition bg-white">
                    <div className="font-bold text-xl text-black mb-3 mt-5 secondary-font">
                      {raffleSelected.name}
                    </div>
                    <p className="text-black font-extralight secondary-font">
                      Status
                    </p>
                    <span className="text-black font-semibold secondary-font">
                      {Number(raffleSelected.status) == 0
                        ? "Not Started"
                        : Number(raffleSelected.status) == 1 &&
                          diffDays(raffleSelected.endIn) != 0
                        ? "In Progress"
                        : Number(raffleSelected.status) == 2
                        ? "Completed"
                        : "Ended"}
                    </span>
                    <div className="flex-1 w-64 mt-4">
                      <p className="text-black font-extralight secondary-font">
                        Tickets
                      </p>
                      <span className="text-black font-semibold secondary-font">
                        {raffleSelected.totalTickets -
                          raffleSelected.participants.length}{" "}
                        / {raffleSelected.totalTickets} -{" "}
                        {Number(raffleSelected.ticketLimit) == 0
                          ? "Single entry"
                          : "Infinite entry"}
                      </span>
                    </div>
                    <div className="flex-1 w-46 mt-4">
                      {Number(raffleSelected.status) == 1 &&
                        diffDays(raffleSelected.endIn) != 0 && (
                          <>
                            <p className="text-black font-extralight secondary-font">
                              End In
                            </p>
                            <span className="text-black font-semibold secondary-font">
                              {diffDays(raffleSelected.endIn)}
                            </span>
                          </>
                        )}
                    </div>
                  </div>
                  <div className="rounded-xl border-2 border-gray-700 p-10 w-80 md:w-full lg:w-full">
                    <div className="font-bold text-xl text-black mb-3 secondary-font">
                      Participants
                    </div>
                    <div
                      className="overflow-y-scroll"
                      style={{ height: "350px" }}
                    >
                      {participants(raffleSelected.participants).map(
                        (item, i) => {
                          return (
                            <p
                              key={i}
                              className="text-black font-extralight secondary-font"
                            >
                              {truncate(item.address)} - {item.quantity}
                            </p>
                          );
                        }
                      )}
                    </div>
                    {!/^0x0+$/.test(raffleSelected.winner) && (
                      <>
                        <div className="font-bold text-xl text-black mt-4 secondary-font">
                          Winner
                        </div>
                        <p className="text-black font-extralight secondary-font">
                          {truncate(raffleSelected.winner)}
                        </p>
                      </>
                    )}
                  </div>
                </div> */}
              </div>
            ) : (
              <div className="text-center mt-60">
                <div role="status">
                  <svg
                    className="inline mr-2 w-10 h-10 text-black-200 animate-spin dark:text-black-600 fill-gray-600"
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
      <div className="fixed bottom-8 sm:bottom-10 left-2 w-auto h-4 flex flex-row transition-all delay-1000 duration-700 opacity-100">
        <h3 className="font-800 cursor-default uppercase text-3xl sm:text-4xl uppercase font-black text-white dark:text-white">
          <span className="lg:ml-2 primary-font drop-shadow-lg bg-black/[.1] dark:bg-white/[.1] rounded py-0 px-1">
            raffle
          </span>
        </h3>
      </div>
    </main>
  );
}
