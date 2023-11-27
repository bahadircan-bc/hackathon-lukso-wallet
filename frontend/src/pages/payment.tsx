import { useCallback, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_NGROK_URL;
const searchEndPoint = "/api/instagram";

function Payment(props: any) {
  const [value, setValue] = useState("");
  const { paymentHandle, sendTransaction, payerAddress } = props;

  const findAddressFromHandle = async (handle: string) => {
    const getData = new URLSearchParams();
    getData.append("handle1", handle);
    axios
      .get(backendUrl + searchEndPoint, {
        params: getData,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data.address;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clickHandler = async () => {
    sendTransaction('0xB2ccddd06e30b249138b6819dc398C272C1014E2', value);
    console.log(value);
    console.log(paymentHandle);
    console.log(payerAddress);
    if (!paymentHandle) return;
    if (!payerAddress) return;
  };

  return (
    <>
      <div>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Payment Amount"
        />
        <div
          className="cursor-pointer"
          onClick={() => {
            clickHandler();
          }}
        >
          SEND
        </div>
        {/* <div
          onClick={() => {
            findAddressFromHandle("tester1");
          }}
        >
          test
        </div> */}
      </div>
    </>
  );
}

export default Payment;
