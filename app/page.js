"use client";
import { BrowserRouter } from "react-router-dom";

import MiniDrawer from "./miniDrawer";
import { TaskProps } from "./components/taskprops";
import { Classes } from "./components/classes";
import { Route, Routes, Link } from "react-router-dom";

export default function Home() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="*" component={<TaskProps />} />
          <Route path="generator" component={<TaskProps />} />
        </Routes>
        {/* <MiniDrawer /> */}
      </>
    </BrowserRouter>
  );
}
