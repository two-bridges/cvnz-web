import { Button, Card, CardActions, CardHeader, Grid } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { IProject } from 'src/redux/model/project.model';
import { Store } from 'src/redux/reducers/rootReducer';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { IFieldNote } from 'src/redux/model/fieldNote.model';
import ConfirmFieldNoteSavePopup from './ConfirmFieldNoteSavePopup';
import { Link as RouterLink } from 'react-router-dom';
import firebase from 'firebase';
import { addOrUpdateFieldNote, getFieldNoteFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteActions';
import { setFieldNoteActiveProject } from 'src/redux/actions/Actions/orgProjectActions';

const app = firebase.app();
const functions = app.functions("australia-southeast1");

function SaveFieldNote(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });
  //on load
  useEffect(() => {
    if (!activeFieldNote) {
      dispatch(getFieldNoteFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId ?? 'new', fieldNoteId: fieldNoteParams.fieldNoteId ?? 'new' }));
    }
  }, []);


  const confirmSave = () => {
    setOpenConfirmDialog(true);
  }
  const handleClose = () => {
    setOpenConfirmDialog(false);
  }

  const saveChanges = async () => {
    if (activeFieldNote) {
      activeFieldNote.status = 'Complete';
      //SAVE fieldNotes
      let fieldNote = (await dispatch(addOrUpdateFieldNote({ note: activeFieldNote, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: activeFieldNote.id }))) as unknown as IFieldNote;
      if (fieldNote) {
        var test = await functions.httpsCallable("reCalculate");
        test({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId }).then(result => {
          console.log(result);
        }).catch(function (error) {
          console.log("error", error);
        });
      }

      (await dispatch(setFieldNoteActiveProject(undefined)));

      history.push(`/organisation/${fieldNoteParams.organisation}/fieldNoteLists`);
    }
  }

  function handleBack() {
    props.handleBack();
  }

  return (
    <div>
      <Card>
        <CardHeader title="Save Field Note" />

        <CardActions style={{ marginTop: '5px', marginBottom: '5px' }}>
          <Grid item alignItems="flex-end"
            container
            justifyContent="flex-end"
            spacing={3}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={handleBack}
              type="submit"
              size='small'
              color='primary'
              variant="contained">
              BACK
            </Button>
            {activeFieldNote?.status != 'Complete' ? (<Button
              onClick={confirmSave}
              type="submit"
              size='small'
              color='primary'
              variant="contained"
            >
              SAVE
            </Button>
            ) : (
              <div>
                <Button
                  component={RouterLink}
                  color='primary'
                  size='small'
                  to={`/organisation/${fieldNoteParams.organisation}/fieldNoteLists`}
                  variant="contained">Go To List</Button>
              </div>
            )
            }


          </Grid>
        </CardActions>
      </Card>

      <ConfirmFieldNoteSavePopup open={openConfirmDialog} saveChanges={saveChanges} handleClose={handleClose}></ConfirmFieldNoteSavePopup>
    </div>
  );
}
SaveFieldNote.propTypes = {
  handleBack: PropTypes.func,
};

export default SaveFieldNote;