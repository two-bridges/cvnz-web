import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, CardHeader, Divider, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { IFieldNoteAdditionalNote } from 'src/redux/model/fieldNote.model';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NotesPhotoUpload from './NotesPhotoUpload';
import NoteImagesList from './NoteImagesList';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import uuid from 'uuid/v1';
import { getAdditionalFieldNoteFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldAdditionalNoteListActions';
import { useParams } from 'react-router';

function FieldAdditionalNoteList(props) {
  const dispatch = useDispatch();
  const classes = useStyles({})
  const [openImagePopup, setOpenImagePopup] = React.useState(false);
  const [openImageListPopup, setOpenImageListPopup] = React.useState(false);
  const [note, setNote] = React.useState<IFieldNoteAdditionalNote | undefined>(undefined);
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const openPhotoUploadPopup = (event, note) => {
    setOpenImagePopup(true);
    setNote(note)
  }
  const closePhotoUploadPopup = () => {
    setOpenImagePopup(false)
  }

  const openNoteImageListPopup = (event, note) => {
    setOpenImageListPopup(true);
    setNote(note)

  }
  const closeImageListPopup = () => {
    setOpenImageListPopup(false)
  }
  const noteState = useSelector((state: Store) => state?.fieldAdditionalNoteList?.list, (prev, next) => {
    return prev === next;
  });
  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });
  useEffect(() => {
    dispatch(getAdditionalFieldNoteFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));
  }, []);

  return (
    <Card
      className={classes.root}
    >
      <CardHeader
        title="Additional Notes"
        titleTypographyProps={{ variant: 'h4', fontWeight: 'normal' }}
        subheaderTypographyProps={{ variant: 'body1' }}
      />
      <Divider />
      <CardContent>
        {noteState ?
          (
            <div>
              <PerfectScrollbar options={{ suppressScrollY: true }}>
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {noteState?.map((note: IFieldNoteAdditionalNote) => (
                        <TableRow
                          hover
                          key={uuid()}>
                          <TableCell>{note.description}</TableCell>
                          <TableCell>
                            {
                              activeFieldNote?.status === 'Complete' ? (<div></div>) : (
                                <div>
                                  <AddAPhotoIcon
                                    style={{ marginRight: '10px', float: 'right' }}
                                    onClick={(event) => openPhotoUploadPopup(event, note)}
                                  />
                                </div>
                              )
                            }

                          </TableCell>
                          <TableCell>
                            {
                              note?.images?.length > 0 ? (<div>
                                <PhotoLibrary
                                  onClick={(event) => openNoteImageListPopup(event, note)}
                                  style={{ marginRight: '10px', float: 'right' }}

                                ></PhotoLibrary>

                              </div>) : (<div></div>)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </PerfectScrollbar>
              <NotesPhotoUpload open={openImagePopup} note={note} handleClose={closePhotoUploadPopup}></NotesPhotoUpload>
              <NoteImagesList open={openImageListPopup} note={note} handleClose={closeImageListPopup}></NoteImagesList>
            </div>
          ) : (
            <div></div>
          )
        }
      </CardContent >
    </Card >

  );
}

FieldAdditionalNoteList.propTypes = {
  className: PropTypes.string,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};
export default FieldAdditionalNoteList
  ;

