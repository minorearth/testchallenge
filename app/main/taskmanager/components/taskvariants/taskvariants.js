import React from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTaskVariants } from "./ViewModel";

function EditToolbar({ addrow, uploadDataFromCss, deleteRows }) {
  return (
    <GridToolbarContainer>
      {/* <InvisibleInput handleFileChange={uploadDataFromCss} /> */}
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => deleteRows()}
      >
        Удалить выбранные
      </Button>
      <Button color="primary" startIcon={<AddIcon />} onClick={addrow}>
        Добавить
      </Button>
    </GridToolbarContainer>
  );
}

export const TaskVariants = ({
  collection,
  keyfield,
  columns,
  dependentFilter,
  setFilters,
  checkduplic,
  rows
}) => {
  const [loaded, setLoaded] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
//   const [rows, setRows] = useState([]);
  const [
    deleteRows,
    addrow,
    uploadDataFromCss,
    RowUpdate,
    captureFilterIds,
    getGridData,
  ] = useTaskVariants();

  const handleRowEditStop = (params, event) => {
    setRowModesModel({});
  };

  useEffect(() => {
    // getGridData();
  }, [loaded, dependentFilter,rows]);

  const [rowModesModel, setRowModesModel] = useState({});
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSelection = (ids) => {
    setSelectedRows(ids);
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      rowModesModel={rowModesModel}
      checkboxSelection
      onRowSelectionModelChange={handleSelection}
      processRowUpdate={RowUpdate}
      onRowEditStop={handleRowEditStop}
      onRowModesModelChange={handleRowModesModelChange}
      onProcessRowUpdateError={() => {}}
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        toolbar: { uploadDataFromCss, addrow, deleteRows },
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
  );
};
