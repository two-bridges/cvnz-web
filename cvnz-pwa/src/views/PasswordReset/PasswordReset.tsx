
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Theme } from '@mui/material';
import * as _ from "underscore";
import { IOrganisation } from 'src/redux/model/organisation.model';
import StatusSnackbar from 'src/customviews/SnackBar/StatusSnackBar';
import { loadOrganisation } from 'src/redux/actions/editableOrganisationActions';
import { setActiveOrganisation } from 'src/redux/actions/activeOrganisationActions';
import { orgLoginAction, recoverOrgSession } from 'src/redux/actions/userSessionActions';
import { IUserSession } from 'src/redux/model/userSession.model';
import { Result } from 'src/lib/result.model';
import { myFirebase } from 'src/firebase/firebase';
import { Store } from 'src/redux/reducers/rootReducer';
import { updatePassword, verifyPasswordResetCode } from 'src/redux/actions/editableUserActions';

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

const useStyles = makeStyles<Theme>((theme: Theme) => ({
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
}));

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}


export default function PasswordResetForm({ orgName, className = "", ...rest }) {
  const params = useParams<{ organisation: string, oobCode: string }>();
  const query = useQuery();
  const oobCode = query.get('oobCode') ?? '';
  const orgId = params.organisation;
  // const editableOrganisation = useSelector((state: Store) => state?.editableOrganisation);

  const classes = useStyles({});
  const history = useHistory();
  const dispatch = useDispatch();
  const [failureMessage, setFailureMessage] = useState('');
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  // useEffect(() => {
  //   // get the User here and show details on the navbar/profile section
  //   try {
  //     if (params.organisation) {

  //       await dispatch(recoverOrgSession(params.organisation));
  //       await dispatch(loadOrganisation(params.organisation));
  //     }

  //   } catch (error) {
  //     unsubOnIdTokenChanged && unsubOnIdTokenChanged();

  //   }
  //   const unsubOnIdTokenChanged = myFirebase.auth().onIdTokenChanged(async data => {
  //     try {
  //       unsubOnIdTokenChanged && unsubOnIdTokenChanged();
  //     } catch (error) {

  //     }

  //   });
  // }, [orgId]);

  useEffect(() => {

    let pVerifyPasswordResetCode = dispatch(verifyPasswordResetCode(oobCode)) as any as Promise<Result<string>>;
    pVerifyPasswordResetCode.then((validateResult) => {
      if (validateResult.isSuccess) {
        setFormState({
          ...formState,
          email: validateResult.value,
        });
      }
    });

  }, [oobCode]);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();

    let resetResult = await dispatch(updatePassword(oobCode, formState.password)) as any as Result<boolean>;

    if (resetResult.isFailure) {
      setFailureMessage(resetResult.error);
      return;
    }

    if (orgId) {
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

  return (
    orgId ?
      <>
        <StatusSnackbar message={failureMessage} panelStatus={'warn'} onClose={() => setFailureMessage('')} />
        <div>{oobCode}</div>
        <form
          {...rest}
          className={clsx(classes.root, className)}
        >

          <div className={classes.fields}>
            <TextField
              fullWidth
              label="Email address"
              name="email"
              onChange={handleChange}
              disabled={true}
              value={formState.email || ''}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="New Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.password || ''}
              variant="outlined"
            />
          </div>
          <Button
            className={classes.submitButton}
            onClick={handleUpdatePassword}
            color="secondary"
            size="large"
            type="submit"
            variant="contained"
          >
            Update Password
          </Button>
        </form>
      </> : <></>
  );
}

PasswordResetForm.propTypes = {
  className: PropTypes.string
};