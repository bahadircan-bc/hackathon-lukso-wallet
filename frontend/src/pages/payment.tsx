import { useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_NGROK_URL;
const searchEndPoint = "/api/instagram";

function Payment(props: any) {
  const [value, setValue] = useState("");
  const { paymentHandle, payerAddress, sendTransaction } = props;

  const findAddressFromHandle = async (handle: string) => {
    const getData = new URLSearchParams();
    getData.append("handle", handle);
    axios
      .get(backendUrl + searchEndPoint, { params: getData })
      .then((res) => {
        console.log(res.data);
        return res.data.address;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clickHandler = async () => {
    console.log(value);
    if (!paymentHandle) return;
    if (!payerAddress) return;
    const address = await findAddressFromHandle(paymentHandle);
    sendTransaction(address, value)
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
      </div>
    </>
  );
}

export default Payment;
