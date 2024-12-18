
import React, { useState, useRef, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from '../../../utils/axios';
import { Link as RouterLink } from 'react-router-dom';
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

import createStyles from '@mui/styles/createStyles';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}
function LinearStepperEx(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
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
  );

}

LinearStepperEx.propTypes = {
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
};

export default LinearStepperEx;
