import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';


// DG: 
/** ISSUES
 * Issue iOS: showing a PDF in an iframe on iOS (simulator or physical) does not work well.  The rendering in the iFrame is missing ability to scroll vertically or someth8ing
 * Issuee Android: showing a PDF in an iframe on Android (physical) does not work well.  The popup iframe does not render the PDF (eg. browser lacks PDF rendering).  So, it wants to download and then open it locally in Google Drive, which is weird. 
 * Solution: it's best to just open a new tab and render the PDF in there.  This may cause an issue if the PWA is running as an app icon?  Eg. can you have multiple tabs??
 * 
  * @param props 
 * @returns 
 */
function ViewPdfPopup(props) {
  const handleClose = () => {
    props.handleCloseViewPdfPopup();
  }
  return (
    <Dialog
      fullScreen={true}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"

    >
      <DialogContent style={{ display: 'flex' }}>
        {
          props.fileUrl
            ? (<iframe src={props.fileUrl} style={{ flex: '1 1 0%' }}></iframe>)
            : (<div>No PDF uploaded</div>)

        }

      </DialogContent >
      <DialogActions>
        <Button type="submit"
          variant="contained"
          size='small'
          color='primary' onClick={handleClose}>Close</Button>

      </DialogActions>
    </Dialog >
  )
}

ViewPdfPopup.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  fileUrl: PropTypes.string,
  saveChanges: PropTypes.func,
  message: PropTypes.string,
  handleCloseViewPdfPopup: PropTypes.func,
};
export default ViewPdfPopup;