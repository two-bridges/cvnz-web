import { Card, CardActions, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ManageRisk from 'src/customviews/Projects/Risks/ManageRisk';
import { addOrUpdateFieldNoteRisk } from 'src/redux/actions/FieldNoteActions/fieldNoteRiskActions';
import { IProjectRisk } from 'src/redux/model/risk.model';
import { Store } from 'src/redux/reducers/rootReducer';
import AddFieldRisk from './AddFieldRisk';
import FieldNoteRiskList from './FieldNoteRiskList';

function FieldNoteRisks(props) {
  const dispatch = useDispatch();
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const [open, setOpen] = React.useState(false);
  const [riskSelectedToBeUpdated, setRiskSelectedToBeUpdated] = useState<IProjectRisk | undefined>(undefined);
  const [openAddPopup, setOpenAddPopup] = React.useState(false);

  const riskState = useSelector((state: Store) => state?.fieldNoteRisks?.list);

  function handleAddPopupOpen() {
    setOpenAddPopup(true);
  }

  function handleUpdateDialogOpen() {
    setOpen(true);
  }

  useEffect(() => {
    if (riskState) {
    }
  }, [riskState]);
  function riskSelectedForUpdate(risk: IProjectRisk) {
    if (risk) {
      setRiskSelectedToBeUpdated(risk);
      handleUpdateDialogOpen();
    } else {
    }
  }
  async function updateProjectRisk() {
    if (riskSelectedToBeUpdated) {
      const result = dispatch(addOrUpdateFieldNoteRisk({ risk: riskSelectedToBeUpdated, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
      if (result) {
        handleClose();
      }
    }
  }
  function handleCloseAddPopup() {
    setOpenAddPopup(false);
  }

  function handleClose() {
    setOpen(false);
  }
  function handleNext() {
    props.handleNext();
  }
  function handleBack() {
    props.handleBack();
  }
  return (
    <div>
      <AddFieldRisk open={openAddPopup} handleClose={handleCloseAddPopup} projectId={fieldNoteParams.projectId} organisationId={fieldNoteParams.organisation} fieldNoteId={fieldNoteParams.fieldNoteId}></AddFieldRisk>
      <FieldNoteRiskList handleAddPopupOpen={handleAddPopupOpen} selectedRiskForUpdate={riskSelectedForUpdate}></FieldNoteRiskList>
      <ManageRisk
        open={open}
        handleClose={handleClose}
        handleProjectRiskUpdate={updateProjectRisk}
        projectRisk={riskSelectedToBeUpdated}
      ></ManageRisk>

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
  );
}

export default FieldNoteRisks;