
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { useHistory } from 'react-router';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Theme } from '@mui/material';
import * as _ from "underscore";
import FormHelperText from '@mui/material/FormHelperText';
import * as userSessionActions from "../../../redux/actions/userSessionActions";
import { store } from "../../../redux/store/configureStore";
import { IOrganisation } from 'src/redux/model/organisation.model';
import { rootState, Store } from 'src/redux/reducers/rootReducer';
import { isDev } from 'src/environment/environment';
import StatusSnackbar from 'src/customviews/SnackBar/StatusSnackBar';
import { Result } from 'src/lib/result.model';
import { IUserSession } from 'src/redux/model/userSession.model';

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

interface Props {
  className: string,
  children?: React.ReactNode,
  actions,
};

function AdminLoginForm({ className = "", actions }) {
  // const [organisation, setOrganisation] = useState<IOrganisation | undefined>(undefined);
  const dispatch = useDispatch();
  const classes = useStyles({});
  const history = useHistory();
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const userSession = useSelector((state: Store) => state?.userSessionV2, (prev, next) => {
    // only execute hook when email has changed value
    return prev?.user?.email === next?.user?.email;
  });

  // On Load
  useEffect(() => {
    if (!isDev) {
      console.log('## AdminLoginForm - LOAD ##');
      dispatch(userSessionActions.signOut());
    }
  }, []);

  useEffect(() => {
    if (userSession?.loggedIn && userSession?.isSysAdmin) {
      history.push('/admin/organisations');
    }
  }, [userSession]);

  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: '',
      password: '',
    },
    touched: {
      email: false,
      password: false,
    },
    errors: {
      email: [],
      password: [],
    }
  });

  // React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    event.persist();

    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]:
          (event.target.type === 'checkbox')
            ? (event.target as any).checked
            : event.target.value
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFailureMessage('');
    setSuccessMessage('');
    const result = await dispatch(userSessionActions.sysAdminLoginAction(formState.values.email, formState.values.password)) as any as Result<IUserSession>;
    if (result.isFailure) {
      setFailureMessage(result.error);
    } else {
      setSuccessMessage('Sign in success');
      console.dir(result.value);
    }

  };

  const hasError = (field) => (!!(formState.touched[field] && formState.errors[field]));

  function onLoad() {
  }
  useEffect(() => {
    const errors = validate(formState.values, schema);
    onLoad();
    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  return (
    <>
      <StatusSnackbar message={failureMessage} panelStatus={'error'} onClose={() => setFailureMessage('')} />
      <StatusSnackbar message={successMessage} panelStatus={'success'} onClose={() => setSuccessMessage('')} />

      <form
        // {...rest}
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
      >
        <div className={classes.fields}>
          <TextField
            error={hasError('email')}
            fullWidth
            helperText={hasError('email') ? formState.errors.email[0] : null}
            label="Email address"
            name="email"
            onChange={handleChange}
            value={formState.values.email || ''}
            variant="outlined"
          />
          <TextField
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
        </div>
        <div>
          <FormHelperText error>
            {formError}
          </FormHelperText>
        </div>
        <Button
          className={classes.submitButton}
          color="secondary"
          disabled={!formState.isValid}
          size="large"
          type="submit"
          variant="contained"
        >
          Sign in
        </Button>
      </form>
    </>
  );
}

AdminLoginForm.propTypes = {
  className: PropTypes.string
};

export default AdminLoginForm;
