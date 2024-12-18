
import { Box, Button, Card, CardActions, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import * as React from 'react';
import FieldNotesProjectDetails from '../Components/FieldNoteDetails/FieldNotesProjectDetails';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Store } from 'src/redux/reducers/rootReducer';
import { useEffect } from 'react';
import FieldNoteRisks from '../Components/Risks/FieldNoteRisks';
import AddFieldGoals from '../Components/Goals/AddFieldGoals';
import FieldNotesAdditionalNotes from '../Components/AdditionalNotes/FieldNotesAdditionalNotes';
import StaffDetails from '../Components/Induction/Staff/StaffDetails';
import VolunteerDetails from '../Components/Induction/Volunteer/VolunteerDetails';
import SaveFieldNote from '../Components/SaveFieldNote/SaveFieldNote';
import { getFieldNoteFromFirebase, getInProgressFieldNotes, unsetFieldNote } from 'src/redux/actions/FieldNoteActions/fieldNoteActions';
import FieldAdditionalNoteList from '../Components/AdditionalNotes/FieldAdditionalNoteList';
import FieldNoteGoalList from '../Components/Goals/FieldNoteGoalList';
import { IProject } from 'src/redux/model/project.model';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { useHistory, useParams } from 'react-router';
import { setFieldNoteProject } from 'src/redux/actions/Actions/orgProjectActions';
import ConfirmPopup from 'src/customviews/Projects/Create/ConfirmPopup';

const steps = ['Details', 'Risk', 'Staff', 'Volunteer', 'Outcomes', 'Complete'];

function FieldNoteStepper(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [openAddPopup, setOpenAddPopup] = React.useState(false);
  const [promptInProgress, setPromptInProgress] = React.useState(false);
  const session = useSelector((state: RootState) => state.userSessionV2);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  useEffect(() => {
    return () => {
      // clean up
      setActiveStep(0);
      dispatch(unsetFieldNote());
      dispatch(setFieldNoteProject(undefined));
    };
  }, []);

  //on load
  useEffect(() => {
    if (session.user) {
      if (fieldNoteParams.fieldNoteId === 'new') {
        // check for InProgress FieldNotes
        getInProgressFieldNotes({
          organisationId: fieldNoteParams.organisation,
          createdBy: session.user?.id,
        }).then(fieldNotesResult => {
          const hasInProgress = fieldNotesResult.isSuccess && fieldNotesResult.value.length > 0;
          setPromptInProgress(hasInProgress);

          if (!hasInProgress) {
            // user does NOT have an in-progress
            startFieldNote();
          }
        });
      } else {
        startFieldNote();
      }
    }

  }, [fieldNoteParams]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  function startFieldNote() {
    setActiveStep(0);

    // unset project
    dispatch(setFieldNoteProject(undefined));
    // the projectId in the route may be 'new' or some valid projectId
    // if 'new': the project will remain undefined (since it will try to load 'new' and fail)
    // if a valid projectId: the project drop down will see the route param and will successfully load that project into global redux and then show the global it in the dropdown
    dispatch(getFieldNoteFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId ?? 'new', fieldNoteId: fieldNoteParams.fieldNoteId ?? 'new' }));
  }

  function handleAddPopupClose() {
    setOpenAddPopup(false);
  }

  function handleAddDialogOpen() {
    setOpenAddPopup(true);
  }
  return <>
    <ConfirmPopup saveChanges={() => {
      setPromptInProgress(false);
      startFieldNote();
    }}
      handleClose={() => { history.push(`/organisation/${fieldNoteParams.organisation}/fieldNoteLists`) }}
      open={promptInProgress}
      confirmText={'New Field Note'}
      cancelText={'Go to list'}
      message={'You already have a Field Note in progress.  Would you like to start a new one?'}></ConfirmPopup>
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography>
            All steps completed
          </Typography>
          <Box>
            <Box />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>
            {(activeStep === 0) ? (
              <div>
                <FieldNotesProjectDetails handleNext={handleNext} activeFieldNote={activeFieldNote}></FieldNotesProjectDetails>
              </div>
            ) :
              (<div></div>)
            }
          </div>

          <div>
            {(activeStep === 1) ? (
              <div>
                <FieldNoteRisks handleBack={handleBack} handleNext={handleNext} ></FieldNoteRisks>
              </div>
            ) :
              (<div></div>)
            }
          </div>

          <div>
            {(activeStep === 2) ? (
              <div>
                <StaffDetails handleBack={handleBack} handleNext={handleNext}></StaffDetails>
              </div>
            ) :
              (<div></div>)
            }
          </div>

          <div>
            {(activeStep === 3) ? (
              <div>
                <VolunteerDetails handleBack={handleBack} handleNext={handleNext} ></VolunteerDetails>
              </div>
            ) :
              (<div></div>)
            }
          </div>

          <div>
            {(activeStep === 4) ? (
              <div>
                <AddFieldGoals open={openAddPopup} handleClose={handleAddPopupClose} ></AddFieldGoals>
                <FieldNoteGoalList handleAddDialogOpen={handleAddDialogOpen}></FieldNoteGoalList>

                <Card style={{ marginTop: '10px' }}>
                  <CardActions>
                    <Grid container justifyContent="flex-end" >
                      <Button
                        style={{ marginRight: '10px' }}
                        color="primary"
                        variant="contained"
                        size='small'
                        onClick={handleBack}>
                        BACK
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </Grid>
                  </CardActions>

                </Card>
              </div>
            ) :
              (<div></div>)
            }
          </div>

          <div>
            {(activeStep === 5) ? (
              <div>
                <div>
                  <FieldNotesAdditionalNotes></FieldNotesAdditionalNotes>
                  <FieldAdditionalNoteList handleBack={handleBack} handleNext={handleNext}></FieldAdditionalNoteList>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <SaveFieldNote handleBack={handleBack}></SaveFieldNote>
                </div>
              </div>
            ) :
              (<div></div>)
            }
          </div>
        </React.Fragment>
      )
      }
    </Box >
  </>;
}


FieldNoteStepper.propTypes = {
  project: PropTypes.object,

};

export default FieldNoteStepper;