
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import SuccessSnackbar from 'src/customviews/Projects/Create/SuccessSnackbar';
import Page from '../../components/Page';
import SelectProject from './SelectProject';
import Risk from './Risk';
import People from './People';
import Data from './Data';
import Notes from './Notes';
import {
  Stepper,
  Step,
  StepLabel,
  Paper,
  StepContent,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  colors,
  Theme,
  Container,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    //paddingTop: theme.spacing(3),
    // paddingBottom: theme.spacing(3)
  },
  saveButton: {
    marginLeft: theme.spacing(2),
    height: '40px',
    width: 'auto',
    background: '#4527A0',
    color: '#FCFCFC',
    borderRadius: '3px'
  },
  actions: {
    textAlign: 'right',
    flexGrow: 1,
    display: 'inherit'
  },
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
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
  tabs: {
    //marginTop: theme.spacing(3)
    backgroundColor: '#FCFCFC',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { height: 5 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)'
  },
  bigIndicator: {
    height: 4,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  //add your style classes here
}));
function getSteps() {
  return ['Project', 'People', 'Data', 'Safety', 'Notes'];
}


function Record(props) {

  const { projects, record, className = "", ...rest } = props;
  const classes = useStyles({});
  const [tab, setTab] = useState<any>('project');
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

  const handleFinish = () => {
    setActiveStep(0);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <SelectProject
          projects={props.projects}
          record={props.record}
          handleChange={props.handleChange}
          handleChangeNameAndValue={props.handleChangeNameAndValue} />;
      case 1:
        return <People
          record={props.record}
          addPerson={props.addPerson}
          handleChange={props.handleChange}
          handleNumberChange={props.handleNumberChange}
          handleChangeStaff={props.handleChangeStaff} />;
      case 2:
        return <Data
          record={props.record}
          addData={props.addData}
          handleChange={props.handleChange}
          handleChangeData={props.handleChangeData}
          handleDataNumberChange={props.handleDataNumberChange}
        />;
      case 3:
        return <Risk
          record={props.record}
          addRisk={props.addRisk}
          handleChange={props.handleChange}
          handleRiskChange={props.handleRiskChange} />;
      case 4:
        return <Notes></Notes>;
      default:
        return 'Unknown stepIndex';
    }
  }

  const handleSubmit = async (event) => {
    props.handleRecordSave(event);
  };

  return (
    <Page className={classes.root}>
      <Container maxWidth="lg" >

        <Grid item style={{ marginTop: '20px' }}>
          <Card className={classes.titleHeader}>
            <CardHeader title="Record Data" titleTypographyProps={{ variant: 'h4' }} /></Card>

        </Grid>
        <Divider className={classes.divider} />



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
                  <div>{getStepContent(index)}</div>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >Back
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
              <div>All steps completed - you&apos;re finished</div>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </Container>
      <SuccessSnackbar onClose={props.handleSnackbarClose} open={props.openSnackbar} />
    </Page>
  );
}

Record.propTypes = {
  //add properties and types here
  record: PropTypes.object,
  projects: PropTypes.array,
  addPerson: PropTypes.func,
  addData: PropTypes.func,
  addRisk: PropTypes.func,
  handleChange: PropTypes.func,
  handleNumberChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChangeData: PropTypes.func,
  handleDataNumberChange: PropTypes.func,
  handleChangeStaff: PropTypes.func,
  handleRiskChange: PropTypes.func,
  handleChangeNameAndValue: PropTypes.func,
  openSnackbar: PropTypes.bool,
  handleSnackbarClose: PropTypes.func,
};

export default Record;
