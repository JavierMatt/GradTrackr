// --- src/stages/ResultStage.js ---

import React, { useState } from 'react';
import {
    Box,
    CircularProgress,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    alpha // Import alpha for background tints
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // **** IMPORT useTheme hook ****
// Import Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // For Accordion
import AssessmentIcon from '@mui/icons-material/Assessment'; // For Title
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For 'On Track' status
import WarningIcon from '@mui/icons-material/Warning'; // For 'At Risk' status
// Ensure Gauge and gaugeClasses are imported if using MUI X Charts
// Make sure @mui/x-charts is installed: npm install @mui/x-charts
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

// --- Helper Function ---
// Formats camelCase or snake_case keys into Title Case labels for display.
const formatLabel = (key) => {
    if (!key) return '';
    // Add space before caps (for camelCase) and replace underscores with spaces
    const spaced = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
    // Capitalize the first letter and return
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

// --- Helper Function ---
// Determines the color for the Gauge chart based on the probability value.
// ***** MODIFIED: Now accepts theme object *****
const getGaugeColor = (value, theme) => {
    if (value === null || value === undefined) return theme.palette.grey[400]; // Grey if no value
    if (value < 65) return theme.palette.error.main; // Red (at risk)
    // Use warning color if defined in palette, otherwise fallback
    if (value < 80) return theme.palette.warning?.main || '#ffa000';
    return theme.palette.success.main; // Green (on track)
};


// --- Result Stage Component ---
// Displays the prediction result, loading/error states, and submitted data.
function ResultStage({ isLoading, error, predictionResult, formData, selectedModelName }) {
    // State to control the expansion of the submitted data accordion
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
    // **** ADDED: Get the theme object using the hook ****
    const theme = useTheme();

    // --- Conditional Rendering ---

    // 1. Loading State
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 250, textAlign: 'center', p: 3 }}>
                <CircularProgress size={60} />
                <Typography mt={2.5} variant="h6" color="text.secondary">
                    Generating Prediction...
                </Typography>
            </Box>
        );
    }

    // 2. Error State (Error passed from App.js, displayed via Alert there)
    // Show a simple message here only if there's an error AND no result has been loaded.
    if (error && !predictionResult) {
        return (
            <Box sx={{ textAlign: 'center', p: 2, minHeight: 250 }}>
                 <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                     Prediction Result
                 </Typography>
                {/* Error message is displayed globally in App.js via Alert */}
                <Typography color="error" sx={{ my: 4 }}>
                     Could not retrieve prediction. Please check the details or try again later.
                     {/* Optionally display specific error: {error} */}
                </Typography>
            </Box>
        );
    }

    // 3. Waiting State (or state after navigating back before running simulation again)
    // Shown if not loading, no error preventing display, but no result data yet.
    if (!predictionResult) {
         return (
            <Box sx={{ textAlign: 'center', p: 2, minHeight: 250 }}>
                 <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                     Prediction Result
                 </Typography>
                <Typography color="text.secondary" sx={{ my: 4 }}>
                    Prediction results will appear here once calculated.
                </Typography>
            </Box>
         );
    }

    // --- 4. Main Result Display ---
    // Shown when loading is finished, no overriding error, and predictionResult exists.
    const statusColor = predictionResult.prediction === 'On Track' ? 'success.main' : 'error.main';
    const StatusIcon = predictionResult.prediction === 'On Track' ? CheckCircleIcon : WarningIcon;

    return (
        <Box sx={{ textAlign: 'center', p: { xs: 1, sm: 2 } }}>
             {/* --- Stage Title --- */}
             <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                 Prediction Result
             </Typography>

            {/* --- Prediction Text and Gauge Area --- */}
            {/* MaxWidth centers the content and prevents it from becoming too wide */}
            <Box sx={{ maxWidth: 500, margin: '0 auto', mb: 4 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center" >
                     {/* Status Text */}
                    <Grid item xs={12} sm={7}>
                        <Typography variant="h5" component="div" sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left'}, display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start'} }}>
                             {/* ADDED: Status Icon */}
                            <StatusIcon sx={{ mr: 1, fontSize: '2rem', color: statusColor }} />
                             Status: <Box component="span" sx={{ fontWeight: 'bold', color: statusColor, ml: 0.5 }}>
                                 {predictionResult.prediction}
                             </Box>
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: { xs: 'center', sm: 'left'} }}>
                             Based on the {selectedModelName || 'selected model'}.
                         </Typography>
                    </Grid>

                     {/* Gauge Chart */}
                    <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: { xs: 2, sm: 0 } }}>
                        <Gauge
                            width={150}
                            height={150}
                            value={predictionResult.probability}
                            valueMin={0}
                            valueMax={100}
                            startAngle={-110}
                            endAngle={110}
                            // Use theme access function for sx prop to get palette colors
                            // **** NO CHANGE NEEDED HERE - this syntax correctly provides theme ****
                            sx={(gaugeTheme) => ({ // Renamed internal variable to avoid confusion with hook's theme
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 30,
                                    transform: 'translate(0px, 0px)',
                                    fontWeight: 'bold',
                                    // Pass theme from sx prop scope to helper
                                    fill: getGaugeColor(predictionResult.probability, gaugeTheme),
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                     // Pass theme from sx prop scope to helper
                                    fill: getGaugeColor(predictionResult.probability, gaugeTheme),
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: gaugeTheme.palette.grey[200], // Use theme from sx prop scope
                                },
                            })}
                            // Display only the percentage value inside the gauge
                            text={`${predictionResult.probability}%`}
                        />
                         {/* Separate label below the gauge */}
                        <Typography variant="caption" component="div" sx={{ mt: -1, color: 'text.secondary' }}>
                             Graduation Probability
                         </Typography>
                    </Grid>
                 </Grid>
             </Box>

             {/* --- ADDED: Contextual Next Steps Box --- */}
             <Box sx={{
                 maxWidth: 600,
                 margin: '1.5rem auto 2.5rem auto', // Adjusted margins
                 p: 2,
                 // **** FIXED: Access theme directly via useTheme hook ****
                 bgcolor: alpha(theme.palette.grey[500], 0.05), // Light grey background
                 borderRadius: theme.shape.borderRadius,        // Use theme from hook
                 border: `1px solid ${alpha(theme.palette.grey[500], 0.1)}` // Use theme from hook
             }}>
                 <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Next Steps:</Typography>
                 {predictionResult.prediction === 'On Track' ? (
                     <Typography variant="body2" color="text.secondary">
                         Keep up the great work! Continue engaging with course materials and consider exploring campus resources like career services or advanced workshops to further enhance your journey.
                     </Typography>
                 ) : (
                     <Typography variant="body2" color="text.secondary">
                         Consider reaching out to your academic advisor to discuss strategies for improvement. Explore resources such as tutoring centers, study groups, or time management workshops available on campus.
                     </Typography>
                 )}
             </Box>


            {/* --- Accordion for Submitted Data --- */}
            {/* Only show if formData exists */}
            {formData && (
                <Box sx={{ maxWidth: 600, margin: '0 auto' }}> {/* Centered accordion */}
                 <Accordion
                    expanded={isAccordionExpanded}
                    onChange={() => setIsAccordionExpanded(!isAccordionExpanded)}
                    // Uses theme styles defined in App.js for flat look
                 >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="submitted-data-content"
                        id="submitted-data-header"
                    >
                        {/* Use slightly bolder text for the summary title */}
                        <Typography variant="subtitle1" fontWeight="medium">Review Submitted Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        // Uses theme styles defined in App.js
                    >
                        {/* Display data in a single readable column */}
                        <Grid container spacing={1}> {/* Reduced spacing for denser list */}
                            {/* Iterate through formData entries */}
                            {Object.entries(formData).map(([key, value]) => (
                                // Only render if value is not null or empty string
                                (value !== null && value !== '') && (
                                    <Grid item xs={12} key={key}> {/* Force single column */}
                                        {/* Use flexbox to align label and value */}
                                        <Typography variant="body2" component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
                                             {/* Make the label slightly bolder */}
                                            <Box component="span" sx={{ fontWeight: 'medium', mr: 1, color: 'text.primary' }}>{formatLabel(key)}:</Box>
                                            <Box component="span" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                                                {/* Handle boolean display explicitly */}
                                                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                )
                            ))}
                        </Grid>
                    </AccordionDetails>
                 </Accordion>
                 </Box>
            )}

            {/* Start Over button is handled globally in App.js */}
        </Box>
    );
}

export default ResultStage;