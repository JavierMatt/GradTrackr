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
// Icons
import CategoryIcon from '@mui/icons-material/Category'; // Section title
import CalculateIcon from '@mui/icons-material/Calculate'; // Naive Bayes
import FlashOnIcon from '@mui/icons-material/FlashOn'; // LightGBM
import AutoGraphIcon from '@mui/icons-material/AutoGraph'; // CatBoost
import ForestIcon from '@mui/icons-material/Forest'; // Random Forest

// --- Model Definitions ---
const models = [
    {
        id: 'nb',
        name: 'Naive Bayes',
        description: 'A simple, fast probabilistic classifier assuming feature independence.',
        stats: 'Accuracy: ~82%, Speed: Very Fast',
        icon: <CalculateIcon />,
    },
    {
        id: 'lgbm',
        name: 'LightGBM',
        description: 'Gradient boosting framework by Microsoft, optimized for speed and performance.',
        stats: 'Accuracy: ~89%, Speed: Fast',
        icon: <FlashOnIcon />,
    },
    {
        id: 'catboost',
        name: 'CatBoost',
        description: 'Yandex-developed gradient boosting with built-in categorical support.',
        stats: 'Accuracy: ~90%, Speed: Moderate',
        icon: <AutoGraphIcon />,
    },
    {
        id: 'rf',
        name: 'Random Forest',
        description: 'Ensemble of decision trees using bagging for robust classification.',
        stats: 'Accuracy: ~88%, Speed: Moderate',
        icon: <ForestIcon />,
    }
];

function ModelSelectionStage({ selectedModel, onSelectModel }) {
    const handleChange = (eventOrModelId) => {
        let modelId;
        if (typeof eventOrModelId === 'string') {
            modelId = eventOrModelId;
        } else if (eventOrModelId?.target) {
            modelId = eventOrModelId.target.value;
        } else {
            console.error("Invalid model selection event:", eventOrModelId);
            return;
        }

        const model = models.find((m) => m.id === modelId);
        if (model) {
            onSelectModel(model);
        } else {
            console.warn("Model not found:", modelId);
            onSelectModel(null);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                Select Prediction Model
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Choose a model to analyze the student's data. Click on a card or its radio button.
            </Typography>

            <RadioGroup
                aria-label="model-selection"
                name="model-selection-group"
                value={selectedModel ? selectedModel.id : ''}
                onChange={handleChange}
            >
                <Grid container spacing={3} alignItems="stretch">
                    {models.map((model) => (
                        <Grid item xs={12} md={6} key={model.id} sx={{ display: 'flex' }}>
                            <Card
                                variant="outlined"
                                ownerState={{ selected: selectedModel?.id === model.id }}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleChange(model.id)}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'stretch',
                                        justifyContent: 'space-between',
                                        flexGrow: 1,
                                        p: 0,
                                    }}
                                >
                                    <CardHeader
                                        avatar={React.cloneElement(model.icon, { sx: { color: 'primary.main' } })}
                                        action={
                                            <Radio
                                                checked={selectedModel?.id === model.id}
                                                value={model.id}
                                                name="model-selection-group"
                                                size="small"
                                                inputProps={{ 'aria-label': model.name }}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={handleChange}
                                                sx={{ mr: 1, mt: 0.5 }}
                                            />
                                        }
                                        title={model.name}
                                        titleTypographyProps={{ variant: 'subtitle1' }}
                                        sx={{ pt: 2, pb: 0, width: '100%' }}
                                    />
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
