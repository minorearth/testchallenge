import React from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { InvisibleInput } from "../invisibleinput";
import { useDatagrid } from "./ViewModel.js";

// { delete, copy, edittask, csvload, add, move}
function EditToolbar({ addrow, uploadDataFromCss, deleteRows, showhidetool,actions }) {
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
        Отредактировать
      </Button>
      <Button
        color="primary"
        startIcon={<DriveFileMoveOutlinedIcon />}
        sx={{ display: showhidetool.move }}
        onClick={actions.action1}
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
    rows
  );

  const handleRowEditStop = (params, event) => {
    setRowModesModel({});
  };

  useEffect(() => {
    getGridData();
  }, [dependentFilter,loaded]);

  const [rowModesModel, setRowModesModel] = useState({});
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSelection = (ids) => {
    setFilters(captureFilterIds(ids));
    setSelectedRows(ids);
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
        onRowModesModelChange={handleRowModesModelChange}
        onProcessRowUpdateError={() => {}}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { uploadDataFromCss, addrow, deleteRows, showhidetool,actions },
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
    </div>
  );
}
