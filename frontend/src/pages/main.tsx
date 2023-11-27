//import axios from "axios"
import { useState } from "react"
import "../index.css";
import SearchBar from "./searchbar";
import image from "../assets/react.svg";
import Payment from "./payment";

function Main() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="">
        <div>
          <img src={image} />
          <h1>Find User With Instagram Account</h1>
        </div>

        <div>
          <SearchBar onChange={setSearchValue} />
        </div>

        <div>
          <h1>Enter the Payment Amount</h1>
        </div>

        <div>
          <Payment paymentHandle={searchValue}/>
        </div>
      </div>
    </>
  );
}

export default Main;
