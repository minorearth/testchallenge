import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Global } from "@emotion/react";

export function SwipeableEdgeDrawer({ state, toggleDrawer }) {
  const list = () => (
    <Box
      sx={{ top:0,left:0,width: "300px",height:"100px", backgroundColor: "green" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    ></Box>
  );

  return (
    <React.Fragment>
      {/* <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            width: `calc(30% - 1px)`,
            overflow: "visible",
          },
        }}
      /> */}

      <Drawer  anchor="right" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
