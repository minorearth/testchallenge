import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = ["Выберите задачу", "Отредактируйте", "Конец"];

export function HorizontalLinearStepper({step}) {
  // const router = useRouter();
  // const [activeStep, setActiveStep] = useState(1);
  // const handleNext = () => {
    
  //   const taslkId='Hh4p7wQiJVLT3xBmdOXy'
  //   router.push(`/main/tasksclassifier/${taslkId}`);
  //   // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  return (
    <Box sx={{ width: "100%", my: 5 }}>
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* <Button onClick={handleNext}>
        Редактировать
      </Button>
    */}
    </Box>
  );
}
