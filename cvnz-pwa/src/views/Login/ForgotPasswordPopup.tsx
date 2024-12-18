import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Grid, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StatusSnackbar from 'src/customviews/SnackBar/StatusSnackBar';
import { lookupUser, sendOrganisationInviteLoginAction } from 'src/redux/actions/editableUserActions';


function ForgotPasswordPopup(props) {
  const dispatch = useDispatch();

  const [failureMessage, setFailureMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmailAddress] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);


  //close dialog
  const handleClose = (event) => {
    props.closeForgotPasswordPopup(event);
  };

  const handleChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const sendResetLink = async (event) => {
    setLoading(true);
    const lookupResult = await lookupUser(email);
    if (lookupResult.isSuccess && lookupResult.value?.uid) {
      await dispatch(sendOrganisationInviteLoginAction(email, props.orgId));
      setSuccessMessage("Reset password link sent");
      handleClose(event);
    } else {
      setFailureMessage("User: not found");
    }
    setLoading(false);

  };

  return (
    <>
      {
        loading ? (<LinearProgress></LinearProgress>) : (<div></div>)
      }
      <StatusSnackbar message={failureMessage} panelStatus={'error'} onClose={() => setFailureMessage('')} />
      <StatusSnackbar message={successMessage} panelStatus={'success'} onClose={() => setSuccessMessage('')} />

      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Reset Password
        </DialogTitle>
        <DialogContent style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <Grid container>
            <Grid item >
              <TextField
                fullWidth
                style={{ width: "250px" }}
                label="Email address"
                name="email"
                onChange={handleChange}
                value={email || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={sendResetLink}
            color="primary">
            Send Link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ForgotPasswordPopup
