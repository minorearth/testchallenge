import {
  addMultipledDocsInCollectionByValue,
  deleteAllDocsInCollectionByIds,
  getDataFromCollection,
  updateDocInCollectionById,
  addDocInCollection,
  getDocFromCollectionById,
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
}) => {
  const deleteRows = () => {
    deleteAllDocsInCollectionByIds(collection, selectedRows).then(() =>
      setLoaded((state) => !state)
    );
  };

  const RowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    updateDocInCollectionById(collection, newRow.id, newRow);
    return updatedRow;
  };

  const addrow = () => {
    const data = makeEmptyRowData(cols);
    addDocInCollection(collection, data).then((doc) => {
      setRows((oldRows) => [{ id: doc.id, ...data }, ...oldRows]);
    });
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

  const getGridData = (mode) => {
    mode != "dataInObject"
      ? getDataFromCollection(collection, dependentFilter).then((docs) => {
          setRows(docs);
        })
      : getDocFromCollectionById(collection, dependentFilter[0].id).then(
          (res) => {
            if (res.length != 0) {
              res.variants != undefined && setRows(res.variants);
            }
          }
        );
  };

  return {
    deleteRows,
    addrow,
    uploadDataFromCss,
    RowUpdate,
    captureFilterIds,
    getGridData,
  };
};
