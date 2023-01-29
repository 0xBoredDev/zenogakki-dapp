const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(
  "https://eth-goerli.g.alchemy.com/v2/CH1V81ZMzVXNjIFWnRNNTTgY0nD_Twh6"
);

const erc20tokenAbi = require("./abi/token.json");
const tokenContractAddress = "0x275352a6CBe9298D657ef7eC105ce698D4a0D744";

const raffleAbi = require("./abi/raffle.json");
const raffleContractAddress = "0x6436dd179e180c2433a5a67a690463b455B8c961";

const tokenContract = new web3.eth.Contract(
  erc20tokenAbi,
  tokenContractAddress
);
const raffleContract = new web3.eth.Contract(raffleAbi, raffleContractAddress);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return {
        success: true,
        status: "connected",
        address: addressArray[0],
      };
    } catch (err) {
      return {
        success: false,
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      success: false,
      address: "",
      status:
        "You must install MetaMask, a virtual Ethereum wallet, in your browser.",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "connected",
          success: true,
        };
      } else {
        return {
          address: "",
          status: "",
          success: true,
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
        success: false,
      };
    }
  } else {
    return {
      address: "",
      status:
        "You must install MetaMask, a virtual Ethereum wallet, in your browser.",
      success: false,
    };
  }
};

let response = {
  success: false,
  status: "",
};

export const getRaffles = async () => {
  const totalRaffle = await raffleContract.methods.totalRaffle().call();
  let raffles = [];

  for (let index = 1; index <= totalRaffle; index++) {
    let raffleDetails = await raffleContract.methods.raffleById(index).call();
    raffles.push(raffleDetails);
  }

  return raffles;
};

export const getTokenBalance = async (address) => {
  const result = await tokenContract.methods.balanceOf(address).call();
  return result;
};

export const checkTokenAllowance = async (address) => {
  const result = await tokenContract.methods
    .allowance(address, raffleContractAddress)
    .call();
  return result;
};

export const approveAllowance = async (address, amount) => {
  await tokenContract.methods
    .approve(raffleContractAddress, amount)
    .send({
      from: address,
      to: tokenContractAddress,
    })
    .then(function (receipt) {
      // console.log("receipt", receipt);
      response.success = true;
      response.status = "Allowance approved successfully";
    })
    .catch(function (error) {
      // console.log("error: ", error);
      response.success = false;
      response.status = "Something went wrong";
    });

  return response;
};

export const purchaseTicket = async (address, tickeId, quantity) => {
  await raffleContract.methods
    .purchaseTicket(tickeId, quantity)
    .send({
      from: address,
      to: raffleContractAddress,
    })
    .then(function (receipt) {
      // console.log("receipt", receipt);
      response.success = true;
      response.status = "Ticket bought successfully";
    })
    .catch(function (error) {
      // console.log("error: ", error);
      response.success = false;
      response.status = "Something went wrong";
    });

  return response;
};
