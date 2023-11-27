import Web3 from "web3";
import UniversalProfile from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import { useState } from "react";
import { AbiItem } from "web3-utils";

const web3 = new Web3(window.lukso);

export default function SetGetInstagramHandle() {
  const [instagramHandle, setInstagramHandle] = useState("");
  const [retrievedHandle, setRetrievedHandle] = useState("");

  const updateInstagramHandle = async (handle: string, address: string) => {
    try {
      const contract = new web3.eth.Contract(
        UniversalProfile.abi as AbiItem[],
        address // Replace with the Universal Profile contract address
      );

      const key = web3.utils.keccak256("InstagramHandle");
      const value = web3.utils.asciiToHex(handle);
      const receipt = await contract.methods.setData(key, value).send({
        from: address,
        gas: "1000000",
      });
      console.log("Transaction successful:", receipt);
    } catch (error) {
      console.error("Error updating Instagram handle:", error);
    }
  };

  const getInstagramHandle = async (address: string) => {
    try {
      const contract = new web3.eth.Contract(
        UniversalProfile.abi as AbiItem[],
        address // Replace with the Universal Profile contract address
      );

      const key = web3.utils.keccak256("InstagramHandle");
      const data = await contract.methods.getData(key).call();
      const handle = web3.utils.hexToAscii(data);
      setRetrievedHandle(handle);
      console.log("Instagram Handle:", handle);
    } catch (error) {
      console.error("Error fetching Instagram handle:", error);
    }
  };

  const connectAndSetHandle = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      await updateInstagramHandle(instagramHandle, accounts[0]);
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  const connectAndGetHandle = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      await getInstagramHandle(accounts[0]);
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };
  return (
    <div className="flex flex-col gap-5 px-[35%]">
      <input
        type="text"
        value={instagramHandle}
        onChange={(e) => setInstagramHandle(e.target.value)}
      />
      <button onClick={connectAndSetHandle}>Set Instagram Handle</button>
      <button onClick={connectAndGetHandle}>Get Instagram Handle</button>
      {retrievedHandle && <p>Retrieved Instagram Handle: {retrievedHandle}</p>}
    </div>
  );
}