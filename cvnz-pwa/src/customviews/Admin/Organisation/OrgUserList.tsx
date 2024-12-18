
import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { useHistory } from 'react-router';
import { IOrgUser, IUser } from 'src/redux/model/user.model';
import { addMemberToOrgAction, disableOrgMemberAction, newUser, removeOrgMemberAction, sendOrganisationInviteLoginAction, sendPasswordResetEmail, setOrgAdminAction, setUser, unsetOrgAdminAction } from 'src/redux/actions/editableUserActions';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import StatusSnackbar from 'src/customviews/SnackBar/StatusSnackBar';
import { loadUsers } from 'src/redux/actions/userActionsV2';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import DisableIcon from '@mui/icons-material/PersonAddDisabled';
import EnableIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { Result } from 'src/lib/result.model';
import { el } from 'date-fns/locale';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import DeletePopup from 'src/customviews/FieldNotes/Components/Induction/Staff/DeletePopup';
import { useStyles } from 'src/customviews/Projects/styles/ProjectStyles'
import TooltipDialog from 'src/customviews/CommonComponents/TooltipDialog';
function UserList(props) {
  // const { users, organisation, className = "", ...rest } = props;
  const organisation: IOrganisation = props.organisation;
  const isAdminTest: boolean = props.isAdmin;
  const history = useHistory();
  const dispatch = useDispatch();
  // const [inviteEmail, setInviteEmail] = useState('dean.grande@gmail.com');
  const invitee = useSelector((state: Store) => state?.editableUser?.entity);
  const userState = useSelector((state: Store) => state?.editableUser?.entityState);
  const users = useSelector((state: Store) => Object.values(state?.usersV2?.list ?? {}));
  const [failureMessage, setFailureMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [promptDeleteUser, setPromptDeleteUser] = useState(undefined as IOrgUser | undefined);
  const [promptDisableUser, setPromptDisableUser] = useState(undefined as IOrgUser | undefined);
  const [promptEnableUser, setPromptEnableUser] = useState(undefined as IOrgUser | undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const [showTooltipMessage, setShowTooltipMessage] = useState<boolean>(false);
  const [toolTipMessage, setTooltipMessage] = useState<string>('');
  const classes = useStyles({});
  useEffect(() => {
    dispatch(newUser());
  }, []);

  useEffect(() => {
    if (organisation) {
      dispatch(loadUsers(organisation.id));
    }
  }, [organisation]);

  useEffect(() => {
    if (userState === 'clean') {
    }
  }, [userState]);

  async function addOrgUser(orgUser: IOrgUser, isAdmin: boolean) {

    if (orgUser) {
      setLoading(true);
      const isNew = !orgUser.id;
      if (orgUser.firstName && orgUser.lastName && orgUser.email && orgUser.phone) {
        orgUser.orgId = organisation.id;
        orgUser.isOrgAdmin = isAdmin;

        const saveResult = await dispatch(addMemberToOrgAction(orgUser)) as any as Result<IUser>;

        if (saveResult.isFailure) {
          setLoading(false);
          setFailureMessage(saveResult.error);
          return;
        }

        setSuccessMessage(`Invitation ${isNew ? 'sent' : 're-sent'}.  Please note, invitations last for at least one hour; or, until another invitation is sent to the same email`);
        dispatch(newUser());
        setLoading(false);

        return saveResult;
      } else {
        setLoading(false);
        return Result.CreateFailure<IUser>('Please enter all details');
      }
    } else {
      setLoading(false);
      return Result.CreateFailure<IUser>('Mising user object');
    }
  }

  async function removeOrgUser() {
    setSuccessMessage('');

    if (promptDeleteUser) {
      setPromptDeleteUser(undefined);
      promptDeleteUser.orgId = organisation.id;
      const saveResult = await dispatch(removeOrgMemberAction(promptDeleteUser)) as any as Result<IUser>;

      if (saveResult.isFailure) {
        setFailureMessage(saveResult.error);
        return;
      } else {
        setSuccessMessage('Removed');

      }
    }
  }


  async function disableOrgUser() {
    setSuccessMessage('');
    if (promptDisableUser) {
      setPromptDisableUser(undefined);
      promptDisableUser.orgId = organisation.id;
      promptDisableUser.isDisabled = true;
      const saveResult = await dispatch(disableOrgMemberAction(promptDisableUser)) as any as Result<IUser>;
      if (saveResult.isFailure) {
        setFailureMessage(saveResult.error);
        return;
      } else {
        setSuccessMessage('Disabled');
      }
    }
  }
  async function enableOrgUser() {
    setSuccessMessage('');
    if (promptEnableUser) {
      setPromptEnableUser(undefined);
      promptEnableUser.orgId = organisation.id;
      promptEnableUser.isDisabled = false;
      const saveResult = await dispatch(disableOrgMemberAction(promptEnableUser)) as any as Result<IUser>;
      if (saveResult.isFailure) {
        setFailureMessage(saveResult.error);
        return;
      } else {
        setSuccessMessage('Enabled');
      }
    }
  }

  async function setOrgAdmin(orgUser: IOrgUser) {
    setSuccessMessage('');

    if (orgUser) {
      orgUser.orgId = organisation.id;
      const saveResult = await dispatch(setOrgAdminAction(orgUser)) as any as Result<IUser>;
      if (saveResult.isFailure) {
        setFailureMessage(saveResult.error);
        return;
      } else {
        setSuccessMessage('Saved');
      }
    }
    // unsetOrgAdmins(orgUser);
  }

  async function unsetOrgAdmin(orgUser: IOrgUser) {
    setSuccessMessage('');

    if (orgUser) {
      const singleAdmin = users.filter(e => e.isOrgAdmin).length === 1;
      if (singleAdmin) {
        setFailureMessage('There must be at least one org admin');
        return;
      }

      orgUser.orgId = organisation.id;
      const saveResult = await dispatch(unsetOrgAdminAction(orgUser)) as any as Result<boolean>;
      if (saveResult.isFailure) {
        setFailureMessage(saveResult.error);
        return;
      } else {
        setSuccessMessage('Saved');
      }
    }
  }

  // only one admin is active at one time, so if a admin is set active, the other active admin will be set to inactive
  async function unsetOrgAdmins(orgUser: IOrgUser) {
    setSuccessMessage('');
    if (orgUser) {
      orgUser.orgId = organisation.id;
      let unsetAdmins = users.filter(u => u.id != orgUser.id);
      unsetAdmins.forEach(async admin => {
        const saveResult = await dispatch(unsetOrgAdminAction(admin)) as any as Result<boolean>;
        if (saveResult.isFailure) {
          setFailureMessage(saveResult.error);
          return;
        } else {
          setSuccessMessage('Saved');
        }
      });
    }
  }
  const handleCloseTooltipMessage = () => {
    setShowTooltipMessage(false);
  }

  const showMessage = (event, message: string) => {
    setShowTooltipMessage(true);
    setTooltipMessage(message);
  }
  let htmlInvite: any;

  if (invitee) {
    htmlInvite = <>
      {
        loading ? (<LinearProgress></LinearProgress>) : (<div></div>)
      }
      <StatusSnackbar message={failureMessage} panelStatus={'error'} onClose={() => setFailureMessage('')} />
      <StatusSnackbar message={successMessage} panelStatus={'success'} onClose={() => setSuccessMessage('')} />
      <Grid container spacing={2} style={{ marginTop: '10px' }}>

        <Grid item xs={12} md={6} >
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            onChange={(event) => {
              dispatch(setUser({
                ...invitee,
                firstName: event.target.value,
              }, 'modified'));
            }}
            required
            value={invitee?.firstName ?? ''}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6} >
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            onChange={(event) => {
              dispatch(setUser({
                ...invitee,
                lastName: event.target.value,
              }, 'modified'));
            }}
            required
            value={invitee?.lastName ?? ''}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={12} md={6} >
          <TextField
            fullWidth
            label="Email address"
            name="invite_email"
            onChange={(event) => {
              dispatch(setUser({
                ...invitee,
                email: event.target.value,
              }, 'modified'));
            }}
            required
            value={invitee?.email ?? ''}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={6} >
          <TextField
            fullWidth
            label="Phone number"
            name="phone"
            onChange={(event) => {
              dispatch(setUser({
                ...invitee,
                phone: event.target.value,
              }, 'modified'));
            }}
            required
            value={invitee?.phone ?? ''}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={2} md={2} lg={2} style={{ lineHeight: '54px' }}>
          {/* Add User Button */}
          <Button style={{ width: '100%' }}
            variant="contained"
            color="primary"
            onClick={async () => {
              await addOrgUser(invitee, users.length === 0);
            }}>Invite Member</Button>

        </Grid>
      </Grid>
    </>;
  }

  let tooltipInfo = `
<div>
<ul>
<li>Email - Send invitation link</li>
<li>Shield - Set user as Admin</li>
<li>Enable - Disable/enable user</li>
</ul>
</div>
`;
  return (
    <>
      {promptDeleteUser ?
        <DeletePopup open={!!promptDeleteUser}
          title={"Remove User"}
          message={`Are you sure you want to remove the user ${promptDeleteUser?.email}?`}
          closeDeletePopup={(promptDeleteUser) => { setPromptDeleteUser(undefined) }}
          deleteSelectedItem={removeOrgUser}
        ></DeletePopup> : <></>
      }
      {promptDisableUser ?
        <DeletePopup open={!!promptDisableUser}
          title={"Disable User"}
          message={`Are you sure you want to disable the user ${promptDisableUser?.email}?`}
          closeDeletePopup={(promptDisableUser) => { setPromptDisableUser(undefined) }}
          deleteSelectedItem={disableOrgUser}
        ></DeletePopup> : <></>
      }

      {promptEnableUser ?
        <DeletePopup open={!!promptEnableUser}
          title={"Enable User"}
          message={`Are you sure you want to enable the user ${promptEnableUser?.email}?`}
          closeDeletePopup={(promptEnableUser) => { setPromptEnableUser(undefined) }}
          deleteSelectedItem={enableOrgUser}
        ></DeletePopup> : <></>
      }

      {htmlInvite}
      <br />
      <br />
      <Card>
        <CardContent>
          <PerfectScrollbar options={{ suppressScrollY: true }}>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Updated</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((orgUser: IOrgUser) => (
                    <TableRow hover key={orgUser.id}>
                      <TableCell>{moment(orgUser.updated_utc).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>{orgUser.email}</TableCell>
                      <TableCell>{orgUser.firstName} {orgUser.lastName}</TableCell>
                      <TableCell>{orgUser.phone}</TableCell>

                      <TableCell>
                        <ButtonGroup size="small">
                          <TooltipDialog convertToHtml={true} open={showTooltipMessage} message={toolTipMessage} handleClose={handleCloseTooltipMessage}></TooltipDialog>
                          <Button color="primary" style={{ width: "70px" }} size="small" onClick={async () => {
                            addOrgUser(orgUser, orgUser.isOrgAdmin);
                          }}>
                            <span style={{ color: 'grey' }} ><EmailIcon /></span>
                          </Button>

                          <Button color="primary"
                            size="small" style={{ width: "70px" }} onClick={async (event) => {
                              if (orgUser.isOrgAdmin) {
                                await unsetOrgAdmin(orgUser);
                              } else if (!orgUser.isDisabled) {
                                await setOrgAdmin(orgUser);
                              } else {
                                setFailureMessage("Cannot set disabled user as Admin")
                              }
                            }}>
                            <span style={{ color: orgUser.isOrgAdmin ? 'grey' : 'lightgrey' }}><SecurityRoundedIcon /></span>
                          </Button>
                          <Button color="primary" style={{ width: "70px" }}
                            size="small">
                            {
                              orgUser.isDisabled ? (
                                <span onClick={async () => {
                                  setPromptEnableUser(orgUser);
                                }} style={{ color: orgUser.isOrgAdmin ? 'lightgrey' : 'grey' }}><DisableIcon /></span>
                              ) : (
                                <span style={{ color: orgUser.isOrgAdmin ? 'lightgrey' : 'grey' }} onClick={async () => {
                                  setPromptDisableUser(orgUser);
                                }}><EnableIcon /></span>
                              )}
                          </Button>

                          {/* <Button color="primary" style={{ width: "70px" }}
                            size="small">
                            <Grid container>
                              <Button style={{ marginLeft: "5px" }} color="primary" size="small" onClick={async () => {
                                setPromptDeleteUser(orgUser);
                              }}><span style={{ color: orgUser.isOrgAdmin ? 'lightgrey' : 'grey' }}><DeleteIcon /></span></Button>
                            </Grid>
                            <Grid>
                              <Tooltip onClick={(event) => showMessage(event, 'Disable user')} title="Disable user" placement="top" className={classes.tooltipIcon}>
                                <IconButton style={{ top: "15px" }}>
                                  <HelpOutlineIcon style={{ fontSize: "14px" }} />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Button> */}
                        </ButtonGroup>
                        <Tooltip onClick={(event) => showMessage(event, tooltipInfo)} title="" placement="top" className={classes.tooltipIcon}>
                          <HelpOutlineIcon style={{ fontSize: "18px", marginLeft: "10px" }} />
                        </Tooltip>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>

      </Card>
    </>

  );
}

UserList.propTypes = {
  className: PropTypes.string,
  organisation: PropTypes.object,
  users: PropTypes.array,
  isAdmin: PropTypes.bool,
};

export default UserList;
