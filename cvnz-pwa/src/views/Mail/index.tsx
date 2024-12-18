
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import axios from '../../utils/axios';
import Page from '../../components/Page';
import EmailFolders from './EmailFolders';
import EmailList from './EmailList';
import EmailDetails from './EmailDetails';
import { Theme } from '@mui/material';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '@media (max-width: 780px)': {
      '& $emailFolders, & $emailList, & $emailDetails': {
        flexBasis: '100%',
        width: '100%',
        maxWidth: 'none',
        flexShrink: 0,
        transition: 'transform .5s ease',
        transform: 'translateX(0)'
      }
    }
  },
  openFolder: {
    '@media (max-width: 780px)': {
      '& $emailFolders, & $emailList, & $emailDetails': {
        transform: 'translateX(-100%)'
      }
    }
  },
  emailFolders: {
    flexBasis: 280,
    flexShrink: 0,
    flexGrow: 0,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  emailList: {
    flexGrow: 1
  },
  emailDetails: {
    flexGrow: 1
  }
}));

function Mail() {
  const classes = useStyles({});
  const [emails, setEmails] = useState<any>([]);
  const [openFolder, setOpenFolder] = useState<any>(false);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);

  const handleFolderOpen = () => {
    setOpenFolder(true);
    setSelectedEmail(null);
  };

  const handleFolderClose = () => {
    setOpenFolder(false);
  };

  const handleEmailOpen = () => {
    setSelectedEmail(emails[0]);
  };

  const handleEmailClose = () => {
    setSelectedEmail(null);
  };

  useEffect(() => {
    let mounted = true;

    const fetchEmails = () => {
      axios.get('/api/mail').then((response) => {
        if (mounted) {
          setEmails(response.data.emails);
        }
      });
    };

    fetchEmails();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={clsx({
        [classes.root]: true,
        [classes.openFolder]: openFolder
      })}
      title="Mail"
    >
      <EmailFolders
        className={classes.emailFolders}
        onFolderOpen={handleFolderOpen}
      />
      {selectedEmail ? (
        <EmailDetails
          className={classes.emailDetails}
          email={selectedEmail}
          onEmailClose={handleEmailClose}
        />
      ) : (
        <EmailList
          className={classes.emailList}
          emails={emails}
          onBack={handleFolderClose}
          onEmailOpen={handleEmailOpen}
        />
      )}
    </Page>
  );
}

export default Mail;