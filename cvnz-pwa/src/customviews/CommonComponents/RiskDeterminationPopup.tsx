import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from './RiskDeterminationStyle';
import CloseIcon from '@mui/icons-material/Close';
function RiskDeterminationPopup(props) {
  const [open, setOpen] = useState<any>(false);
  const classes = useStyles({});
  const handleClose = () => {
    props.handleClose()
  }

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle style={{ padding: '0px', paddingLeft: '10px' }}>
        <IconButton
          onClick={handleClose}
          style={{ float: 'right', marginRight: '10px' }}
          size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ marginBottom: '10px' }}>
        <table style={{ border: '1px solid black', width: '100%', borderSpacing: '0px' }}>
          <tbody>
            <tr><th style={{ height: '80px', textAlign: 'center', borderBottom: '1px solid black' }} colSpan={7}>Consequence</th></tr>
            <tr><th style={{ textAlign: 'center', transform: 'rotate(270deg)' }} rowSpan={7}>Likelihood</th></tr>
            <tr>
              <th style={{ borderLeft: '1px solid black', borderBottom: '1px solid black', paddingLeft: '10px', paddingRight: '10px' }}></th>
              <th className={classes.tableBorderLeft}>Insignificant</th>
              <th className={classes.tableBorderLeft}>Minor</th>
              <th className={classes.tableBorderLeft}>Moderate</th>
              <th className={classes.tableBorderLeft}>Major</th>
              <th className={classes.tableBorderLeft}>Catastrophic</th>
            </tr>
            <tr>
              <td style={{ borderLeft: '1px solid black', borderBottom: '1px solid black', paddingLeft: '10px', paddingRight: '10px' }}>Highly unlikely</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#AFD89F' }}>L</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#AFD89F' }}>L</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#AFD89F' }}>L</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFFF9E' }}>M</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFC0CB' }}>H</td>
            </tr>
            <tr>
              <td style={{ borderLeft: '1px solid black', borderBottom: '1px solid black', paddingLeft: '10px', paddingRight: '10px' }}>Unlikely</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#AFD89F' }}>L</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFFF9E' }}>M</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFFF9E' }}>M</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFC0CB' }}>H</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFC0CB' }}>H</td>
            </tr>
            <tr>
              <td style={{ borderLeft: '1px solid black', borderBottom: '1px solid black', paddingLeft: '10px', paddingRight: '10px' }}>Quite Possible</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#AFD89F' }}>L</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFFF9E' }}>M</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFC0CB' }}>H</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFC0CB' }}>H</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#F79BB4' }}>E</td>
            </tr>

            <tr>
              <td style={{ borderLeft: '1px solid black', borderBottom: '1px solid black', paddingLeft: '10px', paddingRight: '10px' }}>Likely</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFFF9E' }}>M</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFC0CB' }}>H</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#FFC0CB' }}>H</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#F79BB4' }}>E</td>
              <td className={classes.tableTr} style={{ backgroundColor: '#F79BB4' }}>E</td>
            </tr>
            <tr>
              <td style={{ borderLeft: '1px solid black', paddingLeft: '10px', paddingRight: '10px' }}>Almost Certain</td>
              <td className={classes.lastRow} style={{ backgroundColor: '#FFFF9E' }}>M</td>
              <td className={classes.lastRow} style={{ backgroundColor: '#FFC0CB' }}>H</td>
              <td className={classes.lastRow} style={{ backgroundColor: '#F79BB4' }}>E</td>
              <td className={classes.lastRow} style={{ backgroundColor: '#F79BB4' }}>E</td>
              <td className={classes.lastRow} style={{ backgroundColor: '#F79BB4' }}>E</td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
}


export default RiskDeterminationPopup;