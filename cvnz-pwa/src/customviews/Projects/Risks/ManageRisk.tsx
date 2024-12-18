import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, List, ListItem, ListItemText, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RiskDropdown from './RiskDropdown';
import ConsequenceDropdown from './ConsequenceDropdown';
import LikelihoodDropdown from './LikelihoodDropdown';
import { ILikelihood, IConsequence, GetRiskDetermination, ConsequenceType, LikelihoodType, Consequences, Likelihoods } from 'src/redux/model/risk-determination';
import _ from 'underscore';

import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { HelperService } from 'src/lib/helper';
import { useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { Risk } from 'src/customviews/Scripts';
import TooltipDialog from 'src/customviews/CommonComponents/TooltipDialog';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RiskDeterminationPopup from 'src/customviews/CommonComponents/RiskDeterminationPopup';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import { IProjectRisk } from 'src/redux/model/risk.model';

function ManageRisk(props) {
  const classes = useStyles({});
  var risks: Risk[] = [];

  const projectRisk = props.projectRisk as IProjectRisk;
  const [likelihood, setLikelihood] = useState<ILikelihood | undefined>(undefined);
  const [consequence, setConsequence] = useState<IConsequence | undefined>(undefined);
  const [additionRiskControls, setAdditionalRiskControls] = useState<string>('');
  const [showTooltipMessage, setShowTooltipMessage] = useState<boolean>(false);
  const [toolTipMessage, setTooltipMessage] = useState<string>('');
  const [openDeterminationPopup, setOpenDeterminationPopup] = useState<any>(false);

  const [rating, setRating] = useState<string>('');
  const consequences: IConsequence[] = Consequences;
  const likelihoods: ILikelihood[] = Likelihoods;

  const RisksState = useSelector((state: Store) => state?.risks?.risks);
  if (RisksState) {
    risks = HelperService.getArrayFromObjectList(RisksState);
  }

  useEffect(() => {
    if (consequence && likelihood) {
      setProjectRiskRating();
    }
  }, [consequence, likelihood]);

  useEffect(() => {
    if (projectRisk) {
      let consequenceNameIdx = _.indexBy(consequences, l => l.descriptor);
      let c = _.find(consequences, r => r.descriptor === projectRisk.consequence);
      if (c) {
        setConsequence(consequenceNameIdx[projectRisk.consequence]);
      }

      let likelihoodNameIdx = _.indexBy(likelihoods, l => l.descriptor);
      let lh = _.find(consequences, r => r.descriptor === projectRisk.consequence);
      if (lh) {
        setLikelihood(likelihoodNameIdx[projectRisk.likelihood]);
      }
    }
  });

  useEffect(() => {
    if (projectRisk) {
      projectRisk.risk_rating = rating;
    }
  }, [rating]);

  function setProjectRiskRating() {

    let rating: string = '';
    if (likelihood && consequence) {
      let LikelihoodDes = likelihood?.descriptor;
      let ConsequnceDes = consequence?.descriptor;
      rating = setRiskRating(LikelihoodDes, ConsequnceDes);
    }
    return rating;
  }

  function setRiskRating(likelihood: LikelihoodType, consequence: ConsequenceType) {
    var rating = GetRiskDetermination(likelihood, consequence);
    setRating(rating);
    return rating;
  }

  const setSelectedLikelihood = (event, selectedLikelihood: ILikelihood) => {
    event.preventDefault();
    setLikelihood(selectedLikelihood);
    if (projectRisk) {
      projectRisk.likelihood = selectedLikelihood.descriptor
    }
  }

  const setSelectedConsequence = (event, selectedConsequence: IConsequence) => {
    event.preventDefault();
    setConsequence(selectedConsequence);
    if (projectRisk) {
      projectRisk.consequence = selectedConsequence.descriptor;
    }
  }
  const setAdditionalControls = (event) => {
    event.preventDefault();
    setAdditionalRiskControls(event.target.value);

  }

  const handleClose = () => {
    props.handleClose(false);
  };

  const handleRiskUpdate = () => {
    if (additionRiskControls) {
      projectRisk.risk_controls.push(additionRiskControls);
      setAdditionalRiskControls('');
    }
    props.handleProjectRiskUpdate();
  }
  const handleCloseTooltipMessage = () => {
    setShowTooltipMessage(false);
  }

  const showMessage = (event, message: string) => {
    setShowTooltipMessage(true);
    setTooltipMessage(message);
  }
  const showRiskDeterminationPopup = () => {
    setOpenDeterminationPopup(true);
  }

  const handleCloseRiskDeterminationPopup = () => {
    setOpenDeterminationPopup(false);

  }
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Manage Risk</DialogTitle>
      <DialogContent>
        {projectRisk ? (
          <div>
            {/* <RiskDropdown isDisabled={true} projectRisk={projectRisk}></RiskDropdown> */}
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                className={classes.spacing}
                label="Risk"
                name="Risk"
                value={projectRisk.name}
                variant="outlined"
              />
            </Grid>
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
                      {projectRisk?.risk_controls.map((item, index) => (
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
            <div>
              <div className={classes.spacing}>
                <LikelihoodDropdown projectRisk={projectRisk} setSelectedLikelihood={setSelectedLikelihood}></LikelihoodDropdown>
              </div>
              <div className={classes.spacing}>
                <ConsequenceDropdown projectRisk={projectRisk} setSelectedConsequence={setSelectedConsequence}></ConsequenceDropdown>
              </div>
            </div>
            <Grid container spacing={2}>
              <Grid item md={1} xs={1}>
                <IconButton onClick={showRiskDeterminationPopup} size="large">
                  <HelpOutlineIcon style={{
                    alignItems: 'center',
                    verticalAlign: 'middle',
                    marginTop: '25px'
                  }} />
                </IconButton>
                <RiskDeterminationPopup open={openDeterminationPopup} handleClose={handleCloseRiskDeterminationPopup}></RiskDeterminationPopup>
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
              <Grid item md={1} xs={1}>
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
        ) : (<div></div>)}

      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color='primary'
          size='small'
          onClick={handleClose}
          style={{ marginRight: '10px' }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color='primary'
          size='small'
          onClick={handleRiskUpdate}
          style={{ marginRight: '18px' }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}


ManageRisk.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  projectRisk: PropTypes.object,
  setSelectedRisks: PropTypes.func,
  handleProjectRiskUpdate: PropTypes.func,
  setSelectedLikelihood: PropTypes.func,
  setSelectedConsequence: PropTypes.func,
};

export default ManageRisk;

