//import axios from "axios"
import { useState } from "react"

function SignUp() {

    const [count, setCount] = useState(0);

    const handleInsta = () => {
        setCount((count) => count + 1)
        console.log("Clicked Instagram handler " + (count + 1) + " times.")
        window.location.href = "http://localhost:5173/pages/main";
        // Send auth request with axios to backend route
    }

    return (
        <>
          <div className="">
            <div className="">
                <h3 className="">Sign-Up / Log-In</h3>
                <button className="" onClick={() => 
                        {handleInsta()}

                    }
                    >Instagram</button>
            </div>
          </div>
        </>
    )
}

export default SignUp