import React from "react";
import Box from "@mui/material/Box";
import { Datagrid } from "../../components/datagrid/datagrid";
import { useState } from "react";
import { Tree } from "./tree";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { updateMultipleDocInCollectionById } from "../../../datamodel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Classifier = () => {
  const router = useRouter();

  const handleEditClick = (id) => {
    router.push(`/main/tasksclassifier/${id}`);
  };

  const taskscolumns22 = [
    { field: "id", headerName: "id", width: 270 },
    {
      field: "description",
      headerName: "Название",
      editable: true,
      width: 130,
    },
    { field: "generator", headerName: "Генератор", editable: true, width: 130 },
    { field: "function", headerName: "Функция", editable: true, width: 130 },
    { field: "variants", headerName: "Варианты", editable: true, width: 130 },
    {
      field: "actions",
      type: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          label="Edit"
          icon={<EditIcon />}
          onClick={() => handleEditClick(id)}
        />,
      ],
    },
  ];

  const collection = "tasks2";

  const [openMoveModal, setOpenMoveModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const handleModalOpen = () => setOpenMoveModal(true);

  const moveTasks = (selectedFolderToMove) => {
    updateMultipleDocInCollectionById(collection, selectedTasks, {
      extid: selectedFolderToMove.id,
    });
    setOpenMoveModal(false);
  };

  return (
    <Box sx={{ minHeight: 110, flexGrow: 1 }}>
      {/* <HorizontalLinearStepper /> */}
      <div>
        {/* <textarea
        className="w-full h-60"
        name="postContent"
        rows={4}
        cols={40}
        defaultValue={taskProfile != undefined && selectedTasks}
      /> */}

        <div className="flex-row flex">
          <Tree setSelected={setSelectedFolder} />
          <Datagrid
            collection={collection}
            keyfield="name"
            columns={taskscolumns2}
            checkduplic={false}
            showhidetool={{
              delete: "none",
              copy: true,
              edittask: true,
              csvload: "none",
              add: "none",
              move: true,
            }}
            dependentFilter={selectedFolder}
            setFilters={setSelectedTasks}
            actions={{ movetask: handleModalOpen }}
          />

          <Modal
            open={openMoveModal}
            onClose={() => setOpenMoveModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Выберите новое местоположение
              </Typography>
              <Tree setSelected={moveTasks} />
            </Box>
          </Modal>
        </div>
      </div>
    </Box>
  );
};
