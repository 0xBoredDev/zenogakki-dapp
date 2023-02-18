const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_RAFFLE_URL);

const erc20tokenAbi = require("./abi/token.json");
const tokenContractAddress = "0x854C376A30bA8536e92Befca5157C54a1581dd28";

const raffleAbi = require("./abi/raffle.json");
const raffleContractAddress = "0x6c6538495f989df04c58caf07c100d8bb5a118de";

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
