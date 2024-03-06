"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Datagrid } from "../components/datagrid";
import { useState } from "react";

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

const taskscolumns = [
  { field: "id", headerName: "id", width: 270 },
  { field: "name", headerName: "Название", editable: true, width: 130 },
  { field: "generator", headerName: "Генератор", editable: true, width: 130 },
  { field: "function", headerName: "Функция", editable: true, width: 130 },
];

export default function RichObjectTreeView() {
  const [tasksFilters, setTasksFilters] = useState([]);

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Box sx={{ minHeight: 110, flexGrow: 1 }}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </TreeView>
      <Datagrid
        collection="tasks2"
        keyfield="name"
        columns={taskscolumns}
        checkduplic={false}
        // dependentFilter={tasksFilters}
        dependentFilter="none"
        setFilters={() => {}}
      />
    </Box>
  );
}
