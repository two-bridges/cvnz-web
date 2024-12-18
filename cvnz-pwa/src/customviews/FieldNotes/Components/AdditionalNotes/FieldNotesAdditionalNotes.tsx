
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { addOrUpdateAdditionalFieldNote } from 'src/redux/actions/FieldNoteActions/fieldAdditionalNoteActions';
import { CreateNewFieldNoteAdditionalNote, CreateNewImageUpload } from 'src/redux/model/fieldNote.model';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { IProject } from 'src/redux/model/project.model';
import { Store } from 'src/redux/reducers/rootReducer';
import PhotoUpload from '../FieldNotePhotoUpload/PhotoUpload';


function FieldNotesAdditionalNotes() {
  const dispatch = useDispatch();
  const classes = useStyles({})
  const [additionRiskControls, setAdditionalRiskControls] = useState<string>('');
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();



  const setAdditionalControls = (event) => {
    event.preventDefault();
    setAdditionalRiskControls(event.target.value);
  }
  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });

  const handleSubmit = async () => {
    let newNote = CreateNewFieldNoteAdditionalNote();
    newNote.description = additionRiskControls;
    let noteSaved = await dispatch(addOrUpdateAdditionalFieldNote({ note: newNote, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
    if (noteSaved) {
      setAdditionalRiskControls('');
    }
  }


  return (
    <Card className={classes.root} >
      <CardHeader title={'Notes'}
        style={{ width: '100%' }}
        titleTypographyProps={{ variant: 'h4' }}
      />

      <CardContent>
        <Tooltip title="Description text is limited to 500 characters" arrow>
          <TextField
            inputProps={{
              maxLength: 500,
            }}
            fullWidth
            label="Description"
            name="Description"
            onChange={setAdditionalControls}
            value={additionRiskControls}
            variant="outlined"
            multiline
          />
        </Tooltip>
      </CardContent>

      <CardActions>
        <Grid item alignItems="flex-end"
          container
          justifyContent="flex-end"
        >
          <Button
            onClick={handleSubmit}
            type="submit"
            size='small'
            color='primary'
            variant="contained"
            disabled={activeFieldNote?.status === 'Complete' || !additionRiskControls}
          >
            Add
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );

}


export default FieldNotesAdditionalNotes;