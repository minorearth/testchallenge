import React from "react";
import Box from "@mui/material/Box";
import { Datagrid } from "../../components/datagrid/datagrid";
import { useState } from "react";
import { Tree } from "./tree/tree";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { SwipeableEdgeDrawer } from "./swipeDrawer";
import { updateMultipleDocInCollectionById } from "../../../datamodel";
import Button from "@mui/material/Button";
import { ModalTS } from "../../components/modal/modal";
import { allocateTasks, neverRepeat } from "../components/tree/treeutils";
import { getDataFromCollection } from "../../../datamodel";
import { data } from "../components/tree/treesettings";

export const Classifier = () => {
  const collection = "tasks2";
  const [openMoveModal, setOpenMoveModal] = useState(false);
  const [openTestModal, setOpenTestModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [pickedForTest, setPickedForTest] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const handleModalOpen = () => setOpenMoveModal(true);



      // // //Найти все  айдишники  лисьтев узла
      // const TaskNum = 10;
      // const idsTaskNum = allocateTasks(data, nodeId, TaskNum);
      // const filters = Object.keys(idsTaskNum).map((item) => ({ id: item }));
      // //Запросить по этим  айдишникам задачи
      // getDataFromCollection("tasks2", filters).then((res) => {
      //   Object.keys(idsTaskNum).forEach((fldid) => {
      //     console.log(pickRandomTasks(
      //       idsTaskNum[fldid],
      //       res.filter((item) => item.extid == fldid).map((item) => item.id)
      //     ));
      //   });
  
      // });

  const addTotest = (e, { nodeId, labelText }) => {
    // //Найти все  айдишники  лисьтев узла
    const TaskNum = 10;
    const idsTaskNum = allocateTasks(data, nodeId, TaskNum);
    const filters = Object.keys(idsTaskNum).map((item) => ({ id: item }));
    // //Запросить по этим  айдишникам задачи
    getDataFromCollection("tasks2", filters).then((res) => {

      setPickedForTest((state) => [
        ...state,
        {
          type: "folder",
          id: nodeId,
          folder: labelText,
          tasks:res,
          allocation:idsTaskNum,
          qty: "Укажите количество задач",
        },
      ]);
      

    });



    e.stopPropagation();
  };

  const moveTasks = ({ nodeId }) => {
    // console.log('zu',selectedFolderToMove)
    updateMultipleDocInCollectionById(collection, selectedTasks, {
      extid: nodeId,
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
      <Tree
        setSelected={setSelectedFolder}
        sx={{ flexGrow: 1 }}
        setPickedForTest={setPickedForTest}
        mode="select"
        actions={{ moveTasks: moveTasks, addTotest: addTotest }}
      />
      <Datagrid
        sx={{ flexGrow: 6 }}
        collection={collection}
        mode="simple"
        keyfield="name"
        checkduplic={false}
        dependentFilter={selectedFolder}
        setFilters={setSelectedTasks}
        actions={{
          movetask: handleModalOpen,
          openTestSelected: () => setOpenTestModal(true),
          setPickedForTest: setPickedForTest,
        }}
      />
      {/* <SwipeableEdgeDrawer state={state} toggleDrawer={toggleDrawer} /> */}
      <ModalTS
        open={openMoveModal}
        close={() => setOpenMoveModal(false)}
        sx={{ height: "40%", width: "40%" }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Выберите новое местоположение
        </Typography>
        <Tree
          setSelected={() => {}}
          mode="move"
          actions={{ moveTasks: moveTasks, addTotest: addTotest }}
        />
      </ModalTS>

      <ModalTS
        open={openTestModal}
        close={() => setOpenTestModal(false)}
        sx={{ height: "90%", width: "90%" }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Задачи и папки в тесте
        </Typography>
        <Datagrid
          collection="tests"
          mode="externalData"
          extRows={pickedForTest}
          extRowsSetter={setPickedForTest}
          keyfield="none"
          checkduplic={false}
          dependentFilter=""
          setFilters={() => {}}
          actions={{ action1: () => {}, action1: () => {} }}
        />
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
