"use client";
// import "../globals.css";
import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
import { HorizontalLinearStepper } from "./components/stepper";


// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  //   const theme = useTheme();

  return (
    <div className="flex-1">
      {/* <HorizontalLinearStepper /> */}

      {children}
    </div>
  );
}
