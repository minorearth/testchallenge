export const classes = {
  showhidetool: {
    delete: false,
    copy: "none",
    edittask: "none",
    edittest: "none",
    csvload: false,
    add: false,
    move: "none",
    openTestSelected:"none"
  },

  columns: [
    { field: "id", headerName: "id", width: 270 },
    {
      field: "classname",
      headerName: "Мои классы",
      editable: true,
      width: 130,
    },
    { field: "school", headerName: "Школа", editable: true, width: 130 },
    { field: "keyfield", headerName: "keyfield", editable: true, width: 130 },
    { field: "extid", headerName: "extid", editable: true, width: 130 },
  ],
};

export const users = {
  showhidetool: {
    delete: true,
    copy: "none",
    edittask: "none",
    edittest: "none",
    csvload: false,
    add: false,
    move: "none",
    openTestSelected:"none"
  },

  columns: [
    { field: "id", headerName: "id", width: 270 },
    { field: "username", headerName: "ФИО", editable: true, width: 330 },
    { field: "login", headerName: "Логин", editable: true, width: 130 },
    { field: "psw", headerName: "Пароль", editable: true, width: 130 },
    { field: "keyfield", headerName: "keyfield", editable: true, width: 130 },
    { field: "extid", headerName: "extid", editable: true, width: 130 },
  ],
};

export const tasks = {
  showhidetool: {
    delete: "none",
    copy: true,
    edittask: true,
    edittest: "none",
    csvload: "none",
    add: "none",
    move: true,
    openTestSelected:true
  },

  columns: [
    { field: "id", headerName: "id", width: 270 },
    {
      field: "description",
      headerName: "Название",
      editable: true,
      width: 430,
    },
    { field: "generator", headerName: "Генератор", editable: true, width: 130 },
    { field: "function", headerName: "Функция", editable: true, width: 130 },
    { field: "variants", headerName: "Варианты", editable: true, width: 130 },
  ],
};

export const tests = {
  showhidetool: {
    delete: false,
    copy: "none",
    edittask: "none",
    edittest: true,
    csvload: "none",
    add: false,
    move: "none",
    openTestSelected:"none"
  },

  columns: [
    { field: "id", headerName: "id", width: 270 },
    {
      field: "testname",
      headerName: "Название",
      editable: true,
      width: 130,
    },
    { field: "tasks", headerName: "Задачи", editable: true, width: 130 },
    { field: "groups", headerName: "Группы задач", editable: true, width: 130 },
  ],
};

export const variants = {
  showhidetool: {
    delete: true,
    copy: "none",
    edittask: "none",
    edittest: "none",
    csvload: false,
    add: false,
    move: "none",
    openTestSelected:"none"
  },
};
