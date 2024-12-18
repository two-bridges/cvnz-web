import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, Radio } from '@mui/material';
import { Edit } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { IInductionStaff, IInductionVolunteer } from 'src/redux/model/fieldNote.model';
import PerfectScrollbar from 'react-perfect-scrollbar';


function OrgExistingVolunteerListPopup(props) {
  const [volunteer, setVolunteer] = useState<IInductionVolunteer | undefined>(undefined);

  const handleClose = () => {
    props.closeVolListPopup();
    setVolunteer(undefined);
  }
  const setSelectedVolunteer = (event, volunteer: IInductionVolunteer) => {
    setVolunteer(volunteer);
  }
  const addSelectedVolunteer = () => {
    if (volunteer) {
      props.addSelectedVolunter(volunteer);
      props.closeVolListPopup();
    }
  }
  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {"Volunteer List"}
      </DialogTitle>
      <DialogContent>
        <PerfectScrollbar options={{ suppressScrollY: true }}>
          <div style={{
            height: "300px",
            overflow: "scroll"
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> </TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email </TableCell>
                  <TableCell>Phone </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.matchingVolunteers?.map((vol: IInductionVolunteer) => (
                  <TableRow hover key={vol.id}>
                    <TableCell>
                      <Radio id={vol.id} checked={vol.id === volunteer?.id} onChange={(event) => setSelectedVolunteer(event, vol)}
                      /></TableCell>
                    <TableCell>{vol.firstName}</TableCell>
                    <TableCell>{vol.lastName}</TableCell>
                    <TableCell>{vol.email}</TableCell>
                    <TableCell>{vol.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="contained" onClick={handleClose} color="primary">
          Close
        </Button>
        <Button size="small" variant="contained" onClick={addSelectedVolunteer} color="primary" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrgExistingVolunteerListPopup