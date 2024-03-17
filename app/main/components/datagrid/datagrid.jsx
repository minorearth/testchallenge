import React from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { InvisibleInput } from "../invisibleinput";
import { useDatagrid } from "./ViewModel.js";
import Modal from "@mui/material/Modal";


// { delete, copy, edittask, csvload, add, move}
function EditToolbar({
  addrow,
  uploadDataFromCss,
  deleteRows,
  showhidetool,
  actions,
}) {
  return (
    <GridToolbarContainer>
      <InvisibleInput
        handleFileChange={uploadDataFromCss}
        vis={showhidetool.csvload}
      />
      <Button
        color="primary"
        startIcon={<DeleteOutlineOutlinedIcon />}
        onClick={() => deleteRows()}
        sx={{ display: showhidetool.delete }}
      >
        Удалить выбранные
      </Button>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        sx={{ display: showhidetool.add }}
        onClick={addrow}
      >
        Добавить
      </Button>
      <Button
        color="primary"
        startIcon={<CreateOutlinedIcon />}
        sx={{ display: showhidetool.edittask }}
        onClick={addrow}
      >
        Отредактировать задачу
      </Button>
      <Button
        color="primary"
        startIcon={<CreateOutlinedIcon />}
        sx={{ display: showhidetool.edittest }}
        onClick={addrow}
      >
        Отредактировать тест
      </Button>
      <Button
        color="primary"
        startIcon={<DriveFileMoveOutlinedIcon />}
        sx={{ display: showhidetool.move }}
        onClick={actions.movetask}
      >
        Переместить
      </Button>
      <Button
        color="primary"
        startIcon={<ContentCopyOutlinedIcon />}
        sx={{ display: showhidetool.copy }}
        onClick={addrow}
      >
        Скопировать
      </Button>
    </GridToolbarContainer>
  );
}

export function Datagrid({
  collection,
  keyfield,
  columns,
  dependentFilter,
  setFilters,
  checkduplic,
  showhidetool,
  actions,
  mode,
}) {
  const [loaded, setLoaded] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [
    deleteRows,
    addrow,
    uploadDataFromCss,
    RowUpdate,
    captureFilterIds,
    getGridData,
  ] = useDatagrid(
    collection,
    selectedRows,
    setLoaded,
    columns,
    setRows,
    dependentFilter,
    checkduplic,
    keyfield,
    rows,
    mode
  );

  const handleRowEditStop = (params, event) => {
    setRowModesModel({});
  };

  useEffect(() => {
    getGridData(mode);
  }, [dependentFilter, loaded]);

  const [rowModesModel, setRowModesModel] = useState({});
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSelection = (ids) => {
    setFilters(captureFilterIds(ids));
    setSelectedRows(ids);
  };  
  
  const handleCellEditStart = (ids) => {
    console.log('fig')
  };

  return (
    <div>
      <DataGrid
        editMode="row"
        rowModesModel={rowModesModel}
        checkboxSelection
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={handleSelection}
        processRowUpdate={RowUpdate}
        onRowEditStop={handleRowEditStop}
        onCellEditStart={handleCellEditStart}
        onRowModesModelChange={handleRowModesModelChange}
        onProcessRowUpdateError={() => {}}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            uploadDataFromCss,
            addrow,
            deleteRows,
            showhidetool,
            actions,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          columns: {
            columnVisibilityModel: {
              // id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {/* <Modal
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
      </Modal> */}
    </div>
  );
}
