//import axios from "axios"
import { useState, useCallback, useEffect } from "react";
import "../index.css";
import SearchBar from "./searchbar";
import image from "../assets/react.svg";
import Payment from "./payment";
import Web3 from "web3";

const web3 = new Web3(window.lukso);

// await web3.eth.sendTransaction({
//     from: accounts[0],                      // The Universal Profile address
//     to: '0x...',                            // receiving address, can be a UP or EOA
//     value: web3.utils.toWei('0.5', 'ether') // 0.5 amount in ETH, in wei unit
// })
let isConnecting = false;
function Main() {
  const [searchValue, setSearchValue] = useState("");
  const [address, setAddress] = useState<string | undefined>();

  const connect = useCallback(async () => {
    // Check if a connection request is already in progress
    if (isConnecting) {
      console.log("Connection request already in progress.");
      return;
    }

    // Set the flag to indicate that a connection request is in progress
    isConnecting = true;

    try {
      // Wait for the connection request to complete
      const accounts = await web3.eth.requestAccounts();
      setAddress(accounts[0]);
      console.log("Connected with", accounts[0]);
    } catch (error) {
      console.log(error);
      return;
    }
  }, []);

  useEffect(() => {
    connect();
  });

  const sendTransaction = async (receiverAddress: string, value: string) => {
    await web3.eth.sendTransaction({
      from: address, // The Universal Profile address
      to: receiverAddress, // receiving address, can be a UP or EOA
      value: web3.utils.toWei(value, "ether"), // 0.5 amount in ETH, in wei unit
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h1>Find User With Instagram Account</h1>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <SearchBar onChange={setSearchValue} />
      </div>

      <div
        style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}
      >
        <h1>Enter the Payment Amount</h1>
      </div>

      <div style={{ textAlign: "center" }}>
        <Payment
          paymentHandle={searchValue}
          payerAddress={address}
          sendTransaction={sendTransaction}
        />
      </div>
    </div>
  );
}

export default Main;
