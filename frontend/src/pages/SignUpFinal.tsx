import { useCallback, useEffect, useState } from "react";
import UniversalProfile from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import axios from "axios";

const web3 = new Web3(window.lukso);
const backendUrl = import.meta.env.VITE_BACKEND_NGROK_URL;
console.log(backendUrl);
const authEndpoint = "/api/auth";

const sendHandleToBackend = async (handle: string, address: string) => {
  const postData = {
    handle,
    address,
    // Add other properties to the request body as needed
  };
  axios
    .post(backendUrl + "/api/instagram", postData, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        // Add other headers if needed
        "Content-Type": "application/json", // Set the content type if sending JSON
      },
    })
    .then((res) => {
      // Handle the response
      console.log(res.data);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
};

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
    sendHandleToBackend(handle, address);
  } catch (error) {
    console.error("Error updating Instagram handle:", error);
  }
};

const extensionIsInstalled = () => {
  return typeof window.lukso !== "undefined";
};

let isConnecting = false;

export default function SignUpFinal() {
  const [instagramHandle, setInstagramHandle] = useState<string | undefined>(
    ""
  );
  const [retrievedHandle, setRetrievedHandle] = useState<string | undefined>(
    ""
  );
  const [address, setAddress] = useState<string | undefined>();

  const authorizeInstagram = useCallback(async () => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== backendUrl) return;
        console.log(event.origin);
        console.log("message data: ", event.data);
        setInstagramHandle(event.data);
      },
      false
    );
    console.log("auth");
    const newWindow = window.open(
      backendUrl + authEndpoint,
      "_blank",
      "height=600,width=400"
    );
    console.log(newWindow);
    if (newWindow) {
      newWindow.onclose = () => {
        newWindow.window.postMessage("hello", "*");
      };
    }
  }, [backendUrl, authEndpoint]);

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

  useEffect(() => {
    const getInstagramHandle = async (
      address: string
    ): Promise<string | undefined> => {
      try {
        const contract = new web3.eth.Contract(
          UniversalProfile.abi as AbiItem[],
          address // Replace with the Universal Profile contract address
        );

        const key = web3.utils.keccak256("InstagramHandle");
        const data = await contract.methods.getData(key).call();
        if (!data) return;
        const handle = web3.utils.hexToAscii(data);
        console.log("Instagram Handle:", handle);
        return handle;
      } catch (error) {
        console.error("Error fetching Instagram handle:", error);
      }
    };

    if (address) {
      getInstagramHandle(address).then((handle) => {
        setRetrievedHandle(handle);
      });
    }
  }, [address]);

  if (!extensionIsInstalled()) {
    return (
      <div>
        <div>Please install Lukso Wallet extension</div>
      </div>
    );
  }

  if (!address) {
    return (
      <div>
        <div
          onClick={() => {
            isConnecting = false;
            connect();
          }}
        >
          Connect Your Universal Profile
        </div>
      </div>
    );
  }

  if (!retrievedHandle) {
    return (
      <div>
        <div>Hello {address}</div>
        {instagramHandle ? (
          <div>Authorized Instagram Handle: {instagramHandle}</div>
        ) : (
          <div onClick={authorizeInstagram}>Login to your Instagram</div>
        )}
        <div
          onClick={() => {
            if (instagramHandle)
              updateInstagramHandle(instagramHandle, address);
          }}
        >
          Update Instagram Handle
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>Hello {address}</div>
      <div>Instagram Handle: {retrievedHandle}</div>
      <div
        onClick={() => {
          if (retrievedHandle) updateInstagramHandle(retrievedHandle, address);
        }}
      >
        Remove Instagram Handle
      </div>
      <div
        onClick={async () => {
          const postData = {
            address: address,
            handle: retrievedHandle,
            // Add other properties to the request body as needed
          };
          axios
            .post(backendUrl + "/api/instagram", postData, {
              headers: {
                "ngrok-skip-browser-warning": "69420",
                // Add other headers if needed
                "Content-Type": "application/json", // Set the content type if sending JSON
              },
            })
            .then((res) => {
              // Handle the response
              console.log(res.data);
            })
            .catch((error) => {
              // Handle errors
              console.error(error);
            });
        }}
      >
        test
      </div>
    </div>
  );
}
