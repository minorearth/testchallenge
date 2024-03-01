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

const makeEmptyDoc = (columns) => {
  return columns
    .filter((item) => item.field != "id")
    .reduce((acc, item) => ({ ...acc, [item.field]: "Не указано" }), {});
};

function EditToolbar(props) {
  const { setRows, setRowModesModel, rows, addrow } = props;
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={addrow}>
        Добавить
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
  checkduplic
}) {
  const addrow = () => {
    const data = makeEmptyDoc(columns);
    addDocInCollection(collection, data, setRows);
  };

  const makeDataFromCSSLine = (line, columns) => {
    const items = line.split(";");
    let cols= columns
      .filter((item) => item.field != "id")
      .reduce(
        (acc, item, id) => ({
          ...acc,
          [item["field"]]: items[id] == undefined ? "Не указано" : items[id],
        }),
        {}
      );
    
      
      return {...cols,extid: dependentFilter[0].id, keyfield: dependentFilter[0].keyfield}
  };
  

  const makeDocsFromCSSLines = (lines) => {
    lines.forEach((item) => {
      const datas = makeDataFromCSSLine(item, columns);
      addDocInCollectionByValue(
        collection,
        keyfield,
        item.split(";")[0],
        datas,
        setLoaded
      );
    });

    return columns
      .filter((item) => item.field != "id")
      .reduce((acc, item) => ({ ...acc, [item.field]: "Не указано" }), {});
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    updateDocInCollectionById(collection, newRow.id, newRow);
    return updatedRow;
  };

  const handleRowEditStop = (params, event) => {
    setRowModesModel({});
  };

  const [loaded, setLoaded] = useState(true);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    console.log('rerender',dependentFilter)
    getDataFromCollection(collection, setRows,dependentFilter);
  }, [loaded,dependentFilter]);

  const fileUpload = useRef(null);
  const handleFileChange = async (file) => {
    const fileUrl = URL.createObjectURL(file);
    const response = await fetch(fileUrl);
    const text = await response.text();
    const values = text
      .split("\n")
      .join("\r")
      .split("\r")
      .filter((item) => item != "");
    makeDocsFromCSSLines(values);
    fileUpload.current.value = null;
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const captureFilterIds = (ids) => {
    return rows
      .filter((item) => ids.includes(item.id))
      .map((item) => ({ keyfield: item[keyfield], id: item.id }));
  };

  const handleSelection = (ids) => {
    setFilters(captureFilterIds(ids));
    setSelectedRows(ids);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => fileUpload.current.click()}>
        Загрузить из CSV
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          deleteAllDocsInCollectionByIds(collection, selectedRows, setLoaded)
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
        onChange={(e) => handleFileChange(e.target.files[0])}
      />
      <DataGrid
        editMode="row"
        rowModesModel={rowModesModel}
        checkboxSelection
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={handleSelection}
        processRowUpdate={processRowUpdate}
        onRowEditStop={handleRowEditStop}
        onRowModesModelChange={handleRowModesModelChange}
        onProcessRowUpdateError={() => {}}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, rows, addrow },
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
