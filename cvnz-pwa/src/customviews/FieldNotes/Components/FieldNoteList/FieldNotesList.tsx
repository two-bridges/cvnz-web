import { Card, CardHeader, Divider, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button, Container, Grid } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectFieldNote } from 'src/redux/actions/FieldNoteFirebaseActions/fieldNoteFirebaseActions';
import { IFieldNote } from 'src/redux/model/fieldNote.model';
import { Store } from 'src/redux/reducers/rootReducer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { getFieldNoteFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteActions';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import Page from 'src/components/Page';
import moment from 'moment';
import _ from 'underscore';
import { fetchProjects } from 'src/redux/actions/Actions/projectActions';
import ConfirmActiveFieldNote from './ConfirmActiveFieldNote';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import { getFieldNotesFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteListActions';
import { loadUsers } from 'src/redux/actions/userActionsV2';

function FieldNotesList() {
  let status = {
    'InProgress': 1,
    'Complete': 2,
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [selectedFieldNote, setSelectedFieldNote] = useState<IFieldNote | undefined>(undefined);

  const fieldNoteParams = useParams<{ organisation: string, id: string }>();
  let allFieldNotes = useSelector((state: Store) => state?.fieldNoteListReducers?.list, (prev, next) => {
    return prev === next;
  });
  if (allFieldNotes) {
    if (fieldNoteParams.id) {
      //project id
      allFieldNotes = _.filter(allFieldNotes, f => f.projectId === fieldNoteParams.id);
    }
    allFieldNotes = allFieldNotes.sort((a, b) => a.created_utc > b.created_utc ? -1 : 1);
    allFieldNotes = allFieldNotes.sort((a, b) => status[a.status] - status[b.status]);
  }
  const projectIdx = useSelector((state: Store) => state?.projectReducers?.idx, (prev, next) => {
    return prev === next;
  });
  const userIdx = useSelector((state: Store) => state?.usersV2?.list, (prev, next) => {
    return prev === next;
  });
  const loggedInUser = useSelector((state: Store) => state?.userSessionV2?.user, (prev, next) => {
    return prev === next;
  });


  //on load
  useEffect(() => {
    if (loggedInUser) {
      if (fieldNoteParams.organisation && !fieldNoteParams.id) {
        dispatch(getFieldNotesFromFirebase({ organisationId: fieldNoteParams.organisation }));
      }
      if (fieldNoteParams.organisation && fieldNoteParams.id) {
        dispatch(getFieldNotesFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.id }));
      }
      dispatch(fetchProjects(fieldNoteParams.organisation));
      dispatch(loadUsers(fieldNoteParams.organisation));
    }

  }, [loggedInUser]);

  const setFieldNote = async (fieldNote: IFieldNote) => {
    if (fieldNote) {
      await dispatch(getFieldNoteFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNote.projectId, fieldNoteId: fieldNote.id }));
    }
    history.push(`/${fieldNoteParams.organisation}/project/${fieldNote.projectId}/fieldNote/${fieldNote.id}`);
  }


  const saveChanges = () => {
    if (selectedFieldNote) {
      dispatch(getProjectFieldNote({ organisationId: fieldNoteParams.organisation, projectId: selectedFieldNote.projectId, fieldNoteId: selectedFieldNote.id }));
      history.push(`/${fieldNoteParams.organisation}/project/${selectedFieldNote.projectId}/fieldNote/${selectedFieldNote.id}`);
    }
  }

  const allFieldNotesComplete = () => {
    if (allFieldNotes) {
      let hasInprogressFieldNote = _.find(allFieldNotes, f => f.status === 'InProgress' && !f.deleted_utc);
      if (hasInprogressFieldNote) {
        return false;
      } else {
        return true;
      }
    }
  }
  const handleClose = () => {
    setOpenConfirmDialog(false);
  }
  return (
    <Page className={classes.root}>
      <Container maxWidth="lg">
        <Grid className={classes.root}>
          <div>
            <Card className={clsx(classes.root)}>

              <CardHeader
                style={{ padding: '15px' }}
                title="Field Notes"
              />
              <Divider />
              <CardContent className={classes.content}>
                <PerfectScrollbar options={{ suppressScrollY: true }}>
                  <div className={classes.inner}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Field Note Date</TableCell>
                          <TableCell>Project</TableCell>
                          <TableCell >Location</TableCell>
                          <TableCell >Status</TableCell>
                          <TableCell >User</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allFieldNotes.filter(n => !n.deleted_utc).map((record: IFieldNote) => (
                          <TableRow hover key={uuid()}>
                            <TableCell>{moment(record.fieldNoteDate).format('DD-MMMM-YYYY')}</TableCell>
                            <TableCell>{projectIdx ? projectIdx[record.projectId]?.projectName : record.projectId}</TableCell>
                            <TableCell>{record.location?.address}</TableCell>
                            <TableCell>{record.status}</TableCell>
                            <TableCell>{userIdx ? ` ${userIdx[record.created_by]?.firstName ? userIdx[record.created_by]?.firstName : ''} ${userIdx[record.created_by]?.lastName ? userIdx[record.created_by]?.lastName : ''}` : ''}</TableCell>
                            <TableCell align="right">
                              <div>
                                <Button onClick={(event) => setFieldNote(record)}>
                                  <ArrowForwardIcon></ArrowForwardIcon>
                                </Button>
                                {/* {allFieldNotesComplete() ? (<div>
                                  <Button onClick={(event) => setFieldNote(record)}>
                                    <ArrowForwardIcon></ArrowForwardIcon>
                                  </Button>
                                </div>) : (<div></div>)
                                }
                                {record.status === 'InProgress' ? (<div>
                                  <Button onClick={(event) => setFieldNote(record)}>
                                    <ArrowForwardIcon></ArrowForwardIcon>
                                  </Button>
                                </div>) : (<div></div>)} */}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </PerfectScrollbar>
              </CardContent>
            </Card>
            <ConfirmActiveFieldNote open={openConfirmDialog} saveChanges={saveChanges} handleClose={handleClose}></ConfirmActiveFieldNote>
          </div>
        </Grid>
      </Container>
    </Page>

  )
}

FieldNotesList.propTypes = {
  className: PropTypes.string,
};

export default FieldNotesList;