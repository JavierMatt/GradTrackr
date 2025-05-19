// --- src/stages/InputStage.js ---

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
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
  InputAdornment, // Import for input icons/text
} from "@mui/material";
// Import Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // For title

// --- Constants for Select Options ---
// Defined outside component for clarity and potential reuse
const maritalStatus = [
  "Single",
  "Married",
  "Widower",
  "Divorced",
  "Facto union",
  "Legally separated",
];

const courses = [
  "Biofuel Production Technologies",
  "Animation and Multimedia Design",
  "Social Service (evening attendance)",
  "Agronomy",
  "Communication Design",
  "Veterinary Nursing",
  "Informatics Engineering",
  "Equinculture",
  "Management",
  "Social Service",
  "Tourism",
  "Nursing",
  "Oral Hygiene",
  "Advertising and Marketing Management",
  "Journalism and Communication",
  "Basic Education",
  "Management (evening attendance)",
];

const attendanceModes = ["Daytime", "Evening"];

const previousQualifications = [
  "Secondary education",
  "Higher education - bachelor's degree",
  "Higher education - degree",
  "Higher education - master's",
  "Higher education - doctorate",
  "Frequency of higher education",
  "12th year of schooling - not completed",
  "11th year of schooling - not completed",
  "Other - 11th year of schooling",
  "10th year of schooling",
  "10th year of schooling - not completed",
  "Basic education 3rd cycle (9th/10th/11th year) or equiv.",
  "Basic education 2nd cycle (6th/7th/8th year) or equiv.",
  "Technological specialization course",
  "Higher education - degree (1st cycle)",
  "Professional higher technical course",
  "Higher education - master (2nd cycle)",
];

const motherQualifications = [
  "Secondary Education—12th Year of Schooling or Equivalent",
  "Higher Education—bachelor’s degree",
  "Higher Education—degree",
  "Higher Education—master’s degree",
  "Higher Education—doctorate",
  "Frequency of Higher Education",
  "12th Year of Schooling—not completed",
  "11th Year of Schooling—not completed",
  "7th Year (Old)",
  "Other—11th Year of Schooling",
  "2nd year complementary high school course",
  "10th Year of Schooling",
  "General commerce course",
  "Basic Education 3rd Cycle (9th/10th/11th Year) or Equivalent",
  "Complementary High School Course",
  "Technical-professional course",
  "Complementary High School Course—not concluded",
  "7th year of schooling",
  "2nd cycle of the general high school course",
  "9th Year of Schooling—not completed",
  "8th year of schooling",
  "General Course of Administration and Commerce",
  "Supplementary Accounting and Administration",
  "Unknown",
  "Cannot read or write",
  "Can read without having a 4th year of schooling",
  "Basic education 1st cycle (4th/5th year) or equivalent",
  "Basic Education 2nd Cycle (6th/7th/8th Year) or equivalent",
  "Technological specialization course",
  "Higher education—degree (1st cycle)",
  "Specialized higher studies course",
  "Professional higher technical course",
  "Higher Education—master’s degree (2nd cycle)",
  "Higher Education—doctorate (3rd cycle)",
];

const fatherQualifications = [
  "Secondary Education—12th Year of Schooling or Equivalent",
  "Higher Education—bachelor’s degree",
  "Higher Education—degree",
  "Higher Education—master’s degree",
  "Higher Education—doctorate",
  "Frequency of Higher Education",
  "12th Year of Schooling—not completed",
  "11th Year of Schooling—not completed",
  "7th Year (Old)",
  "Other—11th Year of Schooling",
  "2nd year complementary high school course",
  "10th Year of Schooling",
  "General commerce course",
  "Basic Education 3rd Cycle (9th/10th/11th Year) or Equivalent",
  "Complementary High School Course",
  "Technical-professional course",
  "Complementary High School Course—not concluded",
  "7th year of schooling",
  "2nd cycle of the general high school course",
  "9th Year of Schooling—not completed",
  "8th year of schooling",
  "General Course of Administration and Commerce",
  "Supplementary Accounting and Administration",
  "Unknown",
  "Cannot read or write",
  "Can read without having a 4th year of schooling",
  "Basic education 1st cycle (4th/5th year) or equivalent",
  "Basic Education 2nd Cycle (6th/7th/8th Year) or equivalent",
  "Technological specialization course",
  "Higher education—degree (1st cycle)",
  "Specialized higher studies course",
  "Professional higher technical course",
  "Higher Education—master’s degree (2nd cycle)",
  "Higher Education—doctorate (3rd cycle)",
];

const motherOccupations = [
  "Student",
  "Representatives of the Legislative Power and Executive Bodies, Directors, Directors and Executive Managers",
  "Specialists in Intellectual and Scientific Activities",
  "Intermediate Level Technicians and Professions",
  "Administrative staff",
  "Personal Services, Security and Safety Workers, and Sellers",
  "Farmers and Skilled Workers in Agriculture, Fisheries, and Forestry",
  "Skilled Workers in Industry, Construction, and Craftsmen",
  "Installation and Machine Operators and Assembly Workers",
  "Unskilled Workers",
  "Armed Forces Professions",
  "Other Situation",
  "(blank)",
  "Armed Forces Officers",
  "Armed Forces Sergeants",
  "Other Armed Forces personnel",
  "Directors of administrative and commercial services",
  "Hotel, catering, trade, and other services directors",
  "Specialists in the physical sciences, mathematics, engineering, and related techniques",
  "Health professionals",
  "Teachers",
  "Specialists in finance, accounting, administrative organization, and public and commercial relations",
  "Intermediate level science and engineering technicians and professions",
  "Technicians and professionals of intermediate level of health",
  "Intermediate level technicians from legal, social, sports, cultural, and similar services",
  "Information and communication technology technicians",
  "Office workers, secretaries in general, and data processing operators",
  "Data, accounting, statistical, financial services, and registry-related operators",
  "Other administrative support staff",
  "Personal service workers",
  "Sellers",
  "Personal care workers and the like",
  "Protection and security services personnel",
  "Market-oriented farmers and skilled agricultural and animal production workers",
  "Farmers, livestock keepers, fishermen, hunters and gatherers, and subsistence",
  "Skilled construction workers and the like, except electricians",
  "Skilled workers in metallurgy, metalworking, and similar",
  "Skilled workers in electricity and electronics",
  "Workers in food processing, woodworking, and clothing and other industries and crafts",
  "Fixed plant and machine operators",
  "Assembly workers",
  "Vehicle drivers and mobile equipment operators",
  "Unskilled workers in agriculture, animal production, and fisheries and forestry",
  "Unskilled workers in extractive industry, construction, manufacturing, and transport",
  "Meal preparation assistants",
  "Street vendors (except food) and street service providers",
];

const fatherOccupations = [
  "Student",
  "Representatives of the Legislative Power and Executive Bodies, Directors, Directors and Executive Managers",
  "Specialists in Intellectual and Scientific Activities",
  "Intermediate Level Technicians and Professions",
  "Administrative staff",
  "Personal Services, Security and Safety Workers and Sellers",
  "Farmers and Skilled Workers in Agriculture, Fisheries and Forestry",
  "Skilled Workers in Industry, Construction and Craftsmen",
  "Installation and Machine Operators and Assembly Workers",
  "Unskilled Workers",
  "Armed Forces Professions",
  "Other Situation",
  "(blank)",
  "Armed Forces Officers",
  "Armed Forces Sergeants",
  "Other Armed Forces personnel",
  "Directors of administrative and commercial services",
  "Hotel, catering, trade and other services directors",
  "Specialists in the physical sciences, mathematics, engineering and related techniques",
  "Health professionals",
  "Teachers",
  "Specialists in finance, accounting, administrative organization, public and commercial relations",
  "Intermediate level science and engineering technicians and professions",
  "Technicians and professionals, of intermediate level of health",
  "Intermediate level technicians from legal, social, sports, cultural and similar services",
  "Information and communication technology technicians",
  "Office workers, secretaries in general and data processing operators",
  "Data, accounting, statistical, financial services and registry-related operators",
  "Other administrative support staff",
  "Personal service workers",
  "Sellers",
  "Personal care workers and the like",
  "Protection and security services personnel",
  "Market-oriented farmers and skilled agricultural and animal production workers",
  "Farmers, livestock keepers, fishermen, hunters and gatherers, subsistence",
  "Skilled construction workers and the like, except electricians",
  "Skilled workers in metallurgy, metalworking and similar",
  "Skilled workers in electricity and electronics",
  "Workers in food processing, woodworking, clothing and other industries and crafts",
  "Fixed plant and machine operators",
  "Assembly workers",
  "Vehicle drivers and mobile equipment operators",
  "Unskilled workers in agriculture, animal production, fisheries and forestry",
  "Unskilled workers in extractive industry, construction, manufacturing and transport",
  "Meal preparation assistants",
  "Street vendors (except food) and street service providers",
];
// --- Input Stage Component ---
// Uses `forwardRef` to allow the parent component (App.js) to call methods defined in `useImperativeHandle`.
// Manages the student information form using `react-hook-form`.
const InputStage = forwardRef(({ initialData }, ref) => {
  // Default values are useful for development and testing
  const defaultTestValues = {
    maritalStatus: "Single",
    applicationOrder: 1,
    course: "Management",
    daytimeEveningAttendance: "Daytime",
    previousQualification: "Secondary education",
    mothersQualification:
      "Secondary Education—12th Year of Schooling or Equivalent",
    fathersQualification: "7th Year (Old)",
    mothersOccupation:
      "Installation and Machine Operators and Assembly Workers",
    fathersOccupation:
      "Installation and Machine Operators and Assembly Workers",
    displaced: "Yes",
    educationalSpecialNeeds: "No",
    tuitionFeesUpToDate: "Yes",
    gender: "Female",
    scholarshipHolder: "Yes",
    ageAtEnrollment: 20,
    firstSemCredited: 0,
    firstSemEnrolled: 6,
    firstSemEvaluations: 11,
    firstSemWithoutEvaluations:0,
    firstSemApproved: 4,
    firstSemGrade: 14,
    secondSemCredited: 0,
    secondSemEnrolled: 6,
    secondSemEvaluations: 12,
    secondSemWithoutEvaluations:0,
    secondSemApproved: 3,
    secondSemGrade: 11,
    unemploymentRate: 0,
    inflationRate: 9.4,
    gdp: -0.8,
  };

  // --- React Hook Form Setup ---
  const {
    control, // Connects inputs to the form state
    formState: { errors }, // Contains validation errors
    trigger, // Function to manually trigger validation for all fields
    getValues, // Function to get current form values
    reset, // Function to reset the form state
  } = useForm({
    mode: "onBlur", // Validate fields when they lose focus
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
    },
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
    <Box component="form" noValidate>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 1, display: "flex", alignItems: "center" }}
      >
        <AccountCircleIcon sx={{ mr: 1, color: "primary.main" }} />
        Student Details
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Fill in the information below. Default values are provided for testing.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Demographic Data</Typography>
        </Grid>

        {/** Marital Status */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={!!errors.maritalStatus}>
            <InputLabel id="marital-label">Marital Status</InputLabel>
            <Controller
              name="maritalStatus"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select
                  labelId="marital-label"
                  label="Marital Status"
                  {...field}
                >
                  {renderMenuItems(maritalStatus)}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.Marital_status?.message || " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/** Course */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={!!errors.Course}>
            <InputLabel id="course-label">Course</InputLabel>
            <Controller
              name="course"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select labelId="course-label" label="Course" {...field}>
                  {renderMenuItems(courses)}
                </Select>
              )}
            />
            <FormHelperText>{errors.Course?.message || " "}</FormHelperText>
          </FormControl>
        </Grid>

        {/** Daytime/Evening Attendance */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={!!errors.Daytime_evening_attendance}>
            <InputLabel id="attendance-label">Attendance</InputLabel>
            <Controller
              name="daytimeEveningAttendance"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select
                  labelId="attendance-label"
                  label="Attendance"
                  {...field}
                >
                  {renderMenuItems(attendanceModes)}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.Daytime_evening_attendance?.message || " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/** Previous Qualification */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={!!errors.Previous_qualification}>
            <InputLabel id="prevqual-label">Previous Qualification</InputLabel>
            <Controller
              name="previousQualification"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select
                  labelId="prevqual-label"
                  label="Previous Qualification"
                  {...field}
                >
                  {renderMenuItems(previousQualifications)}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.Previous_qualification?.message || " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/** Mother's Qualification */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={!!errors.mothersQualification}>
            <InputLabel id="motherqual-label">
              Mother's Qualification
            </InputLabel>
            <Controller
              name="mothersQualification"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select
                  labelId="motherqual-label"
                  label="Mother's Qualification"
                  {...field}
                >
                  {renderMenuItems(motherQualifications)}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.mothersQualification?.message || " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/** Father's Qualification */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={!!errors.fathersQualification}>
            <InputLabel id="fatherqual-label">
              Father's Qualification
            </InputLabel>
            <Controller
              name="fathersQualification"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select
                  labelId="fatherqual-label"
                  label="Father's Qualification"
                  {...field}
                >
                  {renderMenuItems(fatherQualifications)}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.fathersQualification?.message || " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Mother's Occupation */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={!!errors.mothersOccupation}>
            <InputLabel id="mothers-occupation-label">
              Mother's Occupation
            </InputLabel>
            <Controller
              name="mothersOccupation"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select
                  labelId="mothers-occupation-label"
                  label="Mother's Occupation"
                  {...field}
                >
                  {renderMenuItems(motherOccupations)}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.mothersOccupation?.message || " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Father's Occupation */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={!!errors.fathersOccupation}>
            <InputLabel id="fathers-occupation-label">
              Father's Occupation
            </InputLabel>
            <Controller
              name="fathersOccupation"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select
                  labelId="fathers-occupation-label"
                  label="Father's Occupation"
                  {...field}
                >
                  {renderMenuItems(fatherOccupations)}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.fathersOccupation?.message || " "}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Radio Groups: Yes/No Fields */}
        {[
          { label: "Displaced", name: "displaced" },
          {
            label: "Educational Special Needs",
            name: "educationalSpecialNeeds",
          },
          { label: "Tuition Fees Up To Date", name: "tuitionFeesUpToDate" },
          { label: "Scholarship Holder", name: "scholarshipHolder" },
        ].map(({ label, name }) => (
          <Grid item xs={12} sm={4} key={name}>
            <FormControl
              component="fieldset"
              error={!!errors[name]}
              sx={{ width: "100%" }}
            >
              <FormLabel
                component="legend"
                sx={{ mb: 0, fontSize: "0.875rem" }}
              >
                {label}?
              </FormLabel>
              <Controller
                name={name}
                control={control}
                rules={{ required: "Selection is required" }}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio size="small" />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio size="small" />}
                      label="No"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
        ))}

        {/* Gender */}
        <Grid item xs={12} sm={4}>
          <FormControl
            component="fieldset"
            error={!!errors.gender}
            sx={{ width: "100%" }}
          >
            <FormLabel component="legend" sx={{ mb: 0, fontSize: "0.875rem" }}>
              Gender
            </FormLabel>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Selection is required" }}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="Male"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>

        {/* Numerical Inputs */}
        {[
          { label: "Application Order", name: "applicationOrder" },
          { label: "Age at Enrollment", name: "ageAtEnrollment" },
          { label: "1st Sem Credited", name: "firstSemCredited" },
          { label: "1st Sem Enrolled", name: "firstSemEnrolled" },
          { label: "1st Sem Evaluations", name: "firstSemEvaluations" },
          { label: "1st Sem Without Evaluations", name: "firstSemWithoutEvaluations" },
          { label: "1st Sem Approved", name: "firstSemApproved" },
          { label: "1st Sem Grade", name: "firstSemGrade" },
          { label: "2nd Sem Credited", name: "secondSemCredited" },
          { label: "2nd Sem Enrolled", name: "secondSemEnrolled" },
          { label: "2nd Sem Evaluations", name: "secondSemEvaluations" },
          { label: "2nd Sem Without Evaluations", name: "secondSemWithoutEvaluations" },
          { label: "2nd Sem Approved", name: "secondSemApproved" },
          { label: "2nd Sem Grade", name: "secondSemGrade" },
          { label: "Unemployment Rate", name: "unemploymentRate" },
          { label: "Inflation Rate", name: "inflationRate" },
          { label: "GDP", name: "gdp" },
        ].map(({ label, name }) => (
          <Grid item xs={12} sm={6} md={4} key={name}>
            <Controller
              name={name}
              control={control}
              rules={{ required: `${label} is required` }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={label}
                  type="number"
                  fullWidth
                  error={!!errors[name]}
                  helperText={errors[name]?.message || " "}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default InputStage;
