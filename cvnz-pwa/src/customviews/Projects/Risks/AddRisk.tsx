import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, ImageList, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RiskDropdown from './RiskDropdown';
import { Risk } from 'src/customviews/Scripts';
import { ConsequenceType, GetRiskDetermination, IConsequence, ILikelihood, LikelihoodType } from 'src/redux/model/risk-determination';
import { CreateNewProjectRisk, IProjectRisk } from 'src/redux/model/risk.model';
import * as projectRiskActions from "src/redux/actions/Actions/projectRiskActions";
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';

import PropTypes from 'prop-types';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import ConsequenceDropdown from './ConsequenceDropdown';
import LikelihoodDropdown from './LikelihoodDropdown';
import { Store } from 'src/redux/reducers/rootReducer';
import { HelperService } from 'src/lib/helper';
import RiskDeterminationPopup from 'src/customviews/CommonComponents/RiskDeterminationPopup';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TooltipDialog from 'src/customviews/CommonComponents/TooltipDialog';

import uuid from 'uuid/v1';

function AddRisk(props) {
  const classes = useStyles({});
  const { project, organisation, ...rest } = props;
  const [additionRiskControls, setAdditionalRiskControls] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [risk, setRisk] = useState<Risk | undefined>(undefined);
  const [projectRisk, setProjectRisk] = useState<IProjectRisk | undefined>(undefined);
  const [likelihood, setLikelihood] = useState<ILikelihood | undefined>(undefined);
  const [consequence, setConsequence] = useState<IConsequence | undefined>(undefined);
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const [message, setMessage] = useState<string>('');
  const [riskAdded, setRiskAdded] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [openDeterminationPopup, setOpenDeterminationPopup] = useState<any>(false);

  const [showTooltipMessage, setShowTooltipMessage] = useState<boolean>(false);
  const [toolTipMessage, setTooltipMessage] = useState<string>('');

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const RisksState = useSelector((state: Store) => state?.risks?.risks);

  const projectRiskSaveError = useSelector((state: Store) => state?.projectRisks?.lastError);


  var risks: Risk[] = [];
  if (RisksState) {
    risks = HelperService.getArrayFromObjectList(RisksState);
  }
  const allProjectRisksState = useSelector((state: Store) => state?.projectRisks?.projectRisks, (prev, next) => {
    return prev === next;
  });
  var allProjectRiskLists: IProjectRisk[] = [];
  if (allProjectRisksState) {
    allProjectRiskLists = HelperService.getArrayFromObjectList(allProjectRisksState);
  }
  const dispatch = useDispatch();


  useEffect(() => {
    if (consequence && likelihood) {
      setProjectRiskRating();
    }
  }, [consequence, likelihood]);

  useEffect(() => {
    if (riskAdded) {
      setRating('');
      setProjectRisk(undefined);
      setAdditionalRiskControls('');
      setConsequence(undefined);
      setLikelihood(undefined);
    }
  }, [riskAdded]);


  const setRiskSelectedFromDropDown = (event, riskSelected: Risk) => {
    event.preventDefault();
    if (riskSelected) {
      setRisk(risk);
      createNewProjectRisk(riskSelected);
    } else {
      setProjectRisk(undefined);
    }
  }

  function createNewProjectRisk(riskSelected: Risk) {
    setRiskAdded(false);
    let projectRiskTest = CreateNewProjectRisk();
    if (projectRiskTest && project && organisation) {
      setProjectRisk({
        ...projectRiskTest,
        project_id: project.id,
        organisation_id: organisation.id,
        name: riskSelected.risk,
        risk_controls: riskSelected.control,
        risk_id: riskSelected.id
      });
      setIsDisabled(false);
    }
  }


  const setSelectedLikelihood = (event, selectedLikelihood: ILikelihood) => {
    event.preventDefault();
    setLikelihood(selectedLikelihood);
    if (projectRisk) {
      setProjectRisk({
        ...projectRisk,
        likelihood: selectedLikelihood.descriptor
      });
    }

  }

  const setSelectedConsequence = (event, selectedConsequence: IConsequence) => {
    event.preventDefault();
    setConsequence(selectedConsequence);
    if (projectRisk) {
      setProjectRisk({
        ...projectRisk,
        consequence: selectedConsequence.descriptor,
      });
    }
  }


  function setProjectRiskRating() {
    let rating: string = '';
    if (likelihood && consequence) {
      let LikelihoodDes = likelihood?.descriptor;
      rating = setRiskRating(LikelihoodDes, consequence?.descriptor);
      if (projectRisk) {
        setProjectRisk({
          ...projectRisk,
          risk_rating: rating
        })
      }
    }
    return rating;
  }


  function setRiskRating(likelihood: LikelihoodType, consequence: ConsequenceType) {
    var rating = GetRiskDetermination(likelihood, consequence);
    setRating(rating);
    if (projectRisk) {
      setProjectRisk({
        ...projectRisk,
        risk_rating: rating
      })
    }
    return rating;
  }
  const setAdditionalControls = (event) => {
    event.preventDefault();
    setAdditionalRiskControls(event.target.value);
  }



  const addRisk = async () => {
    let rating: string = '';
    if (likelihood && consequence) {
      let LikelihoodDes = likelihood?.descriptor;
      rating = setRiskRating(LikelihoodDes, consequence?.descriptor)
    }
    if (projectRisk && projectRisk.consequence && projectRisk.likelihood) {
      projectRisk.risk_rating = rating;
      if (additionRiskControls) {
        projectRisk.risk_controls.push(additionRiskControls);
      }
      let result = (await dispatch(projectRiskActions.addRisk(projectRisk, organisation ? organisation.id : '', project ? project.id : '', 'add'))) as unknown;
      if (result) {
        setMessage("Saved successfully");
        setOpenSuccessSnackbar(true);
        setTimeout(() => {
          setRiskAdded(true);
          setProjectRisk(undefined);
          handleClose();
        }, 300);
      } else {
        setMessage(projectRiskSaveError ? projectRiskSaveError : 'An error occured');
        setOpenErrorSnackbar(true);
        console.log("error")
      }
    } else {
      setMessage("Please complete risk assessment");
      setOpenSnackbar(true);
    }

  }


  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showRiskDeterminationPopup = () => {
    setOpenDeterminationPopup(true);
  }

  const handleRiskDeterminationPopup = () => {
    setOpenDeterminationPopup(false);
  }
  function handleClose() {
    setRisk(undefined);
    setAdditionalRiskControls('');
    setProjectRisk(undefined);
    setRating('');
    setMessage("");
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
    props.handleClose();

  }

  const handleCloseTooltipMessage = () => {
    setShowTooltipMessage(false);
  }

  const showMessage = (event, message: string) => {
    setShowTooltipMessage(true);
    setTooltipMessage(message);
  }

  const closeErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  }

  const closeSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  }

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Project Risk Assessment</DialogTitle>
      <DialogContent>
        <div>
          <RiskDropdown riskList={allProjectRiskLists} isDisabled={false} setSelectedRisks={setRiskSelectedFromDropDown} projectRisk={projectRisk} riskAdded={riskAdded}></RiskDropdown>
          {projectRisk ?
            (
              <div>
                <Typography variant="body1" style={{ marginTop: "10px" }}>Risk Controls</Typography>
                <div style={{
                  marginTop: "10px",
                  border: "1px solid lightgrey",
                  borderRadius: "4px",
                  maxHeight: "300px",
                  overflow: "scroll",
                }}>

                  <List disablePadding style={{ borderBottom: "none" }}>
                    {projectRisk.risk_controls.map((item, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item md={1} xs={1} alignItems="center"
                          container
                          justifyContent="center">
                          <IconButton size="large">
                            <FiberManualRecord style={{ fontSize: '10px', color: "black" }} />
                          </IconButton>
                        </Grid>
                        <Grid item md={11} xs={11}>
                          <ListItemText
                            style={{ marginTop: "6px", }}
                            primary={item}
                            primaryTypographyProps={{ variant: 'body1' }}
                          />
                        </Grid>
                      </Grid>


                    ))}
                  </List>

                </div>
              </div>

            ) : (
              <div></div>
            )}

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <div className={classes.spacing}>
                <LikelihoodDropdown isDisabled={isDisabled} projectRisk={projectRisk} setSelectedLikelihood={setSelectedLikelihood} riskAdded={riskAdded}></LikelihoodDropdown>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.spacing}>
                <ConsequenceDropdown isDisabled={isDisabled} projectRisk={projectRisk} setSelectedConsequence={setSelectedConsequence} riskAdded={riskAdded}></ConsequenceDropdown>
              </div>
            </Grid>

          </Grid>


          <Grid container spacing={2}>
            <Grid item md={1} xs={1}>
              <IconButton onClick={showRiskDeterminationPopup} size="large">
                <HelpOutlineIcon style={{
                  alignItems: 'center',
                  verticalAlign: 'middle',
                  marginTop: '25px'
                }} />
              </IconButton>
              <RiskDeterminationPopup open={openDeterminationPopup} handleClose={handleRiskDeterminationPopup}></RiskDeterminationPopup>
            </Grid>
            <Grid item md={11} xs={11}>
              <TextField
                fullWidth
                className={classes.spacing}
                label="Risk Rating"
                name="Risk Rating"
                value={rating}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={1} xs={2}
            >
              <TooltipDialog open={showTooltipMessage} message={toolTipMessage} handleClose={handleCloseTooltipMessage}></TooltipDialog>
              <Tooltip onClick={(event) => showMessage(event, 'Additional Risk Control text is limited to 500 characters')} title="Additional Risk Control text is limited to 500 characters" placement="top" className={classes.tooltipIcon}>
                <IconButton size="large">
                  <HelpOutlineIcon
                    style={{
                      alignItems: 'center',
                      verticalAlign: 'middle',
                      marginTop: '25px'
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item md={11} xs={10}>
              {/* Additional Risk Controls*/}
              <TextField
                inputProps={{
                  maxLength: 500,
                }}
                className={classes.spacing}
                fullWidth
                label="Additional Risk Controls"
                name="additionalRiskControls"
                onChange={setAdditionalControls}
                value={additionRiskControls}
                variant="outlined"
                multiline={true}
              />
            </Grid>
          </Grid>

        </div>
        <br />
        <MessageSnackbar onClose={handleSnackbarClose} open={openSnackbar} message={message} panelStatus='warn' />
        <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={message} panelStatus={'error'}></MessageSnackbar>
        <MessageSnackbar open={openSuccessSnackbar} onClose={closeSuccessSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
      </DialogContent>
      <DialogActions>

        <Grid
          alignItems="flex-end"
          container
          justifyContent="flex-end"
          spacing={3}
        >
          <Grid item>
            <Button onClick={handleClose}
              color="primary"
              variant="contained"
              size='small'
              style={{ marginRight: '10px' }}
            >
              Cancel
            </Button>

            <Button onClick={addRisk}
              color="primary"
              variant="contained"
              size='small'
              style={{ marginRight: '20px' }}
            >
              Add
            </Button>
          </Grid>
        </Grid>

      </DialogActions>
    </Dialog >
  );
}


AddRisk.propTypes = {
  project: PropTypes.object,
  organisation: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
export default AddRisk;