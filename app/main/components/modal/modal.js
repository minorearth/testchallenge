import React, { Children } from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


const style = {
    // width: 800,
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
export const ModalTS = ({open,close,children,sx}) => {
  return (
    <Modal
    
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    
      <Box sx={{...style,...sx}}>
        {children}
      </Box>
    </Modal>
  );
};
