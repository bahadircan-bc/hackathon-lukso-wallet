//import axios from "axios"
// import { useState } from "react"
import "../index.css"
import SearchBar from "./searchbar"
import image from '../assets/react.svg'
import Payment from "./payment"

function Main() {


    return (
        <>
            <div className="" style={{display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column"}}>
                <div className="mt-20">
                    <h1>Find User With Instagram Account</h1>
                </div>

                <div className="">
                    <SearchBar/>
                </div>

                <div className="mt-16 mb-16">
                    <h1>Enter the Payment Amount</h1>
                </div>

                <div>
                    <Payment/>
                </div>
            </div>
        </>
    )
}

export default Main