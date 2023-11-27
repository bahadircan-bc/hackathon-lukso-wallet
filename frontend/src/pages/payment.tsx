import { useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_NGROK_URL;
const searchEndPoint = "/api/instagram";

function Payment(props: any) {
  const [value, setValue] = useState("");
  const { paymentHandle } = props;

  const findAddressFromHandle = async (handle: string) => {
    const getData = new URLSearchParams();
    getData.append("handle", handle);
    axios
      .get(backendUrl + searchEndPoint, { params: getData })
      .then((res) => {
        console.log(res.data);
        paymentHandle(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clickHandler1 = (value: string) => {
    console.log(value);
    if (paymentHandle) {
      findAddressFromHandle(value);
    }
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
        <button
          onClick={() => {
            clickHandler1(value);
          }}
        >
          Click me pls
        </button>
      </div>
    </>
  );
}

export default Payment;
