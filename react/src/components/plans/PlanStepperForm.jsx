import React from "react";
import { Formik, FastField, Form, FieldArray } from "formik";
import { TextField } from "formik-material-ui";
import PropTypes from "prop-types";
import * as planService from "./../../services/planService";
import planValidationSchema from "./../../schema/PlanValidationSchema";
import FileUpload from "./../fileUpload/FileUploadForm";
import logger from "sabio-debug";
import { toast } from "react-toastify";
import getTypes from "./../../services/lookUpService";
import {
  Button,
  Paper,
  Stepper,
  Step,
  Typography,
  StepContent,
  StepLabel,
  MenuItem,
  Grid,
} from "@material-ui/core";
import "./../../App.css";
const _logger = logger.extend("Plan Form");

class PlanStepperForm extends React.Component {
  constructor(props) {
    super(props);
    const pathExists = props.history.location.pathname.includes("edit");
    _logger(pathExists);
    if (pathExists) {
      _logger(props.history.location.state.plan);
      this.state = {
        pathExists: pathExists,
        activeStep: 0,
        agendaTypes: [],
        mappedAgendaTypes: [],
        formData: { ...props.history.location.state.plan },
      };
    } else {
      this.state = {
        pathExists: pathExists,
        agendaTypes: [],
        mappedAgendaTypes: [],
        activeStep: 0,
        formData: {
          title: "",
          overview: "",
          subject: "",
          duration: "",
          planTypeId: "",
          coverImageUrl:
            "https://image.flaticon.com/icons/png/512/16/16480.png",
          concepts: "",
          ableTo: "",
          vocabulary: "",
          standardTypeId: "",
          prerequisites: "",
          materials: "",
          prep: "",
          toDo: "",
          agendas: [],
        },
      };
    }
  }
  componentDidMount() {
    this.buildTypes();
  }
  buildTypes = () => {
    getTypes("PlanTypes").then(this.planTypes);
    getTypes("AgendaTypes").then(this.agendaTypes);
    getTypes("StandardTypes").then(this.standardTypes);
  };
  planTypes = (config) => {
    const planTypes = config.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        planTypes,
        mappedPlanTypes: planTypes.map(this.mapTypes),
      };
    });
  };
  agendaTypes = (config) => {
    const agendaTypes = config.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        agendaTypes,
        mappedAgendaTypes: agendaTypes.map(this.mapTypes),
      };
    });
  };
  standardTypes = (config) => {
    const standardTypes = config.items;
    this.setState((prevState) => {
      return {
        ...prevState,
        standardTypes,
        mappedStandardTypes: standardTypes.map(this.mapTypes),
      };
    });
  };

  mapTypes = (type) => (
    <MenuItem value={type.id} key={type.id}>
      {type.name}
    </MenuItem>
  );
  handleFileChange = (response, setFieldValue) => {
    _logger(response, setFieldValue);
    setFieldValue("coverImageUrl", response[0]);
  };
  onChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState((prevState) => {
      const formData = { ...prevState.formData, [name]: value };
      return { formData: formData };
    });
  };
  onSave = (formValues) => {
    if (this.state.pathExists) {
      planService
        .update(formValues)
        .then(this.onSaveSuccess)
        .catch(this.onSaveError);
    } else {
      planService
        .add(formValues)
        .then(this.onSaveSuccess)
        .catch(this.onSaveError);
    }
  };
  onSaveSuccess = (response) => {
    toast("Plan Saved", response);
    this.props.history.goBack();
  };
  onSaveError = (errResponse) => {
    toast("error saving", errResponse);
  };
  handleNext = () => {
    this.setActiveStep(this.state.activeStep + 1);
  };

  handleBack = () => {
    this.setActiveStep(this.state.activeStep - 1);
  };
  handleReset = () => {
    this.setActiveStep(0);
  };
  setActiveStep = (step) => {
    this.setState({ activeStep: step });
  };
  getSteps() {
    return ["Plan", "Objectives", "Preparation", "Agendas"];
  }
  getStepContent(step, formikProps) {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item container xs={12} spacing={3}>
              <Grid item xs={6}>
                <FastField
                  name="title"
                  component={TextField}
                  label="Title"
                  variant="outlined"
                  className={
                    formikProps.errors.title && formikProps.touched.title
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FastField
                  name="planTypeId"
                  component={TextField}
                  label="Theme"
                  select
                  variant="outlined"
                  className={
                    formikProps.errors.planTypeId &&
                    formikProps.touched.planTypeId
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                >
                  {this.state.mappedPlanTypes}
                </FastField>
              </Grid>
              <Grid item xs={2}>
                <FastField
                  component={TextField}
                  name="duration"
                  label="Duration"
                  variant="outlined"
                  className={
                    formikProps.errors.duration && formikProps.touched.duration
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3}>
              <Grid item xs={2}>
                <img
                  alt=""
                  className="planCoverImage"
                  src={formikProps.values.coverImageUrl}
                />
                <FileUpload
                  isMultiple={false}
                  onUploadSuccess={(response) =>
                    this.handleFileChange(response, formikProps.setFieldValue)
                  }
                />
              </Grid>
              <Grid item container direction="column" xs={10} spacing={3}>
                <Grid item xs={12}>
                  <FastField
                    component={TextField}
                    name="subject"
                    label="Subject"
                    variant="outlined"
                    className={
                      formikProps.errors.subject && formikProps.touched.subject
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FastField
                    component={TextField}
                    name="overview"
                    id="overview"
                    label="Overview"
                    variant="outlined"
                    multiline
                    rows={6}
                    className={
                      formikProps.errors.overview &&
                      formikProps.touched.overview
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FastField
                component={TextField}
                name="concepts"
                id="concepts"
                label="Concepts"
                variant="outlined"
                multiline
                rows={4}
                className={
                  formikProps.errors.concepts && formikProps.touched.concepts
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FastField
                component={TextField}
                name="ableTo"
                id="ableTo"
                multiline
                rows={4}
                label="Able To"
                variant="outlined"
                className={
                  formikProps.errors.ableTo && formikProps.touched.ableTo
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FastField
                component={TextField}
                name="vocabulary"
                id="vocabulary"
                label="Vocabulary"
                multiline
                rows={4}
                variant="outlined"
                className={
                  formikProps.errors.vocabulary &&
                  formikProps.touched.vocabulary
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FastField
                name="standardTypeId"
                component={TextField}
                select
                label="Standard Type"
                variant="outlined"
                className={
                  formikProps.errors.standardTypeId &&
                  formikProps.touched.standardTypeId
                    ? "form-control is-invalid"
                    : "form-control"
                }
              >
                {this.state.mappedStandardTypes}
              </FastField>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FastField
                component={TextField}
                name="prerequisites"
                id="prerequisites"
                label="Prerequisites"
                multiline
                rows={4}
                variant="outlined"
                className={
                  formikProps.errors.prerequisites &&
                  formikProps.touched.prerequisites
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FastField
                component={TextField}
                name="materials"
                id="materials"
                label="Materials"
                multiline
                rows={4}
                variant="outlined"
                className={
                  formikProps.errors.materials && formikProps.touched.materials
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FastField
                component={TextField}
                name="prep"
                id="prep"
                label="Prep"
                multiline
                rows={4}
                variant="outlined"
                className={
                  formikProps.errors.prep && formikProps.touched.prep
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FastField
                component={TextField}
                name="toDo"
                id="toDo"
                label="To Do"
                multiline
                rows={4}
                variant="outlined"
                className={
                  formikProps.errors.toDo && formikProps.touched.toDo
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <FieldArray
            name="agendas"
            render={(arrayHelpers) => (
              <Grid container spacing={3}>
                {formikProps.values.agendas &&
                formikProps.values.agendas.length > 0 ? (
                  formikProps.values.agendas.map((agenda, index) => (
                    <Grid item container spacing={3} key={index} xs={12}>
                      <Grid item xs={6}>
                        <FastField
                          component={TextField}
                          name={`agendas[${index}].title`}
                          label="Agenda Title"
                          variant="outlined"
                          className="form-control"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FastField
                          name={`agendas[${index}].agendaTypeId`}
                          component={TextField}
                          select
                          variant="outlined"
                          label="Agenda Type"
                          className="form-control"
                        >
                          {this.state.mappedAgendaTypes}
                        </FastField>
                      </Grid>
                      <Grid item xs={2}>
                        <FastField
                          component={TextField}
                          name={`agendas[${index}].duration`}
                          label="Duration"
                          variant="outlined"
                          className="form-control"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FastField
                          component={TextField}
                          name={`agendas[${index}].educatorDoes`}
                          label="Educator Does"
                          multiline
                          rows={4}
                          variant="outlined"
                          className="form-control"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FastField
                          component={TextField}
                          name={`agendas[${index}].learnerDoes`}
                          label="Learner Does"
                          multiline
                          rows={4}
                          variant="outlined"
                          className="form-control"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FastField
                          component={TextField}
                          name={`agendas[${index}].tips`}
                          label="Tips"
                          multiline
                          rows={4}
                          variant="outlined"
                          className="form-control"
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          type="button"
                          variant="contained"
                          color="secondary"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <div></div>
                )}
                <Grid item>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() =>
                      arrayHelpers.insert(formikProps.values.agendas.length, "")
                    }
                  >
                    Add Agenda
                  </Button>
                </Grid>
              </Grid>
            )}
          />
        );
      default:
        return "Unknown step";
    }
  }
  render() {
    return (
      <Paper>
        <Formik
          initialValues={this.state.formData}
          onSubmit={this.onSave}
          validationSchema={planValidationSchema}
          render={(formikProps) => (
            <Form>
              <Stepper
                activeStep={this.state.activeStep}
                orientation="vertical"
              >
                {this.getSteps().map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      {this.getStepContent(index, formikProps)}

                      <Grid container spacing={3}>
                        <Grid item>
                          <Button
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
                            className="button"
                          >
                            Back
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className="button"
                          >
                            {this.state.activeStep ===
                            this.getSteps().length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </Grid>
                      </Grid>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {this.state.activeStep === this.getSteps().length && (
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <Typography>
                      Plan Complete, click Submit or reset the form to start all
                      over
                    </Typography>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item>
                    <Button
                      onClick={this.handleReset}
                      className="button"
                      variant="contained"
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={
                        !formikProps.isValid || formikProps.isSubmitting
                      }
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Form>
          )}
        />
      </Paper>
    );
  }
}
PlanStepperForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.shape({
        plan: PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          subject: PropTypes.string,
          overview: PropTypes.string,
          duration: PropTypes.string,
          planTypeId: PropTypes.number,
          coverImageUrl: PropTypes.string,
          concepts: PropTypes.string,
          ableTo: PropTypes.string,
          vocabulary: PropTypes.string,
          standardTypeId: PropTypes.number,
          prerequisites: PropTypes.string,
          materials: PropTypes.string,
          prep: PropTypes.string,
          toDo: PropTypes.string,
          agendas: PropTypes.arrayOf(
            PropTypes.shape({
              agendaTypeId: PropTypes.number,
              title: PropTypes.string,
              duration: PropTypes.string,
              tips: PropTypes.string,
              educatorDoes: PropTypes.string,
              learnerDoes: PropTypes.string,
            })
          ),
        }),
      }),
    }),
  }),
};
export default PlanStepperForm;
