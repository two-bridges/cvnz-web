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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { IInductionStaff } from 'src/redux/model/fieldNote.model';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { getFieldNoteStaffsFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteStaffListActions';
import { useParams } from 'react-router';


function FieldNoteStaffList(props) {
  const dispatch = useDispatch();
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);

  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const staffsState = useSelector((state: Store) => state?.fieldNoteStaffList?.list, (prev, next) => {
    return prev === next;
  });

  const [staff, setSelectedStaff] = useState<IInductionStaff | undefined>(undefined);
  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });

  useEffect(() => {
    dispatch(getFieldNoteStaffsFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));
  }, []);
  function setStaff(event, staff) {
    event.preventDefault();
    props.selectedStaffForUpdate(staff);
  }

  function deleteStaff(event, staff) {
    event.preventDefault();
    setOpen(true);
    props.selectedStaffForDelete(staff);
  }

  function handleAddPopupOpen() {
    props.handleAddPopupOpen(staff);
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title="Staff"
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
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffsState?.map((staff: IInductionStaff) => (
                    <TableRow
                      hover
                      key={staff.id}
                    >
                      <TableCell>{staff.firstName}</TableCell>
                      <TableCell>{staff.lastName}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>
                        {
                          activeFieldNote?.status === 'Complete' ? (<div></div>) : (<div>
                            <Edit onClick={(event) => setStaff(event, staff)}></Edit>
                          </div>)
                        }
                      </TableCell>
                      <TableCell>
                        {
                          activeFieldNote?.status === 'Complete' ? (<div></div>) : (<div>
                            <DeleteIcon onClick={(event) => deleteStaff(event, staff)}></DeleteIcon>
                          </div>)
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions disableSpacing>
          <Grid item alignItems="flex-end"
            container
            justifyContent="flex-end"
            spacing={3}>
            <Button color="primary" size="small" variant="contained" style={{ marginRight: "10px" }} onClick={handleAddPopupOpen} disabled={activeFieldNote?.status === 'Complete'}>
              ADD
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}

FieldNoteStaffList.propTypes = {
  className: PropTypes.string,
  selectedStaffForUpdate: PropTypes.func,
  selectedStaffForDelete: PropTypes.func,
  handleAddPopupOpen: PropTypes.func,
};
export default FieldNoteStaffList;

