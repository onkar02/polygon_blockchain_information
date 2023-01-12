import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import axios from "axios";

// Make the request and print the formatted response:

const socket = io.connect("http://localhost:3001");

function App() {
  // Alchemy URL

  const [metaData, setmetaData] = React.useState();
  const [walletAddress, setWalletAddress] = React.useState();
  const address = "0xA7fAf09d160D777c98beef579087266f6da167c9";
  const baseURL = `https://eth-goerli.g.alchemy.com/v2/-K60VHPnv0UaWOd7xGz_lGJeoT8Ljd8L`;
  const baseURL_main_net = `https://eth-mainnet.g.alchemy.com/v2/mmrmgQPFrYZa7ovaEShSli6cadoF_F30`;
  const url = `${baseURL_main_net}/getNFTs/?owner=${walletAddress}`;
  const config = {
    method: "get",
    url: url,
  };
  const request_nft_metadata = async () => {
    await axios(config)
      .then((response) => {
        console.log(response["data"]);
        const nfts = response["data"];
        // Parse output
        const numNfts = nfts["totalCount"];
        const nftList = nfts["ownedNfts"];
        console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);

        let i = 1;
        let meta = [];
        for (let i = 0; i < nftList.length; i++) {
          console.log(nftList[i]);
          meta.push(nftList[i].metadata);
          // console.log(`${i}. ${JSON.stringify(nft["metadata"])}`);
        }
        setmetaData(meta);
        // for (nft of nftList) {
        //   meta.push(nft["metadata"]);
        //   console.log(`${i}. ${JSON.stringify(nft["metadata"])}`);
        //   i++;
        // }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          margin: "20px",
          flex: "1",
        }}
      >
        <input
          type="text"
          placeholder="John..."
          onChange={(event) => {
            setWalletAddress(event.target.value);
          }}
        />
        <button onClick={() => request_nft_metadata()}>Find</button>
      </div>
      <div
        style={{
          margin: "20px",
          flex: "1",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
          }}
        >
          {metaData?.map((metaData) => (
            <li
              style={{
                height: "40vh",
                flexGrow: 1,
              }}
            >
              {metaData.image ? (
                <img
                  src={metaData?.image}
                  alt="img"
                  style={{
                    maxHeight: "100%",
                    minWidth: "100%",
                    objectFit: "cover",
                    verticalAlign: "bottom",
                  }}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
