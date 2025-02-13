"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const steps = [
  {
    label: "Personal Information",
    fields: [
      { name: "first_name", label: "First Name" },
      { name: "last_name", label: "Last Name" },
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "address", label: "Address" },
      { name: "country", label: "Country" },
      { name: "city", label: "City" },
      { name: "state", label: "State" },
    ],
  },
  {
    label: "Parental Information",
    fields: [
      { name: "father_name", label: "Father's Name" },
      { name: "mother_name", label: "Mother's Name" },
      { name: "father_email", label: "Father's Email" },
      { name: "mother_email", label: "Mother's Email" },
      { name: "father_phone", label: "Father's Phone" },
      { name: "mother_phone", label: "Mother's Phone" },
    ],
  },
];

const FormExample = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    state: "",
    father_name: "",
    mother_name: "",
    father_email: "",
    mother_email: "",
    father_phone: "",
    mother_phone: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      city: "",
      state: "",
      father_name: "",
      mother_name: "",
      father_email: "",
      mother_email: "",
      father_phone: "",
      mother_phone: "",
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                {step.fields.map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <TextField
                      fullWidth
                      label={field.label}
                      variant="outlined"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mb: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - here's your submitted data:</Typography>
          {Object.keys(formData).map((key) => (
            <Typography key={key}>
              <strong>{key.replace("_", " ").toUpperCase()}:</strong> {formData[key]}
            </Typography>
          ))}
          <Button onClick={handleReset} sx={{ mt: 2 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default FormExample;
