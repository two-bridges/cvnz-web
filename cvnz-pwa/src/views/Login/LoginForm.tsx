/* eslint-disable no-unused-vars */
import { Stores, initDB, saveLocalData } from 'src/indexed-db/db';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Button, Divider, TextField, Theme, Typography } from '@mui/material';
import * as _ from "underscore";
import { IOrganisation } from 'src/redux/model/organisation.model';
import StatusSnackbar from 'src/customviews/SnackBar/StatusSnackBar';
import { loadOrganisation } from 'src/redux/actions/editableOrganisationActions';
import { setActiveOrganisation } from 'src/redux/actions/activeOrganisationActions';
import { orgLoginAction, recoverOrgSession } from 'src/redux/actions/userSessionActions';
import { IUserSession } from 'src/redux/model/userSession.model';
import { Result } from 'src/lib/result.model';
import { myFirebase } from 'src/firebase/firebase';
import ForgotPasswordPopup from './ForgotPasswordPopup';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  // organisation: {
  //   presence: { allowEmpty: false, message: 'is required' }
  // }
};

const useStyles = makeStyles<Theme>((theme: Theme) => {
  return {
    root: {},
    fields: {
      margin: theme.spacing(-1),
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        flexGrow: 1,
        margin: theme.spacing(1)
      }
    },
    submitButton: {
      marginTop: theme.spacing(2),
      width: '100%'
    }
  };
});

export default function LoginForm({ orgName, className = "", ...rest }) {
  const params = useParams<{ organisation: string }>();
  const orgId = params.organisation;

  const classes = useStyles({});
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const [failureMessage, setFailureMessage] = useState('');
  const [openResetPopup, setOpenResetPopup] = useState<boolean>(false);

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });


  const handleInitDB = async () => {
    const status = await initDB();
    setIsDBReady(status);
  };

  console.warn(`isDBReady: ${isDBReady}`);

  // page init
  useEffect(() => {
    handleInitDB();
  }, []);

  useEffect(() => {
    // get the User here and show details on the navbar/profile section
    const unsubOnIdTokenChanged = myFirebase.auth().onIdTokenChanged(async data => {
      try {
        if (params.organisation) {
          // debugger;
          await dispatch(recoverOrgSession(params.organisation));
        }
      } catch (error) {
        unsubOnIdTokenChanged && unsubOnIdTokenChanged();
      }
      try {
        unsubOnIdTokenChanged && unsubOnIdTokenChanged();
      } catch (error) {

      }
    });
  }, [orgId]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    // user login
    const sessionResult = await dispatch(orgLoginAction({
      email: formState.email,
      password: formState.password,
      orgId: orgId
    })) as unknown as Result<IUserSession>;

    if (sessionResult.isFailure) {
      setFailureMessage(sessionResult.error);
      return;
    }
    const userSession = sessionResult.value;
    const saveResult = await saveLocalData(Stores.Users, { data: userSession, id: userSession.fbUser?.uid ?? '' });

    const organisation = await dispatch(loadOrganisation(orgId)) as unknown as IOrganisation;
    if (organisation) {
      await dispatch(setActiveOrganisation(organisation));
      // history.push(`/${organisation.id}/projects`);
      history.push(`/profile/${orgId}/details`);
    }
  };

  const handleChange = event => {
    event.preventDefault();

    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  };

  const forgotPassword = () => {
    setOpenResetPopup(true);
  }
  const closeForgotPasswordPopup = () => {
    setOpenResetPopup(false);
  }

  const sendResetPasswordLink = () => {
    setOpenResetPopup(false);
  }
  return (
    <>
      <ForgotPasswordPopup orgId={orgId} open={openResetPopup} closeForgotPasswordPopup={closeForgotPasswordPopup} sendResetPasswordLink={sendResetPasswordLink}></ForgotPasswordPopup>
      <StatusSnackbar message={failureMessage} panelStatus={'warn'} onClose={() => setFailureMessage('')} />

      <form
        {...rest}
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
      >

        <div className={classes.fields}>
          <TextField
            fullWidth
            label="Email address"
            name="email"
            onChange={handleChange}
            value={formState.email || ''}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.password || ''}
            variant="outlined"
          />
        </div>
        <Typography style={{ marginTop: "10px", cursor: "pointer" }} variant="body2" onClick={forgotPassword}>Forgot password?</Typography>
        <Button
          className={classes.submitButton}
          color="primary"
          size="large"
          type="submit"
          variant="contained"
        >
          Sign in
        </Button>
      </form>

      <Divider></Divider>
      <div>isDBReady: {isDBReady ? 'y' : 'n'}</div>
      <Button
        className={classes.submitButton}
        color="primary"
        size="large"
        type="submit"
        variant="contained"
      >
        Clear Stored Credentials
      </Button>
    </>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string
};
