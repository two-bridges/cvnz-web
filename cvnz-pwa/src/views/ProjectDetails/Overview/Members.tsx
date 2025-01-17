
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  colors
  , Theme
} from '@mui/material';
import getInitials from '../../../utils/getInitials';

const useStyles = makeStyles<Theme>(() => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0
  },
  actions: {
    backgroundColor: colors.grey[50]
  }
}));

function Members({ members, className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        className={classes.header}
        title="Project members"
        titleTypographyProps={{
          variant: 'overline'
        }}
      />
      <CardContent className={classes.content}>
        <List>
          {members.map((member) => (
            <ListItem
              disableGutters
              key={member.id}
            >
              <ListItemAvatar>
                <Avatar
                  alt="Author"
                  className={classes.avatar}
                  src={member.avatar}
                >
                  {getInitials(member.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.name}
                primaryTypographyProps={{ variant: 'h6' }}
                secondary={member.bio}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button fullWidth>Manage users</Button>
      </CardActions>
    </Card>
  );
}

Members.propTypes = {
  className: PropTypes.string,
  members: PropTypes.array.isRequired
};

export default Members;
