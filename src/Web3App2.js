import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import Web3 from "web3";
import { ethers } from "ethers";
// const socket = io.connect("http://localhost:3001");

function Web3App2() {
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [num2, setNum2] = useState(0);
  const [accountAddress, setAccountAddress] = useState(0);
  const [contract, setcontract] = useState(0);
  const [total, setTotal] = useState();
  const Address = "0x6516a3Ae1B770C0b861633331EebD2B16BaaC89A";
  const web3 = new Web3();
  console.log();

  const connectMetamask = async () => {
    const { ethereum } = window;
    if (ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Address, ABI, signer);
      setcontract(contract);

      //    web3.eth.Contract(ABI, Address);
    }
  };
  useEffect(() => {
    connectMetamask();
  }, []);

  let balance1;
  let balance2;
  const showBalance = async () => {
    let balance = await contract.balanceOf(
      "0xE4B9cF3e78c4189c637ed69FE9448eDE4A5392E1"
    );
    let balance22 = await contract.balanceOf(
      "0x47fa8776e44C5f2a7A01be2A09AF31Db616c83Bd"
    );
    balance1 = parseInt(balance?._hex, 16);
    balance2 = parseInt(balance22?._hex, 16);
    console.log("balance: ", balance);
    console.log("balance: ", balance?._hex);
    console.log("balance: ", parseInt(balance?._hex, 16));
  };

  const transfer = async () => {
    let transfer = await contract.transfer(address, web3.utils.toWei(num2));
    console.log("balance: ", transfer);
    // console.log("balance: ", transfer?._hex);
    // console.log("balance: ", parseInt(transfer?._hex, 16));
  };
  const transferFrom = async () => {
    let transfer = await contract.transferFrom(
      address,
      address2,
      web3.utils.toWei(num2),
      { gasLimit: 100000 }
    );
    console.log("balance: ", transfer);
    // console.log("balance: ", transfer?._hex);
    // console.log("balance: ", parseInt(transfer?._hex, 16));
  };
  const balanceOf = async () => {
    let balance = await contract.balanceOf(address);
    console.log("balance: ", balance);
    console.log("balance: ", balance?._hex);
    console.log("balance: ", parseInt(balance?._hex, 16));
    // let transaction = await balance?.wait();
    // console.log("transaction: ", transaction);
  };
  const count = async () => {
    let total = await contract.viewAdd();
    console.log("total: ", total);
    console.log("total: ", total?._hex);

    setTotal(parseInt(total?._hex, 18));
  };

  const ABI = [
    {
      constant: false,
      inputs: [
        {
          name: "spender",
          type: "address",
        },
        {
          name: "tokens",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "success",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "tokens",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "success",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "from",
          type: "address",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "tokens",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          name: "success",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          name: "tokens",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "tokenOwner",
          type: "address",
        },
        {
          indexed: true,
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          name: "tokens",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "_totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "tokenOwner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "remaining",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "tokenOwner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "a",
          type: "uint256",
        },
        {
          name: "b",
          type: "uint256",
        },
      ],
      name: "safeAdd",
      outputs: [
        {
          name: "c",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "a",
          type: "uint256",
        },
        {
          name: "b",
          type: "uint256",
        },
      ],
      name: "safeDiv",
      outputs: [
        {
          name: "c",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "a",
          type: "uint256",
        },
        {
          name: "b",
          type: "uint256",
        },
      ],
      name: "safeMul",
      outputs: [
        {
          name: "c",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "a",
          type: "uint256",
        },
        {
          name: "b",
          type: "uint256",
        },
      ],
      name: "safeSub",
      outputs: [
        {
          name: "c",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];
  //   const MetaMaskPresent = window.ethereum;
  //   console.log("MetaMaskPresent: ", MetaMaskPresent);

  return (
    <div className="App">
      {/* <div className="joinChatContainer">
        <h3>Addition of Two Numbers using web3</h3>
        <h3>Wallet Address {accountAddress}</h3>

        <div>Addition is{total} </div>
        <input
          type="text"
          placeholder="balance of {accountAddress}"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        {/* <input
          type="text"
          placeholder="num2"
          onChange={(event) => {
            setNum2(event.target.value);
          }}
        /> */}
      {/* <button onClick={showBalance}>ShowBalance</button>
        <button onClick={count}>Total</button> */}
      {/* </div> */}
      <div
        className="joinChatContainer"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <input
            type="text"
            placeholder="transfer from{accountAddress}"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="transfer to{accountAddress}"
            onChange={(event) => {
              setAddress2(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="token amount"
            onChange={(event) => {
              setNum2(event.target.value);
            }}
          />
          <div>
            {/* <button onClick={showBalance}>ShowBalance</button> */}
            <button onClick={transfer}>Transfer</button>
            <button onClick={balanceOf}>Balance of</button>
            <button onClick={transferFrom}>Balance From To</button>
          </div>
        </div>
        <div>
          <h2>Balance of - 0xe4b9cf3e78c4189... {balance1 ? balance1 : 0}</h2>
          <h2>Balance of - 0x47fa8776e44C5f2... {balance2 ? balance2 : 0}</h2>
        </div>
        {/* <h3>Transfer token</h3>
        <h3>Wallet Address {accountAddress}</h3> */}
      </div>
    </div>
  );
}

export default Web3App2;
