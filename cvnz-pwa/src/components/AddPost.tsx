
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip
  , Theme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { RootState } from '../redux/reducers/rootReducer';
// import { ISession } from '../redux/reducers/sessionReducer';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

function AddPost({ className = "", ...rest }) {
  const classes = useStyles(rest);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<any>('');
  // const session = useSelector<RootState, ISession>((state) => state.session);

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current && fileInputRef.current.click();

  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Paper
          className={classes.paper}
          elevation={1}
        >
          <Input
            className={classes.input}
            disableUnderline
            onChange={handleChange}
            placeholder={`What's on your mind`}
          />
        </Paper>
        <Tooltip title="Send">
          <IconButton color={value.length > 0 ? 'primary' : 'default'} size="large">
            <SendIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} />
        <Tooltip title="Attach image">
          <IconButton edge="end" onClick={handleAttach} size="large">
            <AddPhotoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Attach file">
          <IconButton edge="end" onClick={handleAttach} size="large">
            <AttachFileIcon />
          </IconButton>
        </Tooltip>
        <input
          className={classes.fileInput}
          ref={fileInputRef}
          type="file"
        />
      </CardContent>
    </Card>
  );
}

AddPost.propTypes = {
  className: PropTypes.string
};

export default AddPost;
