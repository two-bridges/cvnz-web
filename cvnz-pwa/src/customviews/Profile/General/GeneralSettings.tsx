
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { fetchOrganisationAdmin, fetchOrganisationAdmins } from 'src/redux/actions/organisationAdminActions';
import { IOrgUser } from 'src/redux/model/user.model';

function GeneralSettings({ className = "", ...rest }) {
  const dispatch = useDispatch();

  const userAdminState = useSelector((state: Store) => state?.organisationAdminReducers?.list, (prev, next) => {
    return prev === next;
  });
  let orgStored = sessionStorage.getItem('organisation');
  let org: IOrganisation | undefined = undefined;

  useEffect(() => {
    if (orgStored) {
      org = JSON.parse(orgStored) as IOrganisation;
    }

    dispatch(fetchOrganisationAdmins({ organisationId: org ? org.id : '' }));
  }, []);

  useEffect(() => {
    console.log("userAdminState", Object.values(userAdminState));
  }, [userAdminState])
  return (
    <div>
      {userAdminState?.length ? (
        <div>
          <Card {...rest}>
            <CardHeader title="Admin Contact" />
            <Divider />
          </Card>

          <Card style={{ marginTop: "10px" }}>
            <CardContent>
              <PerfectScrollbar options={{ suppressScrollY: true }}>
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.values(userAdminState)?.map((orgUser) => (
                        <TableRow hover key={orgUser.id}>
                          <TableCell>{orgUser.firstName}</TableCell>
                          <TableCell>{orgUser.lastName}</TableCell>
                          <TableCell>{orgUser.email}</TableCell>
                          <TableCell>{orgUser.phone}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </PerfectScrollbar>
            </CardContent>

          </Card>
        </div>) : (<div></div>)
      }
    </div >
  );
}

GeneralSettings.propTypes = {
  className: PropTypes.string,
};

export default GeneralSettings;
