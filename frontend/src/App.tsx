import { useState, useEffect } from "react";
import SearchIcon from "./assets/search.svg";
import Logo from "./assets/logo1.png";
import "./fonts/Fontspring-DEMO-visbycf-bold.otf";
import { purple } from "@mui/material/colors";

const App = () => {
  return (
    <>
      <div className="main-container">
        <img
          className="w-[360px] aspect-square rounded-full -mt48"
          src={Logo}
          alt="App Logo"
        />
        <div className="motto">
          <div
            style={{
              borderRadius: "5px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "400px",
              marginLeft: "400px",
            }}
          >
            <h1 className="title text-4xl mb-32 ml-32 mr-32 text-center">
              We are providing you the best wallet service. Why don't you join
              us?
            </h1>
          </div>
        </div>
        <div>
          <button
            className="title text-6xl"
            onClick={() => {
              window.location.href = "http://localhost:5173/signup";
            }}
          >
            Join Us!
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
