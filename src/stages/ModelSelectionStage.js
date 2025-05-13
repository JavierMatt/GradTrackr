// --- src/stages/ModelSelectionStage.js ---

import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    RadioGroup,
    Radio,
    Grid,
    CardActionArea,
} from '@mui/material';
// Import Icons
import CategoryIcon from '@mui/icons-material/Category'; // For title
import AccountTreeIcon from '@mui/icons-material/AccountTree'; // For Decision Tree
import CalculateIcon from '@mui/icons-material/Calculate'; // For Naive Bayes
import HubIcon from '@mui/icons-material/Hub'; // For SVM (representing network/connections)
import FunctionsIcon from '@mui/icons-material/Functions'; // For Logistic Regression

// --- Model Definitions ---
// Array containing information and icons for each available prediction model.
const models = [
    {
        id: 'dt',
        name: 'Decision Tree',
        description: 'A simple, interpretable model that splits data based on feature values. Good for understanding decision paths.',
        stats: 'Accuracy: ~88%, Speed: Fast',
        icon: <AccountTreeIcon />, // ADDED: Icon for this model
    },
    {
        id: 'nb',
        name: 'Naive Bayes Classifier',
        description: 'A probabilistic classifier assuming feature independence. Works well with high-dimensional data.',
        stats: 'Accuracy: ~82%, Speed: Very Fast',
        icon: <CalculateIcon />, // ADDED: Icon for this model
    },
    {
        id: 'svm',
        name: 'Support Vector Machine',
        description: 'Effective in high-dimensional spaces, finds optimal hyperplane to separate classes.',
        stats: 'Accuracy: ~85%, Speed: Moderate',
        icon: <HubIcon />, // ADDED: Icon for this model
    },
    {
        id: 'lr',
        name: 'Logistic Regression',
        description: 'A linear model for binary classification, estimates probabilities using a logistic function.',
        stats: 'Accuracy: ~84%, Speed: Fast',
        icon: <FunctionsIcon />, // ADDED: Icon for this model
    }
];

// --- Model Selection Stage Component ---
// Displays available prediction models as interactive cards.
// Uses MUI Card, CardActionArea, and RadioGroup for selection.
// Styling for selected state is handled by theme overrides in App.js based on `ownerState`.
function ModelSelectionStage({ selectedModel, onSelectModel }) {

    // --- Event Handler ---
    // Handles selection changes from either clicking the CardActionArea or the Radio button itself.
    const handleChange = (eventOrModelId) => {
        let modelId;
        // Determine if the event came from the Radio button (event.target.value)
        // or the CardActionArea (passed modelId directly)
        if (typeof eventOrModelId === 'string') {
             modelId = eventOrModelId; // Clicked CardActionArea
        } else if (eventOrModelId && eventOrModelId.target) {
             modelId = eventOrModelId.target.value; // Clicked Radio
        } else {
            console.error("Could not determine model ID from change event:", eventOrModelId);
            return; // Exit if model ID cannot be determined
        }

        // Find the full model object based on the selected ID
        const model = models.find(m => m.id === modelId);
        if (model) {
            onSelectModel(model); // Pass the full model object up to App.js state
        } else {
            console.error("Selected model not found for ID:", modelId);
            onSelectModel(null); // Clear selection if model not found
        }
    };

    // --- Component Render ---
    return (
        <Box>
            {/* --- Stage Title --- */}
            <Typography variant="h6" gutterBottom sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                 {/* ADDED: Icon for visual anchor */}
                <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                 Select Prediction Model
            </Typography>
             <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                 Choose a model to analyze the student's data. Click on a card or its radio button.
             </Typography>

            {/* --- Model Cards --- */}
            {/* Use RadioGroup to manage the single selection state across cards */}
            <RadioGroup
                aria-label="model-selection"
                name="model-selection-group"
                value={selectedModel ? selectedModel.id : ''} // Control the selected radio based on state from App.js
                onChange={handleChange} // Handle selection changes
            >
                {/* Grid container ensures responsive layout and alignment */}
                {/* alignItems="stretch" makes cards in the same row equal height */}
                <Grid container spacing={3} alignItems="stretch">
                    {models.map((model) => (
                        // Grid item defines responsive width for each card
                        <Grid item xs={12} md={6} key={model.id} sx={{ display: 'flex' }}> {/* Ensure grid item stretches */}
                            {/* Card component uses theme overrides for styling (border, background based on selection) */}
                            <Card
                                variant="outlined"
                                // Pass selected state to Card for theme styling override via ownerState
                                ownerState={{ selected: selectedModel?.id === model.id }}
                                sx={{
                                    width: '100%', // Card fills grid item width
                                    height: '100%', // Card fills grid item height
                                    display: 'flex', // Use flex for CardActionArea growth
                                    flexDirection: 'column',
                                }}
                            >
                                {/* CardActionArea makes the entire card clickable */}
                                <CardActionArea
                                    onClick={() => handleChange(model.id)} // Pass model ID directly on card click
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'stretch', // Stretch content horizontally
                                        justifyContent: 'space-between', // Push header/content apart vertically
                                        flexGrow: 1, // Allow area to fill the card
                                        p: 0 // Remove default padding, handled by Header/Content
                                    }}
                                >
                                    {/* CardHeader contains title, icon, and radio button */}
                                    <CardHeader
                                        // ADDED: Avatar using the model's icon
                                        avatar={React.cloneElement(model.icon, { sx: { color: 'primary.main'} })}
                                        action={ // Radio button positioned in the action slot
                                            <Radio
                                                checked={selectedModel?.id === model.id}
                                                value={model.id} // Value used by RadioGroup onChange
                                                name="model-selection-group" // Ensures radio buttons are grouped
                                                size="small" // Consistent small size
                                                inputProps={{ 'aria-label': model.name }}
                                                // Prevent CardActionArea click when clicking radio directly
                                                onClick={(e) => e.stopPropagation()}
                                                // Explicit onChange here ensures clicks *exactly* on the radio work
                                                // (though RadioGroup onChange should also capture it)
                                                onChange={handleChange}
                                                sx={{ mr: 1, mt: 0.5 }} // Adjust position slightly
                                            />
                                        }
                                        title={model.name}
                                        titleTypographyProps={{ variant: 'subtitle1' }} // Use slightly smaller title
                                        sx={{ pt: 2, pb: 0, width: '100%' }} // Adjust padding & ensure full width
                                    />
                                    {/* CardContent contains description and stats */}
                                    <CardContent sx={{ pt: 1, flexGrow: 1, width: '100%' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                            {model.description}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            <i>Example Stats:</i> {model.stats}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </RadioGroup>
        </Box>
    );
}

export default ModelSelectionStage;