import {
  addMultipledDocsInCollectionByValue,
  deleteAllDocsInCollectionByIds,
  getDataFromCollection,
  updateDocInCollectionById,
  addDocInCollection,
  getDocFromCollectionById,
  copyDocInCollection,
} from "../../../datamodel";

import {
  makeDataFromCSSLine,
  splitFile,
  makeEmptyRowData,
  captureFilterIdsF,
} from "../../../utils";

export const useDatagrid = ({
  collection,
  selectedRows,
  setLoaded,
  cols,
  setRows,
  dependentFilter,
  checkduplic,
  keyfield,
  rows,
  mode,
  extRows,
  extRowsSetter,
}) => {
  const deleteRows = () => {
    switch (mode) {
      case "externalData":
        extRowsSetter(rows.filter((row) => !selectedRows.includes(row.id)));
        break;
      case "simple":
        deleteAllDocsInCollectionByIds(collection, selectedRows).then(() =>
          setLoaded((state) => !state)
        );
        break;
      default:
        break;
    }
  };

  const RowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    let updatedRows = rows.map((row) =>
      row.id === newRow.id ? updatedRow : row
    );
    switch (mode) {
      case "externalData":
        extRowsSetter(updatedRows);
        // setRows(updatedRows);
        break;
      case "simple":
        setRows(updatedRows);
        updateDocInCollectionById(collection, newRow.id, newRow);
        break;
      default:
        break;
    }
    return updatedRow;
  };

  const addTest = () => {
    addDocInCollection("tests", { name: "Новый тест", content: extRows });
  };

  const addrow = () => {
    const data = makeEmptyRowData(cols);
    addDocInCollection(collection, data).then((doc) => {
      setRows((oldRows) => [{ id: doc.id, ...data }, ...oldRows]);
    });
  };

  const copyrow = () => {
    switch (mode) {
      case "externalData":
        break;
      case "simple":
        copyDocInCollection(collection, selectedRows).then(() =>
          setLoaded((state) => !state)
        );
        break;
      default:
        break;
    }
  };

  const makeDocsFromCSSLines = async (file) => {
    const fileUrl = URL.createObjectURL(file);
    const response = await fetch(fileUrl);
    const text = await response.text();
    const lines = splitFile(text);
    return lines.map((item) =>
      makeDataFromCSSLine(item, columns, dependentFilter)
    );
  };

  const uploadDataFromCss = async (file) => {
    const data = await makeDocsFromCSSLines(file);
    addMultipledDocsInCollectionByValue(
      collection,
      keyfield,
      data,
      checkduplic
    ).then(() => setLoaded((state) => !state));
  };

  const captureFilterIds = (ids) => {
    return captureFilterIdsF(ids, rows);
  };

  const getGridData = () => {
    switch (mode) {
      case "dataInObject":
        getDocFromCollectionById(collection, dependentFilter[0].id).then(
          (res) => {
            if (res.length != 0) {
              res.variants != undefined && setRows(res.variants);
            }
          }
        );

        return;
      case "externalData":
        setRows(extRows);
        return;
      default:
        getDataFromCollection(collection, dependentFilter).then((docs) => {
          setRows(docs);
        });
    }
  };

  return {
    deleteRows,
    addrow,
    uploadDataFromCss,
    RowUpdate,
    captureFilterIds,
    getGridData,
    addTest,
    copyrow,
  };
};
