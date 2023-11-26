import { useState } from "react";
import { LSPFactory } from "@lukso/lsp-factory.js";

console.log(window)
const RPC_URL = 'https://rpc.testnet.lukso.network';
const lspFactory = new LSPFactory(RPC_URL);

const backendUrl = "https://4f73-212-2-212-152.ngrok-free.app"
const authEndpoint = '/api/auth';
export default function SignUpBahadir() {
  const [instaHandle, setInstaHandle] = useState("");
  const createUP = async() => {
    // await lspFactory.UniversalProfile.deploy({
    //   controllerAddresses: [
    //     '0x7Ab53a0C861fb955050A8DA109eEeA5E61fd8Aa4',
    //   ],
    // });
  }
  const handleClick = () => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== backendUrl) return;
        console.log(event.origin)
        console.log('message data: ', event.data)
        setInstaHandle(event.data)
      },
      false,
    );
    console.log("auth");
    const newWindow = window.open(
      backendUrl+authEndpoint,
      "_blank",
      "height=600,width=400"
    );
    console.log(newWindow)
    if (newWindow) {
      newWindow.onclose = () => {
        newWindow.window.postMessage("hello", "*")
      }
    }
  };
  return (
    <div className="flex flex-col bg-red-500 w-1/2 aspect-square items-center justify-evenly">
      <div className="cursor-pointer" onClick={handleClick}>
        {instaHandle ? 'Logged in as ' + instaHandle : 'Login with Instagram'}
      </div>
      <div onClick={createUP}>
        Create your Universal Profile
      </div>
    </div>
  );
}
// https://devsunify.com/?code=AQBVR1ZScvB-0GWcb-bvbb2oc4d1lWKsvkl2TzPLg9Z4AcpnSses8XPH9r8rXQgDDcTx3KltarhqxOoyMpR6kf9q-0i14ulB-s42cPeYE_kY64tkyxhsmz8PSh5jnFw8gjJVSzTHSlIWgK-LXyWP0EUjgI4H4bEAzGyq9kY1gN7BSO0ytV-aQO6zguXLPLZjHCexYtZcApDjcaieGWW1w6ieEAhVTmatOg6JxOtlV57L0A#_
