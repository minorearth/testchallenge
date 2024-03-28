const data = {
  id: "root",
  name: "Информатика",
  children: [
    {
      id: "0",
      name: "Не классиффицированные",
    },
    {
      id: "1",
      name: "Логика",
    },
    {
      id: "2",
      name: "Теория информации",
      children: [
        {
          id: "21",
          name: "Кодирование изображений",
        },
        {
          id: "22",
          name: "Кодирование звука",
        },
      ],
    },
    {
      id: "3",
      name: "Теория алгоритмов",
      children: [
        {
          id: "31",
          name: "Динамическое программирование",
        },
        {
          id: "32",
          name: "Рекурсия",
        },
      ],
    },
  ],
};

const findTheNodebyID = (node, id) => {
  let result = {};
  const findNodeById = (node, id) => {
    if (node.id == id) {
      result = node;
      return;
    } else {
      if (Array.isArray(node.children)) {
        node.children.forEach((node) => findNodeById(node, id));
      } else return;
    }
  };
  findNodeById(node, id);
  return result;
};

const extractDesentLeafs = (node) => {
  let ids = [];
  const extractLeafsIds = (node) => {
    if (Array.isArray(node.children)) {
      node.children.forEach((node) => extractLeafsIds(node));
    } else {
      ids = [...ids, node.id];
    }
  };
  extractLeafsIds(node);
  return ids;
};


//ex.  n-number of tasks to allocate, length-folders  num   n<length 
export  const neverRepeat = (length, n) => {
  let res = [];
  while (res.length != n) {
    const  num = Math.floor(Math.random() * length);
    !res.includes(num) && (res = [...res, num]);
  }
  return res;
};

//ex.  n-number of tasks to allocate, length-folders  num   n<length 
export  const randomVal = (length) => {
    return Math.floor(Math.random() * length);
};

const prepareAllocationData = (leafNum, total) => {
  const  remainder = total % leafNum;
  const base = Math.floor(total / leafNum);
  const a = Array(leafNum).fill(base);
  neverRepeat(leafNum, remainder).forEach((item) => (a[item] += 1));
  return a;
};

export const allocateTasks = (folderTree, NodeId, taskNum) => {
  const ids = extractDesentLeafs(findTheNodebyID(folderTree, NodeId));
  const  allocation = prepareAllocationData(ids.length, taskNum);
  return ids.reduce(
    (acc, item, id) => ({ ...acc, [item]: allocation[id] }),
    {}
  );
};
