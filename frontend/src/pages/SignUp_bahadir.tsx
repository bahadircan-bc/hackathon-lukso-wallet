import { useState } from "react";
import { LSPFactory } from "@lukso/lsp-factory.js";
import Web3 from "web3";
import axios from "axios";
//https://relayer.testnet.lukso.network/api/universal-profile/create2-parameters

// const dataKeys = (0,
//   _services_relayer__WEBPACK_IMPORTED_MODULE_3__.El)("", universalReceiverAddress);
//   const dataValues = (0,
//   _services_relayer__WEBPACK_IMPORTED_MODULE_3__["do"])(_providers_web3__WEBPACK_IMPORTED_MODULE_2__.rV, lsp3MetadataValue, defaultUniversalReceiverPermissions, defaultControllerPermissions, universalReceiverAddress);
//   const parameters = {
//       primaryImplementationContractAddress: controlledContractImplementation,
//       secondaryContractAddControlledContractAddress: true,
//       secondaryContractExtraInitializationParams: "0x",
//       secondaryContractInitializationCalldata: "0xc4d66de8",
//       secondaryImplementationContractAddress: ownerContractImplementation,
//       linkedContractsFactoryAddress: linkedContractFactoryAddress,
//       upPostDeploymentModuleAddress: postDeploymentModuleAddress,
//       dataKeys: dataKeys,
//       dataValues: dataValues,
//       dataKeysControllerIndex: 3,
//       dataValuesControllerIndex: 6,
//       icon: document.location.origin + "/favicon.png"
//   };

if (!window.lukso) {
  window.alert("Please install Lukso Wallet extension");
}
const web3 = new Web3(window.lukso);

let isConnecting = false;
async function connect() {
  // Check if a connection request is already in progress
  if (isConnecting) {
    console.log("Connection request already in progress.");
    return;
  }

  // Set the flag to indicate that a connection request is in progress
  isConnecting = true;

  try {
    // Wait for the connection request to complete
    web3.eth
      .requestAccounts()
      .then((accounts) => {
        console.log("Connected with", accounts[0]);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  } catch (error) {
    // handle connection error
  } finally {
    // Reset the flag once the connection request is complete (either success or failure)
    isConnecting = false;
  }
}

// console.log(window.lukso);
const RPC_URL = "https://rpc.testnet.lukso.network";

const backendUrl = "https://4f73-212-2-212-152.ngrok-free.app";
const authEndpoint = "/api/auth";
export default function SignUpBahadir() {
  connect();

  const [instaHandle, setInstaHandle] = useState("");

  const createUP = async () => {
    // const newAccount = web3.eth.accounts.create();
    // console.log(newAccount)
    // const lspFactory = new LSPFactory(RPC_URL, newAccount.privateKey)
    // console.log(lspFactory)
    // await lspFactory.UniversalProfile.deploy({
    //   controllerAddresses: ["0xbc49531E2178A049A174aF4E16eE1657e34fcdDa"],
    // });

    const create2Params = await axios.get(
      "https://relayer.testnet.lukso.network/api/universal-profile/create2-parameters"
    );
    const data = create2Params.data;
    console.log(data.defaultControllerPermissions);
    const result = await window.lukso.request({
      method: "up_generateLSP23Address",
      params: [
        {
          primaryImplementationContractAddress:
            data.controlledContractImplementation,
          secondaryContractAddControlledContractAddress: true,
          secondaryContractExtraInitializationParams: "0x",
          secondaryContractInitializationCalldata: "0xc4d66de8",
          secondaryImplementationContractAddress:
            data.ownerContractImplementation,
          linkedContractsFactoryAddress: data.linkedContractFactoryAddress,
          upPostDeploymentModuleAddress: data.postDeploymentModuleAddress,
          dataKeys: [""],
          dataValues: [""],
          dataKeysControllerIndex: 0,
          dataValuesControllerIndex: 0,
        },
      ],
    });
    console.log(result);
    // window.lukso.request(result);
    window.lukso.request({
      method: "up_import",
      params: [result.upAddress],
    });
  };

  const handleClick = () => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== backendUrl) return;
        console.log(event.origin);
        console.log("message data: ", event.data);
        setInstaHandle(event.data);
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
  };
  return (
    <div className="flex flex-col bg-red-500 w-1/2 aspect-square items-center justify-evenly">
      <div className="cursor-pointer" onClick={handleClick}>
        {instaHandle ? "Logged in as " + instaHandle : "Login with Instagram"}
      </div>
      <div onClick={createUP}>Create your Universal Profile</div>
    </div>
  );
}
// https://devsunify.com/?code=AQBVR1ZScvB-0GWcb-bvbb2oc4d1lWKsvkl2TzPLg9Z4AcpnSses8XPH9r8rXQgDDcTx3KltarhqxOoyMpR6kf9q-0i14ulB-s42cPeYE_kY64tkyxhsmz8PSh5jnFw8gjJVSzTHSlIWgK-LXyWP0EUjgI4H4bEAzGyq9kY1gN7BSO0ytV-aQO6zguXLPLZjHCexYtZcApDjcaieGWW1w6ieEAhVTmatOg6JxOtlV57L0A#_
