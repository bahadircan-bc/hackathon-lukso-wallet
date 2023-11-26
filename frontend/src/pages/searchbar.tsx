import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import image from '../assets/react.svg'

function SearchBar() {

    const [value, setValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent) => {
        setValue(event.target.value)
    }

    const handleButtonClick = (e: string) => {
        console.log("Entered " + e);
    }

    return (
        <div className="main">
            <img src={image} />
            <h1>Find User</h1>
            <div className="search">
                <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
                value={value}
                onChange={handleInputChange}
                />
            </div>
            <button onClick={() => { handleButtonClick(value) }}>click here</button>
        </div>
    );
}

export default SearchBar;