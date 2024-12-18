import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { addOrUpdateFieldNoteVolunteer } from 'src/redux/actions/FieldNoteActions/fieldNoteVolunteerActions';
import { IInductionVolunteer } from 'src/redux/model/fieldNote.model';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ViewPdfPopup from 'src/customviews/Projects/Create/ViewPdfPopup';
import { fetchFieldNoteActiveProject } from 'src/redux/actions/activeFieldNoteProject';
import { useParams } from 'react-router';
import { getFieldNoteVolunteersFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteVolunteerListActions';

function FieldNoteVolunteerList(props) {
  const dispatch = useDispatch();
  const classes = useStyles({});
  const [viewUploadedPdf, setViewUploadedPdf] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [volunteer, setSelectedVolunteer] = useState<IInductionVolunteer | undefined>(undefined);

  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const volunteerStateList = useSelector((state: Store) => state?.fieldNoteVolunteerList?.list, (prev, next) => {
    return prev === next;
  });

  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });

  const fieldNoteProject = useSelector((state: Store) => state?.activeFieldNoteProjectReducers?.single, (prev, next) => {
    return prev === next;
  });

  function deleteVolunteer(event, volunteer) {
    setOpen(true);
    props.selectedVolunteerForDelete(volunteer);
  }
  useEffect(() => {
    if (fieldNoteParams.organisation && fieldNoteParams.projectId) {
      dispatch(fetchFieldNoteActiveProject(fieldNoteParams.organisation, fieldNoteParams.projectId));
    }
  }, [fieldNoteParams]);

  useEffect(() => {
    dispatch(getFieldNoteVolunteersFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));
  }, []);
  function setVolunteer(event, volunteer) {
    props.selectedVolunteerForUpdate(volunteer);
  }

  function handleAddPopupOpen() {
    props.handleAddPopupOpen(volunteer);
  }

  function handleCloseViewPdfPopup() {
    setViewUploadedPdf(false);
  }

  const showPdf = () => {
    setViewUploadedPdf(true);
  }
  async function handleInductionStatusChange(event, volunteer: IInductionVolunteer) {
    if (event.target.type === 'checkbox') {
      volunteer.inductionStatus = event.target.checked;
    }
    props.addOrUpdateInFirebase(volunteer);
  }
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title="Volunteers"
          titleTypographyProps={{ variant: 'h4', fontWeight: 'normal' }}
          subheaderTypographyProps={{ variant: 'body1' }}
        />
        <Divider />
        <CardContent>
          <PerfectScrollbar options={{ suppressScrollY: true }}>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email </TableCell>
                    <TableCell>Phone </TableCell>
                    <TableCell>Induction status</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteerStateList?.filter(f => !f.deleted_utc).map((volunteer: IInductionVolunteer) => (
                    <TableRow
                      hover
                      key={volunteer.id}
                    >
                      <TableCell>{volunteer.firstName}</TableCell>
                      <TableCell>{volunteer.lastName}</TableCell>
                      <TableCell>{volunteer.email}</TableCell>
                      <TableCell>{volunteer.phone}</TableCell>
                      <TableCell>
                        <Switch
                          checked={volunteer.inductionStatus}
                          onChange={(event) => handleInductionStatusChange(event, volunteer)}
                          value={volunteer.inductionStatus}
                          color="primary"
                          name="inductionStatus"
                        />
                      </TableCell>
                      <TableCell>
                        {
                          activeFieldNote?.status != 'Complete' ? (
                            <div>
                              <Edit onClick={(event) => setVolunteer(event, volunteer)}> </Edit>
                            </div>) : (
                            <div></div>
                          )
                        }
                      </TableCell>
                      <TableCell>
                        {
                          activeFieldNote?.status === 'Complete' ? (<div></div>) : (
                            <DeleteIcon onClick={(event) => deleteVolunteer(event, volunteer)}></DeleteIcon>
                          )
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <ViewPdfPopup open={viewUploadedPdf} fileUrl={fieldNoteProject?.inductionNotes} handleCloseViewPdfPopup={handleCloseViewPdfPopup}></ViewPdfPopup>

        <CardActions disableSpacing>
          <Grid item alignItems="flex-end"
            container
            justifyContent="flex-end"
            spacing={3}>

            <Button
              color="primary"
              size="small"
              variant="contained"
              style={{ marginRight: "10px" }}
              onClick={showPdf}>
              Induction pdf
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleAddPopupOpen}
              disabled={activeFieldNote?.status === 'Complete'}>
              ADD
            </Button>

          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}

FieldNoteVolunteerList.propTypes = {
  className: PropTypes.string,
  selectedVolunteerForUpdate: PropTypes.func,
  selectedVolunteerForDelete: PropTypes.func,
  handleAddPopupOpen: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  handleChange: PropTypes.func,
  addOrUpdateInFirebase: PropTypes.func

};
export default FieldNoteVolunteerList
  ;

