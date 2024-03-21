import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import MailIcon from "@mui/icons-material/Mail";

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

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    hasChildren,
    setPickedForTest,
    ...other
  } = props;

  const styleProps = {
    "--tree-view-color":
      theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color":
      theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
    marginLeft: "15px",
  };

  const handleClick = (e) => {
    
    setPickedForTest('value')
    e.stopPropagation()
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0,
          }}
        >
          {hasChildren && (
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          )}
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
          <Button onClick={(e) => handleClick(e,props)}>В тест</Button>
        </Box>
      }
      style={styleProps}
      {...other}
      ref={ref}
    />
  );
});

export const Tree = ({ setSelected, sx,setPickedForTest }) => {
  // console.log(setSelected)
  // 

  const handleNodeSelection = (e, ids) => {

    setSelected([{ id: ids }]);
  };

  const handleNodeS = (state) => {

    setPickedForTest(state)
  };

  // const renderTree = (nodes) => (
  //   <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} >
  //     {Array.isArray(nodes.children)
  //       ? nodes.children.map((node) => renderTree(node))
  //       : null}
  //   </TreeItem>
  // );

  const renderTree = (nodes,setPickedForTest) => {
    // <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
    const hasChildren = Array.isArray(nodes.children);

    return (
      <StyledTreeItem
        key={nodes.id}
        hasChildren={hasChildren}
        nodeId={nodes.id}
        labelText={nodes.name}
        labelIcon={MailIcon}
        setPickedForTest={handleNodeS}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </StyledTreeItem>
    );
  };

  return (
    <TreeView
      sx={sx}
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={(e, ids) => handleNodeSelection(e, ids)}
    >
      {renderTree(data,setPickedForTest)}
    </TreeView>
  );
};
