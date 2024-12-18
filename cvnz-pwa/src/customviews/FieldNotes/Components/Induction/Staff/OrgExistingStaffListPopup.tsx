import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, Radio } from '@mui/material';
import { Edit } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { IInductionStaff } from 'src/redux/model/fieldNote.model';
import PerfectScrollbar from 'react-perfect-scrollbar';


function OrgExistingStaffListPopup(props) {
  const [staff, setStaff] = useState<IInductionStaff | undefined>(undefined);

  const handleClose = () => {
    props.closeStaffListPopup();
    setStaff(undefined);
  }
  const setSelectedStaff = (event, staff: IInductionStaff) => {
    setStaff(staff);
  }
  const addSelectedStaff = () => {
    if (staff) {
      props.addSelectedStaff(staff);
      props.closeStaffListPopup();
    }
  }
  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {"Staff List"}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {props.matchingStaffs?.map((s: IInductionStaff) => (
                  <TableRow hover key={s.id}>
                    <TableCell>
                      <Radio checked={s.id === staff?.id} onClick={(event) => setSelectedStaff(event, s)} />
                    </TableCell>
                    <TableCell>{s.firstName}</TableCell>
                    <TableCell>{s.lastName}</TableCell>
                    <TableCell>{s.email}</TableCell>
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
        <Button size="small" variant="contained" onClick={addSelectedStaff} color="primary" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrgExistingStaffListPopup