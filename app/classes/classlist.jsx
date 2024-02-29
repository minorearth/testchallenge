import React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbarContainer,
  GridRowModes,
  GridRowEditStopReasons,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  addDocInCollectionByValue,
  deleteAllDocsInCollectionByIds,
  getDataFromCollection,
  updateDocInCollectionById,
  addDocInCollection,
} from "./datamodel";

const columns = [
  { field: "id", headerName: "id", width: 270 },
  { field: "classname", headerName: "Мои классы", editable: true, width: 130 },
];

const buildRows = (classes) => {
  let ret = [];
  classes.forEach((item) => {
    {
      const data = item.data();
      ret = [...ret, { id: item.id, classname: data.classname }];
    }
  });
  return ret;
};

function EditToolbar(props) {
  const { setRows, setRowModesModel, rows } = props;
  const handleClick = () => {
    addDocInCollection("classes", "classname", "Не указан", setRows);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export function Classlist({ classes }) {
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    updateDocInCollectionById("classes", newRow.id, newRow);
    return updatedRow;
  };

  const handleRowEditStop = (params, event) => {
    setRowModesModel({});
  };

  const [loaded, setLoaded] = useState(true);

  const handleFileChange = async (e) => {
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    const response = await fetch(fileUrl);
    const text = await response.text();
    const lines = text
      .split("\n")
      .join("\r")
      .split("\r")
      .filter((item) => item != "");
    lines.forEach((line) => {
      addDocInCollectionByValue(
        "classes",
        "classname",
        line.split(";")[0],
        {
          classname: line.split(";")[0],
          school: "1298",
          userid: "1",
        },
        setLoaded
      );
    });
    fileUpload.current.value = null;
  };

  const [rows, setRows] = useState([]);
  useEffect(() => {
    getDataFromCollection("classes", setRows, buildRows);
  }, [loaded]);

  const fileUpload = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => fileUpload.current.click()}>
        Загрузить из CSV
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          deleteAllDocsInCollectionByIds("classes", selectedRows, setLoaded)
        }
      >
        Удалить выбранные
      </Button>
      <input
        id="filePicker"
        style={{ visibility: "hidden" }}
        type="file"
        accept=".csv"
        ref={fileUpload}
        onChange={handleFileChange}
      />
      <DataGrid
        editMode="row"
        rowModesModel={rowModesModel}
        checkboxSelection
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={(ids) => {
          setSelectedRows(ids);
        }}
        processRowUpdate={processRowUpdate}
        onRowEditStop={handleRowEditStop}
        onRowModesModelChange={handleRowModesModelChange}
        onProcessRowUpdateError={() => {}}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, rows },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
