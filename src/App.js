// --- src/App.js ---

import React, { useState, useRef, useCallback } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  alpha,
  Divider,
} from "@mui/material";
// Import Icons
import SchoolIcon from "@mui/icons-material/School"; // For main title

// Assuming components are in a 'stages' subfolder
import InputStage from "./stages/InputStage";
import ModelSelectionStage from "./stages/ModelSelectionStage";
import ResultStage from "./stages/ResultStage";
import encodeFeatures from "./utils/encodeFeatures";
// --- Define constants used in theme BEFORE theme creation ---
const BORDER_RADIUS = 8;

// --- Theme Setup (Refined & Enhanced) ---
// This theme defines the overall look and feel using Material UI's theming capabilities.
// Overrides are provided for specific components to ensure consistency.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // MUI default blue
    },
    secondary: {
      main: "#673ab7", // Deep Purple
    },
    background: {
      default: "#f4f6f8", // Light grey body
      paper: "#ffffff", // White Paper components
    },
    text: {
      primary: "#212121", // Darker primary text
      secondary: "#757575", // Grey secondary text
    },
    success: {
      main: "#2e7d32", // Darker green for success
    },
    error: {
      main: "#d32f2f", // Standard MUI red
    },
    // Define a lighter primary for subtle backgrounds if needed
    primaryLight: {
      main: alpha("#1976d2", 0.05), // Very light primary tint
      border: alpha("#1976d2", 0.1), // Subtle primary border
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14, // Default MUI font size
    h4: {
      fontWeight: 700,
      marginBottom: "0.5rem", // Adjusted for space below title
      color: "#1a237e", // Dark blue title color
      // Centering applied locally via `align` prop where needed
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
      color: "#333", // Slightly darker subtitle color
    },
    subtitle1: {
      // Style for the intro text
      fontSize: "1.1rem",
      lineHeight: 1.6,
      color: "#424242",
    },
    subtitle2: {
      // Added for form section subheadings
      fontWeight: 600,
      fontSize: "0.95rem",
      color: "#555",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#555",
    },
    caption: {
      color: "#757575",
    },
  },
  shape: {
    borderRadius: BORDER_RADIUS,
  },
  components: {
    // --- Global Styles & Scrollbar ---
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: alpha("#000000", 0.05),
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: alpha("#000000", 0.2),
            minHeight: 24,
            border: "1px solid " + alpha("#000000", 0.1),
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: alpha("#000000", 0.3),
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: alpha("#000000", 0.3),
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: alpha("#000000", 0.3),
            },
        },
      },
    },
    // --- Stepper Visuals ---
    MuiStepper: {
      styleOverrides: {
        root: {
          paddingTop: "24px",
          paddingBottom: "24px",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": {
            color: "#1976d2", // Primary color
          },
          "&.Mui-completed": {
            color: "#2e7d32", // Success color (green)
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: 500,
          "&.Mui-active": {
            fontWeight: 700, // Bold active label
          },
          "&.Mui-completed": {
            fontWeight: 500,
          },
        },
      },
    },
    // --- Form Element Defaults for Consistency ---
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        margin: "normal",
        size: "small", // Consistent small size
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
        margin: "dense", // Use dense margin for selects usually inside FormControl
        size: "small", // Match TextField size
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "normal", // Normal margin for the whole control
        size: "small", // Match TextField size
      },
    },
    // --- Button Styles ---
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Keep button text case as is
          fontWeight: 600,
          padding: "8px 22px", // Good padding
          boxShadow: "none", // Flatter look initially
          // Optional softer radius: borderRadius: BORDER_RADIUS * 1.5,
          "&:hover": {
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)", // Subtle shadow on hover
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: alpha("#1976d2", 0.85), // Slightly darken primary on hover
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px", // Keep border width consistent
            backgroundColor: alpha("#000000", 0.04), // Subtle hover for outlined
          },
        },
        containedSecondary: {
          "&:hover": {
            backgroundColor: alpha("#673ab7", 0.85), // Slightly darken secondary on hover
          },
        },
      },
    },
    // --- Paper/Card Base Styles ---
    MuiPaper: {
      defaultProps: {
        elevation: 2, // INCREASED: Slightly more elevation for presence
      },
      styleOverrides: {
        root: {
          border: `1px solid ${alpha("#000000", 0.08)}`, // Subtle border
          backgroundColor: "#ffffff", // Ensure paper background is white
        },
      },
    },
    // --- Model Selection Card Styles (Interactive) ---
    MuiCard: {
      defaultProps: {
        elevation: 0, // Keep cards initially flat relative to Paper bg
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          // Use function syntax to access theme and ownerState (passed from component)
          border: `1px solid ${
            ownerState.selected
              ? theme.palette.primary.main
              : alpha("#000000", 0.12)
          }`,
          borderWidth: ownerState.selected ? 2 : 1, // Thicker border when selected
          boxShadow: "none", // Ensure no shadow on cards themselves
          transition: theme.transitions.create(
            ["border-color", "box-shadow", "background-color", "transform"],
            {
              // Added transform
              duration: theme.transitions.duration.short,
            }
          ),
          backgroundColor: ownerState.selected
            ? alpha(theme.palette.primary.main, 0.05)
            : theme.palette.background.paper, // Subtle background tint when selected
          "&:hover": {
            borderColor: theme.palette.primary.light, // Indicate hover with border color change
            backgroundColor: ownerState.selected
              ? alpha(theme.palette.primary.main, 0.08)
              : alpha("#000000", 0.02), // Slightly darker background on hover
            // Optional: Slight lift on hover
            // transform: 'translateY(-2px)',
            // boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
          },
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontWeight: 600, // Bolder card titles
        },
      },
    },
    // --- Result Accordion Styles ---
    MuiAccordion: {
      defaultProps: {
        elevation: 0, // Flat accordion
        disableGutters: true, // Remove spacing around accordion
      },
      styleOverrides: {
        root: {
          border: `1px solid ${alpha("#000000", 0.1)}`, // Subtle border
          "&:not(:last-child)": {
            borderBottom: 0, // Avoid double borders
          },
          "&:before": {
            // Remove internal separator line
            display: "none",
          },
          "&.Mui-expanded": {
            // Ensure margin is 0 when expanded
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#000000", 0.03), // Light grey background for summary
          minHeight: 48, // Standard height
          "&.Mui-expanded": {
            // Keep minimum height when expanded
            minHeight: 48,
          },
        },
        content: {
          "&.Mui-expanded": {
            // Ensure margin is consistent when expanded
            margin: "12px 0",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "16px", // Standard padding (theme.spacing(2))
          backgroundColor: "#ffffff", // White background for details
        },
      },
    },
    // --- Alert Style ---
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS, // Use defined border radius
        },
      },
    },
  },
});

// Define the steps for the Stepper component
const steps = ["Student Information", "Select Model", "View Prediction"];

// --- Main Application Component ---
function App() {
  // --- State Variables ---
  const [activeStep, setActiveStep] = useState(0); // Current step index
  const [formData, setFormData] = useState(null); // Data from InputStage
  const [selectedModel, setSelectedModel] = useState(null); // Model selected in ModelSelectionStage
  const [predictionResult, setPredictionResult] = useState(null); // Result from simulation
  const [isLoading, setIsLoading] = useState(false); // Loading state for simulation
  const [error, setError] = useState(null); // General/Simulation error message
  const [modelSelectionError, setModelSelectionError] = useState(null); // Specific error for model selection step

  // Ref to access InputStage methods (validation, getting data)
  const inputStageRef = useRef();

  // --- Simulation Logic ---
  // Simulates calling a prediction API. Wrapped in useCallback for potential performance optimization.
 const runSimulation = useCallback(async (data, model) => {
  setIsLoading(true);
  setError(null);
  setPredictionResult(null);

  try {
    // First encode the data with the selected model
    const encodedData = encodeFeatures(data, model?.id);
    console.log("Encoded data for API:", encodedData);

    const response = await fetch("http://localhost:3000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(encodedData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Server error: ${response.status}`
      );
    }

    const result = await response.json();
    setPredictionResult({
      ...result,
      modelUsed: model?.name || 'Unknown Model' // Store which model was used
    });
  } catch (e) {
    console.error("Prediction error:", e);
    setError(e.message || "An unexpected error occurred during prediction.");
  } finally {
    setIsLoading(false);
  }
}, []);

// Update your handleNext function
const handleNext = async () => {
  setError(null);
  setModelSelectionError(null);

  if (activeStep === 0) {
    if (inputStageRef.current) {
      const isValid = await inputStageRef.current.triggerValidation();
      if (isValid) {
        const data = inputStageRef.current.getFormData();
        setFormData(data);
        setActiveStep(prev => prev + 1);
      } else {
        setError("Please fill all required fields correctly.");
      }
    }
    return;
  }

  if (activeStep === 1) {
    if (!selectedModel) {
      setModelSelectionError("Please select a model before proceeding.");
      return;
    }

    try {
      await runSimulation(formData, selectedModel);
      setActiveStep(prev => prev + 1);
    } catch (err) {
      console.error("Prediction error:", err);
      // Error is already set in runSimulation
    }
  }
};

  // Handles moving to the previous step
  const handleBack = () => {
    setError(null); // Clear errors
    setModelSelectionError(null);
    if (activeStep === 2) {
      // If going back from results
      setPredictionResult(null); // Clear results
      setIsLoading(false); // Ensure loading is off
    }
    setActiveStep((prev) => prev - 1); // Move back one step
  };

  // Handles resetting the entire process
  const handleReset = () => {
    setActiveStep(0); // Back to first step
    setFormData(null); // Clear saved form data
    setSelectedModel(null); // Clear selected model
    setPredictionResult(null); // Clear prediction result
    setIsLoading(false); // Reset loading state
    setError(null); // Clear errors
    setModelSelectionError(null);
    // Reset the form fields in InputStage using the ref, if the method exists
    if (inputStageRef.current?.resetForm) {
      inputStageRef.current.resetForm();
    }
  };

  // --- Step Content Renderer ---
  // Dynamically renders the content based on the active step index
  const getStepContent = (step) => {
    switch (step) {
      case 0: // Input Stage
        // Pass initialData (might be null or previous data) and the ref
        return <InputStage ref={inputStageRef} initialData={formData} />;
      case 1: // Model Selection Stage
        return (
          <ModelSelectionStage
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            // Error handled globally via Alert, no need to pass 'modelSelectionError' here
          />
        );
      case 2: // Result Stage
        return (
          <ResultStage
            isLoading={isLoading}
            error={error} // Pass general error (displayed within ResultStage or globally)
            predictionResult={predictionResult}
            formData={formData}
            selectedModelName={selectedModel?.name} // Pass model name for display
          />
        );
      default:
        return <Typography>Unknown step</Typography>; // Fallback for invalid step index
    }
  };

  // --- Component Render ---
  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Apply the defined theme */}
      <CssBaseline /> {/* Apply baseline styles & custom scrollbar */}
      {/* Main content container with responsive top/bottom margins */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{ mt: { xs: 2, sm: 4 }, mb: 6 }}
      >
        {/* --- Application Header --- */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
          }}
        >
          {/* ADDED: Icon for visual anchor */}
          <SchoolIcon
            sx={{
              mr: 1.5,
              fontSize: { xs: "2rem", sm: "2.5rem" },
              color: "primary.main",
            }}
          />
          GradTrackr: Student Performance Prediction
        </Typography>

        {/* --- Introductory Text Section --- */}
        {/* ADDED: Box with subtle background for visual separation */}
        <Box
          sx={{
            bgcolor: "primaryLight.main", // Use light primary from theme
            p: { xs: 2, sm: 3 },
            mb: 4, // Adjusted margin
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.primaryLight.border}`, // Use subtle primary border
          }}
        >
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ maxWidth: "800px", margin: "0 auto" }}
          >
            A student performance prediction platform that uses Naive Bayes and
            Decision Tree models to analyze key factors impacting academic
            success. It helps universities and students determine if they are on
            track to graduate on time, offering data-driven insights to identify
            those who may need additional support. By providing clear forecasts,
            GradTrackr empowers proactive measures to ensure timely graduation.
          </Typography>
        </Box>

        {/* --- Stepper Navigation --- */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Divider for visual separation */}
        <Divider sx={{ mb: 4, mt: 2 }} />

        {/* --- Main Content Area (Paper) --- */}
        {/* This Paper component holds the content for the current step. */}
        {/* Increased elevation via theme override for more presence. */}
        <Paper
          sx={{
            p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            mt: 2,
            mb: 3,
            // Removed minHeight, allowing content and padding to define height
            display: "flex", // Use flexbox for vertical stacking
            flexDirection: "column",
          }}
        >
          {/* --- Error Alerts --- */}
          {/* Display Step-Specific Errors Above Content */}
          {modelSelectionError && activeStep === 1 && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {modelSelectionError}
            </Alert>
          )}
          {/* Display general errors on Result Stage if no prediction result is available */}
          {error && activeStep === 2 && !predictionResult && !isLoading && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* --- Dynamic Step Content --- */}
          {/* This Box grows to fill space within the Paper */}
          <Box sx={{ flexGrow: 1 }}>{getStepContent(activeStep)}</Box>
        </Paper>

        {/* --- Navigation Buttons Area --- */}
        {/* Uses flexbox to space buttons apart */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 3,
          }}
        >
          {/* Back Button Area (with placeholder for alignment when hidden) */}
          <Box sx={{ minWidth: "85px" }}>
            {" "}
            {/* Ensures consistent space */}
            {activeStep !== 0 && ( // Only show if not on the first step
              <Button
                onClick={handleBack}
                variant="outlined"
                // Disable back button if navigating back from results while a new prediction might be running (edge case)
                disabled={isLoading && activeStep === 2}
              >
                Back
              </Button>
            )}
          </Box>

          {/* Next / Predict / Start Over Button Area */}
          <Box>
            {/* Show Next/Predict button if not on the last step */}
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                // Disable if trying to run prediction (step 1 to 2) while loading
                disabled={activeStep === 1 && isLoading}
                // Show loading spinner inside button when running prediction
                startIcon={
                  activeStep === 1 && isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {activeStep === 0 ? "Next Step" : "Run Prediction"}
              </Button>
            )}
            {/* Show Start Over button only on the last step */}
            {activeStep === steps.length - 1 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReset}
              >
                Start Over
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
