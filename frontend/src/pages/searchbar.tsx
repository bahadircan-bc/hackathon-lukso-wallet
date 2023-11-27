import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function SearchBar(props: any) {

    const [value, setValue] = useState("");
    const {onChange} = props;
 
    const handleInputChange = (event: any) => {
        setValue(event.target.value)
        onChange && onChange(event.target.value);
    }

    const handleButtonClick = (e: string) => {
        console.log("Entered " + e);
    }

    return (
        <div className="main">
            <div className="search">
                <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
                value={value}
                onChange={handleInputChange}
                placeholder="Instagram Address"
                />
            </div>
            <button onClick={() => { handleButtonClick(value) }}>User Finder Button</button>
        </div>
    );
}

export default SearchBar;