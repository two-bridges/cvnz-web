
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Theme,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from '../../utils/axios';
import getInitials from '../../utils/getInitials';
import Label from '../../components/Label';
import GenericMoreButton from '../../components/GenericMoreButton';
import { IRecord, IRecordDeep, RecordDeep } from 'src/redux/model/record.model';
import { IOrganisation } from 'src/redux/model/organisation.model';

function OrganisationList(props) {
  const { organisations, className = "", ...rest } = props;

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
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
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
                    <TableCell>{record.created_by}</TableCell>
                    <TableCell></TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

    </Card>

  );
}

OrganisationList
  .propTypes = {
  className: PropTypes.string,
  organisations: PropTypes.array,

};
export default OrganisationList
  ;
