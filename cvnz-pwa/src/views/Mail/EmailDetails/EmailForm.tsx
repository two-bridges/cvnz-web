
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Paper,
  Button,
  IconButton,
  Tooltip
  , Theme
} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  textArea: {
    ...theme.typography.body1,
    border: 'none',
    outline: 'none',
    resize: 'none',
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  sendButton: {
    marginRight: theme.spacing(2)
  },
  fileInput: {
    display: 'none'
  }
}));

function EmailForm({ className = "", ...rest }) {
  const classes = useStyles({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<any>('');
  const sender = {
    avatar: '/images/avatars/avatar_11.png'
  };

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        src={sender.avatar}
      />
      <Paper
        className={classes.paper}
        elevation={1}
      >
        <TextareaAutosize
          className={classes.textArea}
          onChange={handleChange}
          placeholder="Leave a message"
          minRows={6}
          value={value}
        />
        <div className={classes.actions}>
          <Button
            className={classes.sendButton}
            color="primary"
            variant="contained"
          >
            Send
          </Button>
          <Tooltip title="Attach image">
            <IconButton onClick={handleAttach} size="large">
              <AddPhotoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach file">
            <IconButton onClick={handleAttach} size="large">
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
}

EmailForm.propTypes = {
  className: PropTypes.string
};

export default EmailForm;
