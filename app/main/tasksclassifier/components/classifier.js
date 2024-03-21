import React from "react";
import Box from "@mui/material/Box";
import { Datagrid } from "../../components/datagrid/datagrid";
import { useState } from "react";
import { Tree } from "./tree";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { SwipeableEdgeDrawer } from "./swipeDrawer";
import { updateMultipleDocInCollectionById } from "../../../datamodel";
import Button from "@mui/material/Button";
import { ModalTS } from "../../components/modal/modal";
import {GmailTreeView} from './custTree'


export const Classifier = () => {
  const collection = "tasks2";
  const [openMoveModal, setOpenMoveModal] = useState(false);
  const [openTestModal, setOpenTestModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [pickedForTest, setPickedForTest] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const handleModalOpen = () => setOpenMoveModal(true);

  const moveTasks = (selectedFolderToMove) => {
    updateMultipleDocInCollectionById(collection, selectedTasks, {
      extid: selectedFolderToMove[0].id,
    });
    setOpenMoveModal(false);
  };

  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      {/* <HorizontalLinearStepper /> */}
      <Tree setSelected={setSelectedFolder} sx={{ flexGrow: 1 }} setPickedForTest={setPickedForTest} />
      <Datagrid
        sx={{ flexGrow: 6 }}
        collection={collection}
        mode="simple"
        keyfield="name"
        checkduplic={false}
        dependentFilter={selectedFolder}
        setFilters={setSelectedTasks}
        actions={{ movetask: handleModalOpen, openTestSelected: ()=>setOpenTestModal(true) }}
      />
      {/* <SwipeableEdgeDrawer state={state} toggleDrawer={toggleDrawer} /> */}
      <ModalTS open={openMoveModal} close={() => setOpenMoveModal(false)  } sx={{height:"40%", width:'40%'}}> 
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Выберите новое местоположение
        </Typography>
        <Tree setSelected={moveTasks} />
      </ModalTS>
      <ModalTS open={openTestModal} close={() => setOpenTestModal(false)  } sx={{height:"90%", width:'90%'}}> 
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Выберите новое местоположение2
        </Typography>
        <GmailTreeView/>
    
      </ModalTS>

      {/* <Fab
        color="green"
        aria-label="add"

        sx={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width:100,
          height:100,
        }}
      >
        <PlaylistAddOutlinedIcon sx={{width: 50, height:50}} />
      </Fab> */}
    </Box>
  );
};
