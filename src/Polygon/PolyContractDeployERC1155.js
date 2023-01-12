import React, { useEffect, useState } from "react";
import abi from "./ABI1155.json";
import { ethers, ContractFactory } from "ethers";
import { bytecode } from "./byteCode1155";
function PolyContractDeployERC1155() {
  useEffect(() => {
    connectMetamask();
  }, []);
  const contractAddress = "0x8eC0bC48C0c57012DF11EF5EfF90Ae298F20cec0";
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
      //   we need web3 provider to sign transaction from our wallet private key
      //for this we will get provider from wallet and get signer which sign the transaction
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log("contract: ", contract);
      //this is function takes contract address and the account address to mint nft
      // mintNft(contract, accounts[0]);
      transferNfts(contract, accounts[0]);

      //which gives you your metadata url
      // uri(contract);

      //   we are calling this function to deploy the contract on polygon testnet mumbai
      // deploy(abi, bytecode, signer);
    }
  };
  const deploy = async (abi, bytecode, signer) => {
    // ABI we are getting from the Remix where we written our contract and compile
    console.log("abi: ", abi);
    console.log("bytecode: ", bytecode);
    const factory = new ContractFactory(abi, bytecode, signer);
    console.log("factory: ", factory);
    const contract = await factory.deploy();
    console.log("contract address: ", contract.address);
    const deployTransactionvar = await contract.deployTransaction.wait();
    console.log("deployTransactionvar: ", deployTransactionvar);
  };

  const uri = async (contract) => {
    let token = await contract.uri(5);
    console.log("token: ", token);
  };
  const mintNft = async (contract, accounts) => {
    //actual contract function to mint nft
    let nftmint = await contract
      .mint(accounts, 5, 50)
      .then((res) => {
        console.log("nftmint: then", res);
        //trnsaction hash 0xf96661c05bec69feb34d09f380d25de1b8020ba2cfc70955a4d47545a87b3e0b
      })
      .catch((err) => {
        console.log("nftmint err", err);
      });
    console.log("nftmint: ", nftmint);
    //this is our metadata url which stored all the information related to our nft
    let ipfs =
      "https://ipfs.artchivenft.com/ipfs/QmbrA2H34tnLJp35CwUTx8b2DuMfiUaUfbX7Q5oQz4oNm9";

    //after minting the nft we provide this metadata to the token id seperately
    let tokenURI = await contract.setTokenUri(5, ipfs);
    //0x7120dd45c622483e505b0ae69c35ab27c0c2107b2f90228e76d75299621bda94
    console.log("tokenURI: ", tokenURI);
  };

  const transferNfts = async (contract, accounts) => {
    console.log("contract: ", contract);
    console.log("accounts: ", accounts);
    let to = "0x47fa8776e44C5f2a7A01be2A09AF31Db616c83Bd";

    let transferNft = await contract
      .safeTransferFrom(accounts, to, "5", "20", [])
      .then((res) => {
        console.log("transferNft: then", res);
      })
      .catch((err) => {
        console.log("transferNft err", err);
      });
    console.log("transferNft: ", transferNft);
  };

  return <div>PolyContractDeployERC1155</div>;
}

export default PolyContractDeployERC1155;
