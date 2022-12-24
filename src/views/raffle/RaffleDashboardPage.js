import React, { useEffect, useState } from "react";
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

    const raffles = await getRaffles();
    setRaffles(raffles);

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
    <main className="mt-20">
      <ToastContainer />
      <div className="items-center justify-center w-full h-screen">
        <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
          <div className="flex items-center lg:order-2 connect">
            {walletAddress.length > 0 ? (
              <button
                disabled
                className="border-solid border-2 border-gray-700 font-semibold rounded-lg p-2 px-4 text-gray"
              >
                {truncate(walletAddress)}
              </button>
            ) : (
              <button
                onClick={connectWalletPressed}
                className="border-solid border-2 border-gray-700 font-semibold rounded-lg p-2 px-4 text-gray"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
        {stage === 0 ? (
          <>
            {loadingPage.dashboard ? (
              <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {[1, 2, 3].map((item, i) => {
                  return (
                    <div
                      key={i}
                      role="status"
                      className="p-4 rounded-xl border-2 border-gray-700 shadow-2xl animate-pulse md:p-6 dark:border-gray-700"
                    >
                      <svg
                        className="w-full h-60 text-gray-200"
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
                          className="border-2 border-gray-700 text-gray font-semibold p-2 px-4 rounded-md w-32 h-10"
                        ></button>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                })}
              </div>
            ) : raffles.length > 0 ? (
              <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {raffles.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="rounded-xl border-2 border-gray-700 overflow-hidden shadow-2xl relative"
                    >
                      <img
                        className="w-full h-1/2"
                        src={`https://ipfs.io/ipfs/${item.imgCid}`}
                        alt="raffle-img"
                      ></img>
                      <div className="p-4 mb-5">
                        <div className="font-bold text-xl text-gray mb-3">
                          {item.name}
                        </div>
                        <div className="flex">
                          <div className="flex-1 grow w-64">
                            <p className="text-gray font-thin">Total ticket</p>
                            <span className="text-gray font-semibold">
                              {item.totalTickets} -{" "}
                              {Number(item.ticketLimit) == 0
                                ? "Single entry"
                                : "Infinite entry"}
                            </span>
                          </div>
                          <div className="flex-1 grow w-46">
                            <p className="text-gray font-thin">Ticket Price</p>
                            <span className="text-gray font-semibold">
                              {item.cost / 10 ** 18} ZNN
                            </span>
                          </div>
                        </div>
                        <div className="flex mt-3">
                          <div className="flex-1 w-64">
                            <span className="text-gray font-semibold">
                              {Number(item.status) == 0
                                ? "Not Started"
                                : Number(item.status) == 1 &&
                                  diffDays(item.endIn) != 0
                                ? "In Progress"
                                : Number(item.status) == 2
                                ? "Completed"
                                : "Ended"}
                            </span>
                          </div>
                          <div className="flex-1 w-46">
                            {Number(item.status) == 1 &&
                              diffDays(item.endIn) != 0 && (
                                <>
                                  <p className="text-gray font-thin">
                                    Ticket Ends In
                                  </p>
                                  <span className="text-gray font-semibold">
                                    {diffDays(item.endIn)}
                                  </span>
                                </>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-4 pb-2 flex justify-center mb-2 absolute bottom-0 inset-x-0">
                        {Number(item.status) > 0 ? (
                          <button
                            onClick={() => enterRaffle(i)}
                            className="border-2 border-gray-700 text-gray font-semibold p-2 px-4 rounded-md"
                          >
                            View Raffle
                          </button>
                        ) : (
                          <button
                            disabled
                            className="border-2 border-gray-700 text-gray font-semibold p-2 px-4 rounded-md"
                          >
                            View Raffle
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="mt-60">
                  <p className="text-center text-gray uppercase font-semibold">
                    no available raffle, check back later.
                  </p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {!loadingPage.raffle ? (
              <div className="p-10">
                <div className="float-right space-x-1.5">
                  <button
                    onClick={enterDashboard}
                    className="border-2 border-gray-700 text-gray font-semibold p-2 px-4 rounded-md mb-2"
                  >
                    Dashboard
                  </button>
                  {buttonBuy ||
                  Number(raffleSelected.status) == 2 ||
                  diffDays(raffleSelected.endIn) == 0 ||
                  raffleSelected.participants.length >=
                    raffleSelected.totalTickets ? (
                    <>
                      {/* <button disabled className="border-2 border-gray-700 text-gray font-semibold p-2 px-4 rounded-md">Buy Ticket: {raffleSelected.cost / 10**18} ZNN</button> */}
                    </>
                  ) : Number(raffleSelected.ticketLimit) == 0 ? (
                    <>
                      <button
                        onClick={() => buyTicket(1)}
                        className="border-2 border-gray-700 text-gray font-semibold p-2 px-4 rounded-md"
                      >
                        Buy Ticket: {raffleSelected.cost / 10 ** 18} ZNN
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
                        className="font-black border-2 border-gray-700 text-gray p-2 px-4 rounded-md"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => buyTicket(ticketQuantity)}
                        className="border-2 border-gray-700 text-gray font-semibold p-2 px-4 rounded-md"
                      >
                        Buy Ticket:{" "}
                        {(raffleSelected.cost / 10 ** 18) * ticketQuantity} ZNN
                      </button>
                      <button
                        onClick={() =>
                          setTicketQuantity((prev) =>
                            prev === 10 ? 10 : prev + 1
                          )
                        }
                        type="button"
                        className="font-black border-2 border-gray-700 text-gray p-2 px-4 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-28">
                  <div className="rounded-xl border-2 border-gray-700 p-10 w-80 md:w-full lg:w-full">
                    <img
                      className="w-full h-72"
                      src={`https://ipfs.io/ipfs/${raffleSelected.imgCid}`}
                      alt="River"
                    ></img>
                    <div className="font-bold text-xl text-gray mb-3 mt-5">
                      {raffleSelected.name}
                    </div>
                    <p className="text-gray font-extralight">Status</p>
                    <span className="text-gray font-semibold">
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
                      <p className="text-gray font-extralight">Tickets</p>
                      <span className="text-gray font-semibold">
                        {raffleSelected.participants.length} /{" "}
                        {raffleSelected.totalTickets} -{" "}
                        {Number(raffleSelected.ticketLimit) == 0
                          ? "Single entry"
                          : "Infinite entry"}
                      </span>
                    </div>
                    <div className="flex-1 w-46 mt-4">
                      {Number(raffleSelected.status) == 1 &&
                        diffDays(raffleSelected.endIn) != 0 && (
                          <>
                            <p className="text-gray font-extralight">End In</p>
                            <span className="text-gray font-semibold">
                              {diffDays(raffleSelected.endIn)}
                            </span>
                          </>
                        )}
                    </div>
                  </div>
                  <div className="rounded-xl border-2 border-gray-700 p-10 w-80 md:w-full lg:w-full">
                    <div className="font-bold text-xl text-gray mb-3">
                      Participants
                    </div>
                    <div
                      className="overflow-y-scroll"
                      style={{ height: "350px" }}
                    >
                      {participants(raffleSelected.participants).map(
                        (item, i) => {
                          return (
                            <p key={i} className="text-gray font-extralight">
                              {truncate(item.address)} - {item.quantity}
                            </p>
                          );
                        }
                      )}
                    </div>
                    {!/^0x0+$/.test(raffleSelected.winner) && (
                      <>
                        <div className="font-bold text-xl text-gray mt-4">
                          Winner
                        </div>
                        <p className="text-gray font-extralight">
                          {truncate(raffleSelected.winner)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-60">
                <div role="status">
                  <svg
                    className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
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
      <div className="fixed bottom-8 sm:bottom-10 left-2 w-auto h-4 flex flex-row transition-all delay-1000 duration-700 opacity-100">
        <h3 className="font-800 cursor-default uppercase text-3xl sm:text-4xl uppercase font-black text-white">
          <span className="lg:ml-2 primary-font drop-shadow-lg bg-white/[.3] rounded py-0 px-1">
            raffle
          </span>
        </h3>
      </div>
    </main>
  );
}
