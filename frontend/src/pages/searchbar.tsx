import { React, useState } from "react";
import TextField from "@mui/material/TextField";

function SearchBar() {

    const [value, setValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent) => {
        setValue(event.target.value)
    }

    const handleButtonClick = (e: string) => {
        console.log("Entered " + e);
    }

    return (
        <div className="main" >
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