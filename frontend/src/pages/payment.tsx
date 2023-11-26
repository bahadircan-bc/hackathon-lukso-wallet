import { React, useState } from "react"



function Payment() {

    const [value, setValue] = useState("");

    

    const clickHandler1 = (e: string) => {
        console.log(e);
    }

    return (
        <>
            <div>
                <input value={value} onChange={(e) => {setValue(e.target.value)}} placeholder="Payment Amount"/>
                <button onClick={() => { clickHandler1(value) }}>Click me pls</button>
            </div>
        </>
    )
}

export default Payment