import React from "react";
import TextField from "@mui/material/TextField";

export const Propinput = ({ attName, setRmState, rmState }) => {
  const changeHandler = (event) => {
    setRmState((state) => ({ ...state, [attName]: event.target.value }));
  };

  return (
    <div>
      {/* <input
          type="text"
          value={value}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={changeHandler}
        /> */}
      <TextField
        id="outlined-basic"
        label={attName}
        variant="outlined"
        value={rmState[attName]}
        // onKeyDown={saveHandler}
        onChange={changeHandler}
      />
    </div>
  );
};
