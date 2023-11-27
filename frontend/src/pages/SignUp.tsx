//import axios from "axios"
import { useState } from "react"
import instaIcon from '../assets/insta_ic.png';

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
            <div className="" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                <h3 className="text-4xl text-lukso-fuchsia mt-32 mb-32 ">Sign-Up / Log-In</h3>
                <button className="text-4xl" onClick={() => { handleInsta() }}>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row"}}> 
                        <img className="w-24 -ml10" src={instaIcon}/>
                        <h1 className="w-64 text-3xl text-black">Instagram</h1>
                    </div>
                   
                    </button>
          </div>
          </div>
        </>
    )
}

export default SignUp