import {
  addDocInCollectionByValue,
  deleteAllDocsInCollectionByIds,
  getDataFromCollection,
  updateDocInCollectionById,
  addDocInCollection,
} from "../../../datamodel";

export const useDatagrid = (
  collection,
  selectedRows,
  setLoaded,
  columns,
  setRows,
  dependentFilter,
  checkduplic,
  keyfield,
  rows
) => {
  const deleteRows = () => {
    deleteAllDocsInCollectionByIds(collection, selectedRows).then(
      setLoaded((state) => !state)
    );
  };

  const RowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    updateDocInCollectionById(collection, newRow.id, newRow);
    return updatedRow;
  };

  const makeEmptyRowData = () => {
    return columns
      .filter((item) => item.field != "id")
      .reduce((acc, item) => ({ ...acc, [item.field]: "Не указано" }), {});
  };

  const addrow = () => {
    const data = makeEmptyRowData();
    addDocInCollection(collection, data).then((doc) => {
      setRows((oldRows) => [{ id: doc.id, ...data }, ...oldRows]);
    });
  };

  const makeDataFromCSSLine = (line) => {
    const items = line.split(";");
    let cols = columns
      .filter((item) => item.field != "id")
      .reduce(
        (acc, item, id) => ({
          ...acc,
          [item["field"]]: items[id] == undefined ? "Не указано" : items[id],
        }),
        {}
      );

    //fulfill data with external key for dependent tables only
    cols = {
      ...cols,
      extid:
        dependentFilter[0].id == undefined
          ? "Не указано"
          : dependentFilter[0].id,
      keyfield:
        dependentFilter[0].keyfield == undefined
          ? "Не указано"
          : dependentFilter[0].keyfield,
    };
    return cols;
  };

  const makeDocsFromCSSLines = (lines) => {
    lines.forEach((item) => {
      const datas = makeDataFromCSSLine(item);
      addDocInCollectionByValue(
        collection,
        keyfield,
        item.split(";")[0],
        datas,
        setLoaded,
        checkduplic
      );
    });

    // return columns
    //   .filter((item) => item.field != "id")
    //   .reduce((acc, item) => ({ ...acc, [item.field]: "Не указано" }), {});
  };

  const splitFile = (text) => {
    return text
      .split("\n")
      .join("\r")
      .split("\r")
      .filter((item) => item != "");
  };
  const uploadDataFromCss = async (file) => {
    const fileUrl = URL.createObjectURL(file);
    const response = await fetch(fileUrl);
    const text = await response.text();
    const values = splitFile(text);
    makeDocsFromCSSLines(values);
    // fileUpload.current.value = null;
  };
  // interface GridFilter {
  //   id: string;
  // }
  // interface GridFilters {
  //   ids: GridFilter[];
  // }
  const captureFilterIds = (ids) => {
    return rows
      .filter((item) => ids.includes(item.id))
      .map((item) => ({ id: item.id }));
  };

  const getGridData = () => {
    getDataFromCollection(collection, dependentFilter).then((docs) => {
      console.log(docs);
      let ret = [];
      docs.forEach((item) => {
        {
          const data = item.data();
          ret = [...ret, { id: item.id, ...data }];
        }
      });
      setRows(ret);
    });
  };

  return [
    deleteRows,
    addrow,
    uploadDataFromCss,
    RowUpdate,
    captureFilterIds,
    getGridData,
  ];
};
