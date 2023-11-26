//import axios from "axios"
import { useState } from "react"

function SignUp() {

    const [count, setCount] = useState(0);

    const handleInsta = () => {
        setCount((count) => count + 1)
        console.log("Clicked Instagram handler " + (count + 1) + " times.")
        window.location.href = "http://localhost:5173/main";
        // window.open(
        //   `https://4f73-212-2-212-152.ngrok-free.app/api/auth`,
        //   "_blank",
        //   "height=600,width=400"
        // );
    }

    return (
        <>
          <div className="">
            <div className="">
                <h3 className="">Sign-Up / Log-In</h3>
                <button className="" onClick={() =>{handleInsta()}}>Instagram</button>
          </div>
          </div>
        </>
    )
}

export default SignUp