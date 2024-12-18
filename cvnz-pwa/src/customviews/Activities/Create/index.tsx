
import React, { useState, useRef, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from '../../../utils/axios';
import { Link as RouterLink } from 'react-router-dom';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions
  , Theme,
  Divider
} from '@mui/material';
import EditableLabel from 'react-editable-label';
import Page from '../../../components/Page';
import ProjectSelect from './ProjectSelect';
import Location from './Location';
import DateTime from './DateTime';
import Purpose from './Purpose';
import Safety from './Safety';
import SuccessSnackbar from 'src/customviews/Projects/Create/SuccessSnackbar';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    //  marginTop: theme.spacing(1),
    //marginBottom: theme.spacing(1)
  },
  actions: {
    textAlign: 'right',
    flexGrow: 1,
    display: 'inherit'
  },
  expand: {
    marginLeft: 'auto'
  },
  titleHeader: {
    height: '65px',
    padding: '20px',
    border: 'none',
    fontSize: '20px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    boxShadow: 'none',
    width: 'auto'
  },
  step: {
    "& $completed": {
      color: "#263238"
    },
    "& $active": {
      color: "pink"
    },
    "& $disabled": {
      color: "red"
    }
  },
  alternativeLabel: {
    fontSize: '16px',
    fontWeight: 'normal',
    marginTop: '5px',
  },
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {

    "& $alternativeLabel": {
      // marginTop: 0,
      fontSize: '16px',
      fontWeight: 'normal',
      marginTop: '5px'
    }
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Project', 'Location', 'Date & Time', 'Purpose', 'Safety'];
}



function LinearStepper(props) {
  const { project, projects, activity } = props;
  const classes = useStyles({});
  const [activeStep, setActiveStep] = React.useState<any>(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const history = useHistory();
  const handleFinish = async (event) => {
    //save all changes 
    props.handleSave(event);
    if (props.activity.projectId) {
      history.push(`/project/${props.activity.projectId}`)
    } else {
      history.push(`/projects`)
    }

  }

  const handleChange = (event) => {
    props.handleChangeForActivity(event);
  }
  const handleChangeType = (event) => {
    props.handleChangeType(event);
  }
  const handleEditLabelChange = (name, event) => {
    props.handleChangeNameAndValue(name, event);
  }
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <ProjectSelect
          activity={props.activity}
          project={props.project}
          projects={props.projects}
          handleChange={handleChange} />;
      case 1:
        return <Location
          activity={props.activity}
          handleChange={handleChange} />;
      case 2:
        return <DateTime
          activity={props.activity}
          handleChange={props.handleChange}
          handleChangeNameAndValue={props.handleChangeNameAndValue} />;
      case 3:
        return <Purpose
          activity={props.activity}
          handleChange={handleChange}
          handleChangeType={handleChangeType}
        />;
      case 4:
        return <Safety
          activity={props.activity}
          handleChange={handleChange}
          handleSafetyChange={props.handleSafetyChange} />;
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <Page className={classes.root}>
      <Container
        maxWidth="lg"
      // justify="center"
      // alignitems="stretch"
      >
        <Grid item style={{ marginTop: '20px' }}>
          <Card className={classes.titleHeader}>  <EditableLabel
            name="activityTitle"
            initialValue={props.activity.title || " Activity Title"}
            value={props.activity.title}
            save={event => handleEditLabelChange("title", event)}
          ></EditableLabel></Card>

        </Grid>
        <Divider className={classes.divider} />
        <Grid container direction="column" >

          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label} classes={{
                  root: classes.step,
                  completed: classes.completed,

                }}>
                  <StepLabel classes={{
                    alternativeLabel: classes.alternativeLabel,
                    labelContainer: classes.labelContainer
                  }}
                    StepIconProps={{
                      classes: {
                        root: classes.step,
                        completed: classes.completed,

                      }
                    }}>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>

                        {activeStep === steps.length - 1 ? <Button
                          variant="contained"
                          color="primary"
                          onClick={handleFinish}
                          className={classes.button}
                        >Finish
                        </Button> : <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >Next
                        </Button>}
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </div>
        </Grid>
      </Container>
      <SuccessSnackbar onClose={props.handleSnackbarClose} open={props.openSnackbar} />
    </Page>
  );
}

LinearStepper.propTypes = {
  //add properties and types here
  project: PropTypes.object,
  projects: PropTypes.array,
  activity: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeForActivity: PropTypes.func,
  onEditLabelChange: PropTypes.func,
  handleChangeNameAndValue: PropTypes.func,
  handleChangeType: PropTypes.func.isRequired,
  handleSave: PropTypes.func,
  openSnackbar: PropTypes.bool,
  handleSnackbarClose: PropTypes.func,
  handleSafetyChange: PropTypes.func.isRequired,
};

export default LinearStepper;
