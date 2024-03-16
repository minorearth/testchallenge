
export const makeEmptyRowData = (columns) => {
    return columns
      .filter((item) => item.field != "id")
      .reduce((acc, item) => ({ ...acc, [item.field]: "Не указано" }), {});
  };

  export const splitFile = (text) => {
    return text
      .split("\n")
      .join("\r")
      .split("\r")
      .filter((item) => item != "");
  };

  export const captureFilterIdsF = (ids,rows) => {
    return rows
      .filter((item) => ids.includes(item.id))
      .map((item) => ({ id: item.id }));
  };


  export const makeDataFromCSSLine = (line,columns,dependentFilter) => {
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