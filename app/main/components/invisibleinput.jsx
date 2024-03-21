import React from "react";
import { Button } from "@mui/material";
import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export const InvisibleInput = ({ handleFileChange, vis }) => {
  const fileUpload = useRef(null);

  return (
    <>
      <Button
        color="primary"
        sx={{ display: vis }}
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={() => fileUpload.current.click()}
      >
        Загрузить из CSV
      </Button>
      <input
        id="filePicker"
        style={{ display: "none" }}
        type="file"
        accept=".csv"
        ref={fileUpload}
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={(e) => {
          handleFileChange(e.target.files[0]);
        }}
      />
    </>
  );
};
