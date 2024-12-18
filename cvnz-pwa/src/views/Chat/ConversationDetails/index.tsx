
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Divider, Theme } from '@mui/material';
import ConversationToolbar from './ConversationToolbar';
import ConversationMessages from './ConversationMessages';
import ConversationForm from './ConversationForm';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white
  }
}));

function ConversationDetails({ conversation, className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ConversationToolbar conversation={conversation} />
      <Divider />
      <ConversationMessages messages={conversation.messages} />
      <Divider />
      <ConversationForm />
    </div>
  );
}

ConversationDetails.propTypes = {
  className: PropTypes.string,
  conversation: PropTypes.object.isRequired
};

export default ConversationDetails;
