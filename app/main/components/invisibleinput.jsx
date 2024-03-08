import React from "react";
import { Button } from "@mui/material";
import { useRef} from "react";
import AddIcon from "@mui/icons-material/Add";



export const InvisibleInput = ({handleFileChange}) => {
  const fileUpload = useRef(null);

  return (
    <>
      <Button color="primary" startIcon={<AddIcon />} onClick={() => fileUpload.current.click()}>
        Загрузить из CSV
      </Button>
      <input
        id="filePicker"
        style={{ display: "none" }}
        type="file"
        accept=".csv"
        ref={fileUpload}
        onChange={(e) => handleFileChange(e.target.files[0])}
      />
    </>
  );
};
