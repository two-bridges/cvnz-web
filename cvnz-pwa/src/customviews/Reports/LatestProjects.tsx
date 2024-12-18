
import React, { } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RecordDeep } from 'src/redux/model/record.model';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(1)
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 900
  },
  author: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  tags: {
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  actions: {
    justifyContent: 'flex-end'
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  },
  tagLabelNotAssigned: {
    height: '14px',
    width: '104px',
    fontSize: '10px',
    backgroundColor: '#263238'
  },
  tagLabelAssigned: {
    height: '14px',
    width: '104px',
    border: '1px solid #4527A0',
    boxSizing: 'border-box',
    borderRadius: '99px'
  }
}));

function LatestProjects(props) {
  const { records, className = "", ...rest } = props
  const classes = useStyles({});

  function prettyContribution(contribution: number) {
    contribution = contribution ? contribution : 0;
    return contribution.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <CardHeader
        style={{ padding: '15px' }}
        title="Data"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar options={{ suppressScrollY: true }}>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell style={{ textAlign: 'right' }}>Total Hours</TableCell>
                  <TableCell style={{ textAlign: 'right' }}>Contribution</TableCell>
                  <TableCell>Activities</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.records.map((record: RecordDeep) => (
                  <TableRow
                    hover
                    key={record.id}
                  >
                    <TableCell>{moment(record.recordDate).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>{record.project?.projectName}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{record.totalHours()}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{prettyContribution(record.totalContribution())}</TableCell>
                    <TableCell>
                      <div>
                        {

                          record.data.map((item, i, arr) => (
                            <Typography
                              display='inline'
                              style={{ backgroundColor: '#FCFCFC', }}
                              key={item.id}
                            >
                              {item.type}{i !== (arr.length - 1) ? ', ' : ' '}
                            </Typography>
                          ))}
                      </div>

                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        component={RouterLink}
                        size="small"
                        to={"/record/" + record.id}
                        variant="outlined"
                      >
                        <ArrowForwardIcon></ArrowForwardIcon>
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      {/* <CardActions className={classes.actions}>
        <Button
          color="primary"
          component={RouterLink}
          size="small"
          to="/management/projects"
          variant="text"
        >
          See all
          <ArrowForwardIcon className={classes.arrowForwardIcon} />
        </Button>
      </CardActions> */}
    </Card>
  );
}

LatestProjects.propTypes = {
  className: PropTypes.string,
  records: PropTypes.array
};

export default LatestProjects;
