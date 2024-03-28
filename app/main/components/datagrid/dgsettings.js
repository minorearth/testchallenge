export const classes = {
  showhidetool: {
    delete: true,
    copy: false,
    edittask: false,
    edittest: false,
    csvload: true,
    add: true,
    move: false,
    openTestSelected: false,
    saveTest: false,
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
    copy: false,
    edittask: false,
    edittest: false,
    csvload: false,
    add: false,
    move: false,
    openTestSelected: false,
    saveTest: false,
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
    delete: false,
    copy: true,
    edittask: true,
    edittest: false,
    csvload: false,
    add: false,
    move: true,
    openTestSelected: true,
    saveTest: false,
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

export const createTest = {
  showhidetool: {
    delete: true,
    copy: false,
    edittask: false,
    edittest: false,
    csvload: false,
    add: false,
    move: false,
    openTestSelected: false,
    saveTest: true,
  },

  columns: [
    { field: "id", headerName: "id", width: 270 },
    // {
    //   field: "testname",
    //   headerName: "Название",
    //   editable: true,
    //   width: 130,
    // },
    { field: "taskname", headerName: "Задача", editable: false, width: 230 },
    { field: "folder", headerName: "Папка", editable: false, width: 230 },
    { field: "type", headerName: "Тип", editable: false, width: 130 },
    { field: "tasks", headerName: "Задачи", editable: false, width: 130 },
    { field: "allocation", headerName: "Выборка", editable: false, width: 130 },
    
    { field: "qty", headerName: "Количество", editable: true, width: 130 },
  ],
};

export const tests = {
  showhidetool: {
    delete: false,
    copy: false,
    edittask: false,
    edittest: true,
    csvload: false,
    add: false,
    move: false,
    openTestSelected: false,
    saveTest: false,
  },

  columns: [
    { field: "id", headerName: "id", width: 70 },
    { field: "name", headerName: "Название", editable: true, width: 270 },
    { field: "content", headerName: "Контент", editable: true, width: 270 },
    
  ],
};

export const variants = {
  showhidetool: {
    delete: true,
    copy: false,
    edittask: false,
    edittest: false,
    csvload: false,
    add: false,
    move: false,
    openTestSelected: false,
    saveTest: false,
  },
};
