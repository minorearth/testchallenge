"use client";
import React from "react";
import { Button } from "@mui/material";
import { Classlist } from "./classlist";
import { useEffect, useState, useRef } from "react";


export default function Classes() {

  return (
    <div className="flex flex-row h-full p-4">
      <div className="flex-1">
        <Classlist />
      </div>
      <div className="flex-1 bg-slate-400"></div>
    </div>
  );
}
