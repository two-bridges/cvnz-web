
import React from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
  Toolbar,
  Input,
  IconButton,
  Tooltip,
  Divider,
  List
  , Theme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConversationListItem from './ConversationListItem';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white
  },
  searchInput: {
    flexGrow: 1
  }
}));

function ConversationList({ conversations, className = "", ...rest }) {
  const classes = useStyles({});
  const params = useParams<any>();
  const selectedConversation = params.id;

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder="Search contacts"
        />
        <Tooltip title="Search">
          <IconButton edge="end" size="large">
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <List disablePadding>
        {conversations.map((conversation, i) => (
          <ConversationListItem
            active={conversation.id === selectedConversation}
            conversation={conversation}
            divider={i < conversations.length - 1}
            key={conversation.id}
          />
        ))}
      </List>
    </div>
  );
}

ConversationList.propTypes = {
  className: PropTypes.string,
  conversations: PropTypes.array.isRequired
};

export default ConversationList;
