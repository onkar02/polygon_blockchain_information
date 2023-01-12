import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import PolyContractDeploy from "./Polygon/PolyContractDeploy";
import PolyContractDeployERC1155 from "./Polygon/PolyContractDeployERC1155";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import Web3App2 from "./Web3App2";
// import MintNft from "./scripts/MintNft";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <PolyContractDeploy /> */}
    <PolyContractDeployERC1155 />
    {/* <Web3App /> */}
    {/* <Web3App2 /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
