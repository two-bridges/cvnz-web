
import React from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    zIndex: theme.zIndex.drawer - 100
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));



export default function SpeedDialTooltipOpen(props) {
  const classes = useStyles({});
  const [open, setOpen] = React.useState<any>(false);

  const actions = [
    { icon: <FileCopyIcon />, name: 'Record', action: '/record/create' },
    { icon: <AddBoxOutlinedIcon />, name: 'Project', action: `/project/new` }
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const handleClick = (event, action) => {
    setOpen(false);
    history.push(action.action);
  };

  return (
    <div className={classes.root}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={event => handleClick(event, action)}

          />
        ))}
      </SpeedDial>
    </div>
  );
}
