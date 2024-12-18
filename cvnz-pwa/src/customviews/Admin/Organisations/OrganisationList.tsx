
import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { useHistory } from 'react-router';
import { snakeCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';

function OrganisationList(props) {
  const { organisations, className = "", ...rest } = props;
  const history = useHistory();

  function handleEditOrg(org: IOrganisation) {
    if (org?.id) {
      history.push(`/admin/organisation/${org.id}`);
    }
  }
  useEffect(() => {
    console.log(window.location);
  })

  function showUserList(org: IOrganisation) {
    if (org?.id) {
      history.push(`/admin/organisation/${org.id}/users`);
    }
  }
  return (
    <Card
      {...rest}
    >

      <CardHeader
        style={{ padding: '15px' }}
        title="Organisation List"
      />
      <Divider />
      <CardContent>
        <PerfectScrollbar options={{ suppressScrollY: true }}>
          <div style={{ padding: '15px' }}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Updated</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organisations?.map((record: IOrganisation) => (
                  <TableRow
                    hover
                    key={record.id}
                  >
                    <TableCell>{moment(record.created_utc).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>
                      <RouterLink to={{ pathname: `${window.location.origin}/auth/${snakeCase(record.name)}/login` }} target="_blank" >
                        {`${snakeCase(record.name)}`}
                      </RouterLink>

                    </TableCell>
                    <TableCell>{record.created_by}

                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleEditOrg(record)}>Edit</Button>
                      &nbsp;
                      {/* <Button variant="outlined" onClick={() => showUserList(record)}>Users</Button> */}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

    </Card >

  );
}

OrganisationList
  .propTypes = {
  className: PropTypes.string,
  organisations: PropTypes.array,

};
export default OrganisationList
  ;

