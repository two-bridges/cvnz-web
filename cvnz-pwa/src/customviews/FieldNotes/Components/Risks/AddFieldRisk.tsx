import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, List, ListItem, ListItemText, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Risk } from 'src/customviews/Scripts';
import { ConsequenceType, GetRiskDetermination, IConsequence, ILikelihood, LikelihoodType } from 'src/redux/model/risk-determination';
import { CreateNewProjectRisk, IProjectRisk } from 'src/redux/model/risk.model';
import PropTypes from 'prop-types';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import ConsequenceDropdown from 'src/customviews/Projects/Risks/ConsequenceDropdown';
import LikelihoodDropdown from 'src/customviews/Projects/Risks/LikelihoodDropdown';
import RiskDropdown from 'src/customviews/Projects/Risks/RiskDropdown';
import { fetchRisks } from 'src/redux/actions/riskActions';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { IProject } from 'src/redux/model/project.model';
import { Store } from 'src/redux/reducers/rootReducer';
import { HelperService } from 'src/lib/helper';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import RiskDeterminationPopup from 'src/customviews/CommonComponents/RiskDeterminationPopup';
import TooltipDialog from 'src/customviews/CommonComponents/TooltipDialog';
import { FiberManualRecord } from '@mui/icons-material';
import { addOrUpdateFieldNoteRisk } from 'src/redux/actions/FieldNoteActions/fieldNoteRiskActions';

function AddFieldRisk(props) {
  const dispatch = useDispatch();
  const classes = useStyles({});

  let projectId = props.projectId as string;
  let organisationId = props.organisationId as string;
  let fieldNoteId = props.fieldNoteId as string;

  const [additionRiskControls, setAdditionalRiskControls] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [risk, setRisk] = useState<Risk | undefined>(undefined);
  const [projectRisk, setProjectRisk] = useState<IProjectRisk | undefined>(undefined);
  const [likelihood, setLikelihood] = useState<ILikelihood | undefined>(undefined);
  const [consequence, setConsequence] = useState<IConsequence | undefined>(undefined);
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const [openDeterminationPopup, setOpenDeterminationPopup] = useState<any>(false);
  const [message, setMessage] = useState<string>('');
  const [riskAdded, setRiskAdded] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);


  const [showTooltipMessage, setShowTooltipMessage] = useState<boolean>(false);
  const [toolTipMessage, setTooltipMessage] = useState<string>('');

  const RisksState = useSelector((state: Store) => state?.risks?.risks);

  let risks: Risk[] = [];

  if (RisksState) {
    risks = HelperService.getArrayFromObjectList(RisksState);
  }
  const allProjectRisksState = useSelector((state: Store) => state?.fieldNoteRisks?.list, (prev, next) => {
    return prev === next;
  });

  function getAllRisks() {
    dispatch(fetchRisks());
  }
  //on load
  useEffect(() => {
    getAllRisks();
  }, [])

  //on likelihood and consequence update,set risk rating
  useEffect(() => {
    if (consequence && likelihood) {
      setProjectRiskRating();
    }
  }, [consequence, likelihood]);

  //clear data after risk is added
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
    }
  }

  function createNewProjectRisk(riskSelected: Risk) {
    setRiskAdded(false);
    let projectRiskTest = CreateNewProjectRisk();
    if (projectRiskTest && projectId && organisationId) {
      setProjectRisk({
        ...projectRiskTest,
        project_id: projectId,
        organisation_id: organisationId,
        name: riskSelected.risk,
        risk_controls: riskSelected.control,
        risk_id: riskSelected.id
      });
    }
    setIsDisabled(false);
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

  const addRisk = () => {
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
      const result = dispatch(addOrUpdateFieldNoteRisk({ risk: projectRisk, organisationId: organisationId, projectId: projectId, fieldNoteId: fieldNoteId })) as unknown as boolean;
      if (result) {
        props.handleClose();
        setRiskAdded(true);
        setProjectRisk(undefined);
      }
    } else {
      setMessage("Please complete risk assessment");
      setOpenSnackbar(true);
    }
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleClose = () => {
    setRisk(undefined);
    setAdditionalRiskControls('');
    setProjectRisk(undefined);
    setRating('');
    props.handleClose();
  };

  const showRiskDeterminationPopup = () => {
    setOpenDeterminationPopup(true);
  }
  const closeRiskDeterminationPopup = () => {
    setOpenDeterminationPopup(false);
  }

  const handleCloseTooltipMessage = () => {
    setShowTooltipMessage(false);
  }

  const showMessage = (event, message: string) => {
    setShowTooltipMessage(true);
    setTooltipMessage(message);
  }
  return <>
    <MessageSnackbar panelStatus={'warn'} onClose={handleSnackbarClose} open={openSnackbar} message={message} />
    <Dialog
      fullWidth
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Typography variant="h6" style={{ marginLeft: '24px', marginTop: '24px', marginBottom: '14px' }}>
        Add Risk
      </Typography>
      <DialogContent>
        <div>
          <RiskDropdown riskList={allProjectRisksState} isDisabled={false} setSelectedRisks={setRiskSelectedFromDropDown} projectRisk={projectRisk} riskAdded={riskAdded}></RiskDropdown>
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

          <Grid container spacing={3}>
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

          <Grid container spacing={3}>
            <Grid item xs={1}>
              <IconButton
                style={{ marginTop: '36px', padding: '0px' }}
                onClick={showRiskDeterminationPopup}
                size="large">
                <HelpOutlineIcon />
              </IconButton>
              <RiskDeterminationPopup open={openDeterminationPopup} handleClose={closeRiskDeterminationPopup}></RiskDeterminationPopup>
            </Grid>
            <Grid item xs={11}>
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
          <Grid container spacing={3}>
            <Grid item md={1} xs={1}
            >
              <TooltipDialog open={showTooltipMessage} message={toolTipMessage} handleClose={handleCloseTooltipMessage}></TooltipDialog>

              <Tooltip onClick={(event) => showMessage(event, 'Additional Risk Control text is limited to 500 characters')} title="Additional Risk Control text is limited to 500 characters" placement="top" className={classes.tooltipIcon}>
                <IconButton style={{ marginTop: '36px', padding: '0px' }} size="large">
                  <HelpOutlineIcon
                  />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item md={11} xs={11}>
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
                maxRows={5}
                multiline={true}
              />
            </Grid>
          </Grid>


        </div>

      </DialogContent>
      <DialogActions style={{ marginBottom: '18px' }}>
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
              style={{ marginRight: '18px' }}
            >
              Cancel
            </Button>
            <Button onClick={addRisk}
              color="primary"
              variant="contained"
              size='small'
              style={{ marginRight: '18px' }}
            >
              Add
            </Button>

          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  </>;
}


AddFieldRisk.propTypes = {
  projectId: PropTypes.string,
  organisationId: PropTypes.string,
  fieldNoteId: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default AddFieldRisk;