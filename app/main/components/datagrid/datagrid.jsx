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
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { tasks, classes, users, variants, tests } from "./dgsettings";
import { ModalTS } from "../modal/modal";

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
        onClick={() => actions.movetask()}
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
      <Button
        color="primary"
        startIcon={<ContentCopyOutlinedIcon />}
        sx={{ display: showhidetool.openTestSelected }}
        onClick={()=>actions.openTestSelected()}
      >
        Создать тест
      </Button>
    </GridToolbarContainer>
  );
}

export function Datagrid(props) {
  const {
    actions,
    dependentFilter,
    mode,
    columns,
    collection,
    setFilters,
    sx,
  } = props;

  const [loaded, setLoaded] = useState(true);
  const [modaltext, setdModaltext] = useState();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [showhidetool, setShowhidetool] = useState({});
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const {
    deleteRows,
    addrow,
    uploadDataFromCss,
    RowUpdate,
    captureFilterIds,
    getGridData,
  } = useDatagrid({
    ...props,
    selectedRows: selectedRows,
    setLoaded: setLoaded,
    cols: cols,
    rows: rows,
    setRows: setRows,
  });

  const handleRowEditStop = (params, event) => {
    setRowModesModel({});
  };

  const handleViewClick = (params) => {
    setdModaltext(params.row.description);
    setOpenViewModal(true);
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSelection = (ids) => {
    setFilters(captureFilterIds(ids));
    setSelectedRows(ids);
  };

  const router = useRouter();
  const handleEditClick = (id) => {
    router.push(`/main/tasksclassifier/${id}`);
  };

  useEffect(() => {
    getGridData(mode);
  }, [dependentFilter, loaded]);

  useEffect(() => {
    getGridData(mode);
    setCols(columns);
    switch (collection + mode) {
      case "tasks2simple":
        setShowhidetool(tasks.showhidetool);
        setCols([
          tasks["columns"][1],
          {
            field: "actions",
            type: "actions",
            getActions: (params) => [
              <GridActionsCellItem
                label="Edit"
                icon={<EditIcon />}
                onClick={() => handleEditClick(params.id)}
              />,
              <GridActionsCellItem
                label="View"
                icon={<VisibilityOutlinedIcon />}
                onClick={() => handleViewClick(params)}
              />,
            ],
          },
        ]);
        break;
      case "classessimple":
        setShowhidetool(classes.showhidetool);
        setCols(classes.columns);
        break;
      case "myuserssimple":
        setShowhidetool(users.showhidetool);
        setCols(users.columns);
        break;
      case "tasks2dataInObject":
        setShowhidetool(variants.showhidetool);
        setCols(columns);
        break;
      case "testssimple":
        setShowhidetool(tests.showhidetool);
        setCols(tests.columns);
        break;
      default:
        console.log("Странно", columns);
    }
  }, []);

  return (
    <React.Fragment>
      <DataGrid
        sx={sx}
        editMode="row"
        rowModesModel={rowModesModel}
        checkboxSelection
        rows={rows}
        columns={cols}
        onRowSelectionModelChange={handleSelection}
        processRowUpdate={RowUpdate}
        onRowEditStop={handleRowEditStop}
        // onCellEditStart={handleCellEditStart}
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

      <ModalTS
        open={openViewModal}
        close={() => setOpenViewModal(false)}
        sx={{ height: "30%", width: "30%" }} >
          <Typography id="modal-modal-title" component="h2">
            {modaltext}
          </Typography>
      </ModalTS>

  
    </React.Fragment>
  );
}
