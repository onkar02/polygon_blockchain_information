import React, { useEffect, useState } from "react";
import abi from "./ABI.json";
import { ethers, ContractFactory } from "ethers";
import Web3 from "web3";
import { bytecode } from "./byteCode";
// using ethers insted of web3 for deploying contract
const PolyContractDeploy = () => {
  const [accountAddress, setAccountAddress] = useState();
  const [contract, setContract] = useState();
  const [accountAddressFrom, setAccountAddressFrom] = useState();
  const [accountAddressTo, setAccountAddressTo] = useState();
  const [balanceOfFrom, setBalanceOfFrom] = useState();
  const [balanceOfTo, setBalanceOfTo] = useState();
  const contractAddress = "0xe665191fbad788ad244a069bf2f5f64ba58bc2e5";
  const [transferAmount, setTransferAmount] = useState(0);
  console.log("transferAmount: ", transferAmount);
  const web3 = new Web3();
  //   bytecode of our contract taken from remix

  const connectMetamask = async () => {
    // check if ethereum wallet is there in background if yes it will popup metamask wallet
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      //   get  Accounts in wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts: ", accounts);
      //   stored accounts for our use only
      setAccountAddress(accounts[0]);
      //   we need web3 provider to sign transaction from our wallet private key
      //for this we will get provider from wallet and get signer which sign the transaction
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setContract(contract);
      //   we are calling this function to deploy the contract on polygon testnet mumbai
      //   deploy(abi, bytecode, signer);
    }
  };

  //   deploy the code
  const deploy = async (abi, bytecode, signer) => {
    // ABI we are getting from the Remix where we written our contract and compile
    console.log("abi: ", abi);
    console.log("bytecode: ", bytecode);
    const factory = new ContractFactory(abi, bytecode, signer);
    // 0x6eA86d648270FB7513bbD3b551b8E5cB1eC2e964
    const contract = await factory.deploy();
    console.log("contract address: ", contract.address);

    console.log("contract deploy transaction: ", contract.deployTransaction);
    const deployTransactionvar = await contract.deployTransaction.wait();
    console.log("deployTransactionvar: ", deployTransactionvar);
  };

  useEffect(() => {
    // connect to metamask as soon as we load this page
    // STARTING POINT
    connectMetamask();
  }, []);

  let multiplier = ethers.BigNumber.from(String(10 ** 18));
  const transfer = async () => {
    console.log(
      ethers.BigNumber.from(transferAmount).mul(multiplier).toString()
    );

    let transfer = await contract.transfer(
      accountAddressTo,
      ethers.BigNumber.from(transferAmount).mul(multiplier)
    );
    await transfer.wait();
    console.log("balance: ", transfer);
  };
  const transferFrom = async () => {
    let transfer = await contract.transferFrom(
      accountAddressFrom,
      accountAddressTo,
      ethers.BigNumber.from(transferAmount).mul(multiplier)
    );
    console.log("balance: ", transfer);
    // console.log("balance: ", transfer?._hex);
    // console.log("balance: ", parseInt(transfer?._hex, 16));
  };
  const balanceOf = async () => {
    if (accountAddressFrom) {
      let balance = await contract.balanceOf(accountAddressFrom);
      console.log("balance: ", balance);
      console.log(
        "balance IN INT: ",
        parseInt(balance?._hex, 16).toLocaleString("fullwide", {
          useGrouping: false,
        })
      );
      setBalanceOfFrom(
        parseInt(balance?._hex, 16).toLocaleString("fullwide", {
          useGrouping: false,
        })
      );
    } else if (accountAddressTo) {
      let balance1 = await contract.balanceOf(accountAddressTo);
      console.log(
        "balance: ",
        parseInt(balance1?._hex, 16).toLocaleString("fullwide", {
          useGrouping: false,
        })
      );
      setBalanceOfTo(
        parseInt(balance1?._hex, 16)?.toLocaleString("fullwide", {
          useGrouping: false,
        })
      );
    }
  };

  const showBalance = async () => {
    if (accountAddressFrom && accountAddressTo) {
      let balanceFrom = await contract.balanceOf(accountAddressFrom);
      let balanceTo = await contract.balanceOf(accountAddressTo);
      let balance1 = parseInt(balanceFrom?._hex, 16);
      setBalanceOfFrom(balance1);
      let balance2 = parseInt(balanceTo?._hex, 16);
      setBalanceOfTo(balance2);
      console.log("balance: ", balance1);
      console.log("balance: ", balance2);
    } else {
      return;
    }
  };

  return (
    <div className="App">
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
              setAccountAddressFrom(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="transfer to{accountAddress}"
            onChange={(event) => {
              setAccountAddressTo(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="token amount"
            onChange={(event) => {
              setTransferAmount(event.target.value);
            }}
          />
          <div>
            {/* <button onClick={showBalance}>ShowBalance</button> */}
            <button onClick={transfer}>Transfer</button>
            <button onClick={balanceOf}>Balance of</button>
            <button onClick={transferFrom}>Balance From To</button>
            <button onClick={showBalance}>Show Balance of Accounts</button>
          </div>
        </div>
      </div>
      <div>
        <h2>
          Balance of - {accountAddressFrom}...{" "}
          {balanceOfFrom ? balanceOfFrom : 0}
        </h2>
        <h2>
          Balance of - {accountAddressTo} {balanceOfTo ? balanceOfTo : 0}
        </h2>
      </div>
    </div>
  );
};
export default PolyContractDeploy;
