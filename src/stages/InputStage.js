// --- src/stages/InputStage.js ---

import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    Box,
    FormHelperText,
    Typography,
    FormLabel,
    InputAdornment // Import for input icons/text
} from '@mui/material';
// Import Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For title

// --- Constants for Select Options ---
// Defined outside component for clarity and potential reuse
const maritalStatus = ['Single', 'Married', 'Widower', 'Divorced', 'Facto union', 'Legally separated'];

const applicationModes = [
  '1st phase - general contingent',
  'Ordinance No. 612/93',
  '1st phase - special contingent (Azores Island)',
  'Holders of other higher courses',
  'Ordinance No. 854-B/99',
  'International student (bachelor)',
  '1st phase - special contingent (Madeira Island)',
  '2nd phase - general contingent',
  '3rd phase - general contingent',
  'Ordinance No. 533-A/99, item b2) (Different Plan)',
  'Ordinance No. 533-A/99, item b3 (Other Institution)',
  'Over 23 years old',
  'Transfer',
  'Change of course',
  'Technological specialization diploma holders',
  'Change of institution/course',
  'Short cycle diploma holders',
  'Change of institution/course (International)'
];

const courses = [
  'Biofuel Production Technologies',
  'Animation and Multimedia Design',
  'Social Service (evening attendance)',
  'Agronomy',
  'Communication Design',
  'Veterinary Nursing',
  'Informatics Engineering',
  'Equinculture',
  'Management',
  'Social Service',
  'Tourism',
  'Nursing',
  'Oral Hygiene',
  'Advertising and Marketing Management',
  'Journalism and Communication',
  'Basic Education',
  'Management (evening attendance)'
];

const attendance = ['Daytime', 'Evening'];

const previousQualifications = [
  'Secondary education',
  "Higher education - bachelor's degree",
  'Higher education - degree',
  "Higher education - master's",
  'Higher education - doctorate',
  'Frequency of higher education',
  '12th year of schooling - not completed',
  '11th year of schooling - not completed',
  'Other - 11th year of schooling',
  '10th year of schooling',
  '10th year of schooling - not completed',
  'Basic education 3rd cycle (9th/10th/11th year) or equiv.',
  'Basic education 2nd cycle (6th/7th/8th year) or equiv.',
  'Technological specialization course',
  'Higher education - degree (1st cycle)',
  'Professional higher technical course',
  'Higher education - master (2nd cycle)'
];

const nationalities = [
  'Portuguese', 'German', 'Spanish', 'Italian', 'Dutch', 'English', 'Lithuanian',
  'Angolan', 'Cape Verdean', 'Guinean', 'Mozambican', 'Santomean', 'Turkish',
  'Brazilian', 'Romanian', 'Moldova (Republic of)', 'Mexican', 'Ukrainian',
  'Russian', 'Cuban', 'Colombian'
];

const motherQualifications = [
  'Secondary Education - 12th Year of Schooling or Eq.',
  "Higher Education - Bachelor's Degree",
  'Higher Education - Degree',
  "Higher Education - Master's",
  'Higher Education - Doctorate',
  'Frequency of Higher Education',
  '12th Year of Schooling - Not Completed',
  '11th Year of Schooling - Not Completed',
  '7th Year (Old)',
  'Other - 11th Year of Schooling',
  '10th Year of Schooling',
  'General commerce course',
  'Basic Education 3rd Cycle (9th/10th/11th Year) or Equiv.',
  'Technical-professional course',
  '7th year of schooling',
  '2nd cycle of the general high school course',
  '9th Year of Schooling - Not Completed',
  '8th year of schooling',
  'Unknown',
  "Can't read or write",
  'Can read without having a 4th year of schooling',
  'Basic education 1st cycle (4th/5th year) or equiv.',
  'Basic Education 2nd Cycle (6th/7th/8th Year) or Equiv.',
  'Technological specialization course',
  'Higher education - degree (1st cycle)',
  'Specialized higher studies course',
  'Professional higher technical course',
  'Higher Education - Master (2nd cycle)',
  'Higher Education - Doctorate (3rd cycle)'
];

const fatherQualifications = [
  'Secondary Education - 12th Year of Schooling or Eq.',
  "Higher Education - Bachelor's Degree",
  'Higher Education - Degree',
  "Higher Education - Master's",
  'Higher Education - Doctorate',
  'Frequency of Higher Education',
  '12th Year of Schooling - Not Completed',
  '11th Year of Schooling - Not Completed',
  '7th Year (Old)',
  'Other - 11th Year of Schooling',
  '2nd year complementary high school course',
  '10th Year of Schooling',
  'General commerce course',
  'Basic Education 3rd Cycle (9th/10th/11th Year) or Equiv.',
  'Complementary High School Course',
  'Technical-professional course',
  'Complementary High School Course - not concluded',
  '7th year of schooling',
  '2nd cycle of the general high school course',
  '9th Year of Schooling - Not Completed',
  '8th year of schooling',
  'General Course of Administration and Commerce',
  'Supplementary Accounting and Administration',
  'Unknown',
  "Can't read or write",
  'Can read without having a 4th year of schooling',
  'Basic education 1st cycle (4th/5th year) or equiv.',
  'Basic Education 2nd Cycle (6th/7th/8th Year) or Equiv.',
  'Technological specialization course',
  'Higher education - degree (1st cycle)',
  'Specialized higher studies course',
  'Professional higher technical course',
  'Higher Education - Master (2nd cycle)',
  'Higher Education - Doctorate (3rd cycle)'
];

const motherOccupations = [
    'Student',
    'Representatives of the Legislative Power and Executive Bodies, Directors, Directors and Executive Managers',
    'Specialists in Intellectual and Scientific Activities',
    'Intermediate Level Technicians and Professions',
    'Administrative staff',
    'Personal Services, Security and Safety Workers and Sellers',
    'Farmers and Skilled Workers in Agriculture, Fisheries and Forestry',
    'Skilled Workers in Industry, Construction and Craftsmen',
    'Installation and Machine Operators and Assembly Workers',
    'Unskilled Workers',
    'Armed Forces Professions',
    'Other Situation',
    '(blank)',
    'Health professionals',
    'Teachers',
    'Specialists in information and communication technologies (ICT)',
    'Intermediate level science and engineering technicians and professions',
    'Technicians and professionals, of intermediate level of health',
    'Intermediate level technicians from legal, social, sports, cultural and similar services',
    'Office workers, secretaries in general and data processing operators',
    'Data, accounting, statistical, financial services and registry-related operators',
    'Other administrative support staff',
    'Personal service workers',
    'Sellers',
    'Personal care workers and the like',
    'Skilled construction workers and the like, except electricians',
    'Skilled workers in printing, precision instrument manufacturing, jewelers, artisans and the like',
    'Workers in food processing, woodworking, clothing and other industries and crafts',
    'Cleaning workers',
    'Unskilled workers in agriculture, animal production, fisheries and forestry',
    'Unskilled workers in extractive industry, construction, manufacturing and transport',
    'Meal preparation assistants'
  ];
  
  const fatherOccupations = [
    'Student',
    'Representatives of the Legislative Power and Executive Bodies, Directors, Directors and Executive Managers',
    'Specialists in Intellectual and Scientific Activities',
    'Intermediate Level Technicians and Professions',
    'Administrative staff',
    'Personal Services, Security and Safety Workers and Sellers',
    'Farmers and Skilled Workers in Agriculture, Fisheries and Forestry',
    'Skilled Workers in Industry, Construction and Craftsmen',
    'Installation and Machine Operators and Assembly Workers',
    'Unskilled Workers',
    'Armed Forces Professions',
    'Other Situation',
    '(blank)',
    'Armed Forces Officers',
    'Armed Forces Sergeants',
    'Other Armed Forces personnel',
    'Directors of administrative and commercial services',
    'Hotel, catering, trade and other services directors',
    'Specialists in the physical sciences, mathematics, engineering and related techniques',
    'Health professionals',
    'Teachers',
    'Specialists in finance, accounting, administrative organization, public and commercial relations',
    'Intermediate level science and engineering technicians and professions',
    'Technicians and professionals, of intermediate level of health',
    'Intermediate level technicians from legal, social, sports, cultural and similar services',
    'Information and communication technology technicians',
    'Office workers, secretaries in general and data processing operators',
    'Data, accounting, statistical, financial services and registry-related operators',
    'Other administrative support staff',
    'Personal service workers',
    'Sellers',
    'Personal care workers and the like',
    'Protection and security services personnel',
    'Market-oriented farmers and skilled agricultural and animal production workers',
    'Farmers, livestock keepers, fishermen, hunters and gatherers, subsistence',
    'Skilled construction workers and the like, except electricians',
    'Skilled workers in metallurgy, metalworking and similar',
    'Skilled workers in electricity and electronics',
    'Workers in food processing, woodworking, clothing and other industries and crafts',
    'Fixed plant and machine operators',
    'Assembly workers',
    'Vehicle drivers and mobile equipment operators',
    'Unskilled workers in agriculture, animal production, fisheries and forestry',
    'Unskilled workers in extractive industry, construction, manufacturing and transport',
    'Meal preparation assistants',
    'Street vendors (except food) and street service providers'
  ];
  

const campuses = ['Main Campus', 'North Campus', 'Online', 'South Campus', 'City Campus'];
const majors = ['Computer Science', 'Business Administration', 'Psychology', 'Engineering', 'Arts & Humanities'];
const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const parentEducationLevels = [
    "Did not complete High School",
    "High School Diploma or GED",
    "Some College, no degree",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree (PhD, EdD)",
    "Professional Degree (MD, JD, etc.)"
];

// --- Input Stage Component ---
// Uses `forwardRef` to allow the parent component (App.js) to call methods defined in `useImperativeHandle`.
// Manages the student information form using `react-hook-form`.
const InputStage = forwardRef(({ initialData }, ref) => {
    // Default values are useful for development and testing
    const defaultTestValues = {
        marital: 'Single',
        campus: 'Main Campus',
        major: 'Computer Science',
        gender: 'Female',
        age: '21', // RHF expects string initially for TextField type=number
        gpa: '3.5', // RHF expects string initially
        attendanceRate: '92',
        orgMembership: 'Yes',
        lmsClearanceRate: '88',
        parentsIncome: '75000',
        parentsEducation: "Bachelor's Degree",
        disabilityStatus: 'No',
        scholarshipStatus: 'Yes',
    };

    // --- React Hook Form Setup ---
    const {
        control, // Connects inputs to the form state
        formState: { errors }, // Contains validation errors
        trigger, // Function to manually trigger validation for all fields
        getValues, // Function to get current form values
        reset      // Function to reset the form state
    } = useForm({
        mode: 'onBlur', // Validate fields when they lose focus
        // Use initialData if passed (e.g., navigating back), otherwise use test defaults
        defaultValues: initialData || defaultTestValues,
    });

    // --- Expose Methods to Parent (App.js) via Ref ---
    // This allows App.js to trigger validation and get data from this component.
    useImperativeHandle(ref, () => ({
        // Function to trigger validation for all fields
        triggerValidation: async () => {
            const result = await trigger(); // Trigger validation for all fields
            console.log("Input Stage Validation Result:", result);
            return result; // Returns true if all fields are valid, false otherwise
        },
        // Function to get the current form data
        getFormData: () => {
            return getValues(); // Return all current form values
        },
        // Function to reset the form to its default state
        resetForm: () => {
            // Reset form to initial defaults (or provided initialData if available)
            reset(initialData || defaultTestValues);
        }
    }));

    // --- Helper Function ---
    // Renders MenuItem components for Select dropdowns
    const renderMenuItems = (options) =>
        options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ));

    // --- Component Render ---
    return (
        // Use Box as the form container for layout flexibility
        <Box component="form" noValidate>
            {/* --- Stage Title --- */}
            <Typography variant="h6" gutterBottom sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                {/* ADDED: Icon for visual anchor */}
                <AccountCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
                Student Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Fill in the information below. Default values are provided for testing.
            </Typography>

            {/* Grid container for responsive form layout */}
            {/* Consistent spacing between grid items */}
            <Grid container spacing={2.5}>

                 {/* --- Group 1: Basic Information --- */}
                 {/* ADDED: Subheading for logical grouping */}
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ mt: 1, mb: 0 }}>Demographic Data</Typography>
                </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth error={!!errors.marital}>
                        <InputLabel id="marital-label">Marital Status</InputLabel>
                        <Controller
                        name="marital"
                        control={control}
                        rules={{ required: 'Marital status is required' }}
                        render={({ field }) => (
                            <Select
                            labelId="marital-label"       
                            id="marital"                  
                            label="Marital Status"    
                            variant="outlined"         
                            {...field}
                            >
                            {renderMenuItems(maritalStatus)}
                            </Select>
                        )}
                        />
                        <FormHelperText>{errors.marital?.message || ' '}</FormHelperText>
                    </FormControl>
                    </Grid>
                {/* Nationality */}
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth error={!!errors.major}>
                        <InputLabel id="nationality-label">Nationality</InputLabel>
                        <Controller
                            name="major"
                            control={control}
                            rules={{ required: 'Major is required' }}
                             render={({ field }) => (
                                <Select labelId="major-label" label="Major" {...field}>
                                    {renderMenuItems(majors)}
                                </Select>
                            )}
                        />
                        <FormHelperText>{errors.major?.message || ' '}</FormHelperText>
                    </FormControl>
                </Grid>

                {/* Gender */}
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Controller
                            name="gender"
                            control={control}
                            rules={{ required: 'Gender is required' }}
                            render={({ field }) => (
                                <Select labelId="gender-label" label="Gender" {...field}>
                                    {renderMenuItems(genders)}
                                </Select>
                            )}
                         />
                        <FormHelperText>{errors.gender?.message || ' '}</FormHelperText>
                    </FormControl>
                </Grid>

                 {/* Age */}
                <Grid item xs={12} sm={6} md={4}>
                    <Controller
                        name="age"
                        control={control}
                         rules={{
                            required: 'Age is required',
                            min: { value: 15, message: 'Min age 15' },
                            max: { value: 99, message: 'Max age 99' },
                            pattern: { value: /^[0-9]+$/, message: 'Whole number only' }
                         }}
                        render={({ field }) => (
                            <TextField {...field} label="Age" type="number" fullWidth error={!!errors.age} helperText={errors.age?.message || ' '} />
                        )}
                     />
                </Grid>


                 {/* --- Group 2: Academic Profile --- */}
                 {/* ADDED: Subheading for logical grouping */}
                 {/* <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 0 }}>Academic Profile</Typography>
                </Grid> */}

                {/* GPA */}
                <Grid item xs={12} sm={6} md={4}>
                    <Controller
                        name="gpa"
                        control={control}
                        rules={{
                            required: 'GPA is required', valueAsNumber: true,
                            min: { value: 0.0, message: 'Min 0.00' },
                            max: { value: 4.0, message: 'Max 4.00' },
                            pattern: { value: /^(?:[0-3](?:\.\d{1,2})?|4(?:\.0{1,2})?|[0-4])$/, message: 'Format: 0.00-4.00' }
                        }}
                        render={({ field }) => (
                            <TextField {...field} label="Accum. GPA" type="number" fullWidth inputProps={{ step: "0.01" }} error={!!errors.gpa} helperText={errors.gpa?.message || ' '} />
                        )}
                    />
                </Grid>

                {/* Attendance Rate */}
                <Grid item xs={12} sm={6} md={4}>
                    <Controller
                        name="attendanceRate"
                        control={control}
                        rules={{
                            required: 'Required', valueAsNumber: true,
                            min: { value: 0, message: 'Min 0%' },
                            max: { value: 100, message: 'Max 100%' },
                            pattern: { value: /^[0-9]+$/, message: 'Whole number only' }
                        }}
                        render={({ field }) => (
                            <TextField {...field} label="Attendance Rate" type="number" fullWidth error={!!errors.attendanceRate} helperText={errors.attendanceRate?.message || ' '}
                                // ADDED: Input adornment for visual cue
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                            />
                        )}
                    />
                </Grid>

                {/* LMS Clearance Rate */}
                 <Grid item xs={12} sm={6} md={4}>
                    <Controller
                        name="lmsClearanceRate"
                        control={control}
                         rules={{
                            required: 'Required', valueAsNumber: true,
                            min: { value: 0, message: 'Min 0%' },
                            max: { value: 100, message: 'Max 100%' },
                            pattern: { value: /^[0-9]+$/, message: 'Whole number only' }
                         }}
                        render={({ field }) => (
                            <TextField {...field} label="LMS Task Clearance" type="number" fullWidth error={!!errors.lmsClearanceRate} helperText={errors.lmsClearanceRate?.message || ' '}
                                // ADDED: Input adornment for visual cue
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                            />
                        )}
                     />
                </Grid>


                 {/* --- Group 3: Background Information --- */}
                 {/* ADDED: Subheading for logical grouping */}
                 <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 0 }}>Background Information</Typography>
                </Grid>

                {/* Parents' Income */}
                <Grid item xs={12} sm={6} md={4}>
                    <Controller
                        name="parentsIncome"
                        control={control}
                        rules={{
                            required: 'Required', valueAsNumber: true,
                            min: { value: 0, message: 'Cannot be negative' },
                            pattern: { value: /^[0-9]+$/, message: 'Whole number only' }
                        }}
                        render={({ field }) => (
                            <TextField {...field} label="Parents' Income (Annual)" type="number" fullWidth error={!!errors.parentsIncome} helperText={errors.parentsIncome?.message || ' '}
                                // Optional Adornment:
                                // InputProps={{
                                //     startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                // }}
                             />
                        )}
                     />
                </Grid>

                {/* Parents' Education */}
                <Grid item xs={12} sm={6} md={8}> {/* Wider field */}
                    <FormControl fullWidth error={!!errors.parentsEducation}>
                        <InputLabel id="parents-education-label">Parents' Highest Education</InputLabel>
                        <Controller
                            name="parentsEducation"
                            control={control}
                            rules={{ required: 'Required' }}
                             render={({ field }) => (
                                <Select labelId="parents-education-label" label="Parents' Highest Education" {...field}>
                                    {renderMenuItems(parentEducationLevels)}
                                </Select>
                            )}
                         />
                        <FormHelperText>{errors.parentsEducation?.message || ' '}</FormHelperText>
                    </FormControl>
                </Grid>

                {/* --- Radio Groups Section --- */}
                {/* Uses nested Grid container for layout */}
                <Grid item xs={12} container spacing={2.5} sx={{ mt: 0.5 }}> {/* Reduced top margin */}
                    {/* Campus Organization Membership */}
                     <Grid item xs={12} sm={4}>
                        {/* Use FormLabel for accessible group labeling */}
                        <FormControl component="fieldset" error={!!errors.orgMembership} sx={{ width: '100%' }}>
                            <FormLabel component="legend" sx={{ mb: 0, fontSize: '0.875rem' }}>Campus Org Member?</FormLabel>
                            <Controller name="orgMembership" control={control} rules={{ required: 'Selection is required' }} render={({ field }) => (
                                <RadioGroup row {...field}>
                                    {/* Consistent small size for radio buttons */}
                                    <FormControlLabel value="Yes" control={<Radio size="small"/>} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio size="small"/>} label="No" />
                                </RadioGroup>
                            )}
                            />
                             {/* Optional: Show explicit helper text for radios if needed */}
                             {/* <FormHelperText error={!!errors.orgMembership}>{errors.orgMembership?.message || ' '}</FormHelperText> */}
                         </FormControl>
                     </Grid>

                     {/* Disability Status */}
                     <Grid item xs={12} sm={4}>
                        <FormControl component="fieldset" error={!!errors.disabilityStatus} sx={{ width: '100%' }}>
                            <FormLabel component="legend" sx={{ mb: 0, fontSize: '0.875rem' }}>Registered Disability?</FormLabel>
                            <Controller name="disabilityStatus" control={control} rules={{ required: 'Selection is required' }} render={({ field }) => (
                                <RadioGroup row {...field}>
                                    <FormControlLabel value="Yes" control={<Radio size="small"/>} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio size="small"/>} label="No" />
                                </RadioGroup>
                            )}
                            />
                            {/* <FormHelperText error={!!errors.disabilityStatus}>{errors.disabilityStatus?.message || ' '}</FormHelperText> */}
                         </FormControl>
                     </Grid>

                     {/* Scholarship Status */}
                     <Grid item xs={12} sm={4}>
                        <FormControl component="fieldset" error={!!errors.scholarshipStatus} sx={{ width: '100%' }}>
                            <FormLabel component="legend" sx={{ mb: 0, fontSize: '0.875rem' }}>Receiving Scholarship?</FormLabel>
                            <Controller name="scholarshipStatus" control={control} rules={{ required: 'Selection is required' }} render={({ field }) => (
                                <RadioGroup row {...field}>
                                    <FormControlLabel value="Yes" control={<Radio size="small"/>} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio size="small"/>} label="No" />
                                </RadioGroup>
                            )}
                            />
                            {/* <FormHelperText error={!!errors.scholarshipStatus}>{errors.scholarshipStatus?.message || ' '}</FormHelperText> */}
                         </FormControl>
                     </Grid>
                 </Grid> {/* End Radio Groups Section Grid */}

            </Grid> {/* End Main Form Grid */}
        </Box>
    );
});

export default InputStage;