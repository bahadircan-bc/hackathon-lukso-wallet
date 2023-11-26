//import axios from "axios"
// import { useState } from "react"
import "../index.css"
import SearchBar from "./searchbar"
import image from '../assets/react.svg'
import Payment from "./payment"

function Main() {


    return (
        <>
            <div className="">
                <div>
                    <img src={image}/>
                    <h1>Find User With Instagram Account</h1>
                </div>

                <div>
                    <SearchBar/>
                </div>

                <div>
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