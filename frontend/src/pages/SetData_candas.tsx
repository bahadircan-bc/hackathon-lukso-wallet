import Web3 from "web3";
import LSP0ERC725Account from "@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json";
import { useState } from "react";
import { AbiItem } from "web3-utils";

const web3 = new Web3(window.lukso);
console.log(web3.eth)

export default function SetData_candas() {
  const [twitterHandle, setTwitterHandle] = useState("");

  const updateTwitterHandle = async (handle: string, address: string) => {
    try {
      const contract = new web3.eth.Contract(
        LSP0ERC725Account.abi as AbiItem[],
        address // Replace with actual contract address
      );

      const key = web3.utils.keccak256("TwitterHandle");
      const value = web3.utils.asciiToHex(handle);

      const receipt = await contract.methods
        .setData(key, value)
        .send({ from: address, gas: "1000000" });
      console.log("Transaction successful:", receipt);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const connectAndSetHandle = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      console.log('Connected account:', accounts[0]);
      await updateTwitterHandle(twitterHandle, accounts[0]);
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={twitterHandle}
        onChange={(e) => setTwitterHandle(e.target.value)}
      />
      <button onClick={connectAndSetHandle}>Set Twitter Handle</button>
    </div>
  );
}