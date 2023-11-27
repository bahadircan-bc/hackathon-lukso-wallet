import { useState } from "react";
// import { LSPFactory } from "@lukso/lsp-factory.js";
import LSP23LinkedContractsFactory from "@lukso/lsp-smart-contracts/artifacts/LSP23LinkedContractsFactory.json";
import { AbiItem } from "web3-utils";
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

// struct PrimaryContractDeploymentInit {
//   bytes32 salt;
//   uint256 fundingAmount;
//   address implementationContract;
//   bytes initializationCalldata;
// }

// [
//   "0x643f865680784c66b24ae9f68e5cde7d25d8cd7c5b97e05220f6bc523f1dec34",
//   "0",
//   "0x52c90985af970d4e0dc26cb5d052505278af32a9",
//   "0xc4d66de8000000000000000000000000000000000066093407b6704b89793beffd0d8f00"
// ]

// struct SecondaryContractDeploymentInit {
//   uint256 fundingAmount;
//   address implementationContract;
//   bytes initializationCalldata;
//   bool addPrimaryContractAddress;
//   bytes extraInitializationParams;
// }

// [
//   "0",
//   "0xa75684d7d048704a2db851d05ba0c3cbe226264c",
//   "0xc4d66de8",
//   "true",
//   "0x"
// ]

const postDeploymentModuleCalldata =
  "0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000075ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc50cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b474b80742de2bf82acb3630000a5467dfe7019bf2c7c5f7a707711b9d4cad118c84b80742de2bf82acb3630000a16cce084663d5e45494ae7a9530125a806e92a1df30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3df30dba06db6a30e65354d9a64c6098600000000000000000000000000000000df30dba06db6a30e65354d9a64c6098600000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000000596f357c6afff9f21516be6ae6a0e7c0eea71308d388c39cae34add34b2e50b6bfc97309ae697066733a2f2f516d6159556256336a6177453679616364596d547842386e4252584d7a4641316257695879753133676b4e723862000000000000000000000000000000000000000000000000000000000000000000000000000014a5467dfe7019bf2c7c5f7a707711b9d4cad118c800000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000060080000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000007f3f06000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014a5467dfe7019bf2c7c5f7a707711b9d4cad118c80000000000000000000000000000000000000000000000000000000000000000000000000000000000000014a16cce084663d5e45494ae7a9530125a806e92a1000000000000000000000000";

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
    const account = await window.lukso.request({
      method: "eth_requestAccounts",
    });

    if (!account) {
      return;
    }

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
    const lsp23contract = new web3.eth.Contract(
      LSP23LinkedContractsFactory.abi as AbiItem[],
      data.linkedContractFactoryAddress
    );
    console.log(lsp23contract);
    const receipt = await lsp23contract.methods
      .deployERC1167Proxies(
        [
          result.salt,
          0,
          data.controlledContractImplementation,
          "0xc4d66de8000000000000000000000000000000000066093407b6704b89793beffd0d8f00",
        ],
        [
          0,
          data.ownerContractImplementation,
          data.ownerInitializationCalldata,
          true,
          "0x",
        ],
        data.postDeploymentModuleAddress,
        postDeploymentModuleCalldata
      )
      .send({
        from: account[0],
        gas: "1000000",
      });
    console.log("receipt :", receipt);
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
