import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

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

export const Tree = ({ setSelected }) => {

  const handleNodeSelection = (e, ids) => {
    console.log(e)

    setSelected({'id': ids});
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handleNodeSelection}
    >
      {renderTree(data)}
    </TreeView>
  );
};
