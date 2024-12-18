
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@mui/styles';
import ConversationMessage from './ConversationMessage';
import { Theme } from '@mui/material';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    maxHeight: '100%'
  },
  inner: {
    padding: theme.spacing(2)
  }
}));

function ConversationMessages({ messages, className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <PerfectScrollbar>
        <div className={classes.inner}>
          {messages.map(message => {
            return (
              <ConversationMessage
                key={message.id}
                message={message} //
              />
            );
          })}
        </div>
      </PerfectScrollbar>
    </div>
  );
}

ConversationMessages.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.array.isRequired
};

export default ConversationMessages;
