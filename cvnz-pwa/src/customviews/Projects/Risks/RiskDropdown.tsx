import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import _ from 'underscore';
import { Risk } from 'src/customviews/Scripts';
import { Autocomplete } from '@mui/material';
import { HelperService } from 'src/lib/helper';
import { IProjectRisk } from 'src/redux/model/risk.model';
import uuid from 'uuid/v1';
import { divide } from 'lodash';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  menuPaper: {
    maxHeight: 300
  }
}));

function RiskDropdown(props) {
  const classes = useStyles();
  let projRisk = props.riskList as IProjectRisk[];
  const [activeRisk, setActiveRisk] = useState<Risk | undefined>(undefined);
  const RisksState = useSelector((state: Store) => state?.risks?.risks);

  var risks: Risk[] = [];
  if (RisksState) {
    risks = HelperService.getArrayFromObjectList(RisksState);
    risks = risks.sort((a, b) => a.risk > b.risk ? 1 : -1);
  }
  //on load
  useEffect(() => {
    //Setting default risk if any (while updating risk)
    if (props.projectRisk) {
      let riskIdx = _.indexBy(risks, risk => risk.id);
      let active = _.find(risks, r => r.id === props.projectRisk.risk_id);
      if (active) {
        setActiveRisk(riskIdx[props.projectRisk.risk_id]);
      }
    }
  }, []);

  useEffect(() => {
    if (props.riskAdded) {
      setActiveRisk(undefined);
    }
  }, [props.riskAdded]);

  function setSelectedRisk(event, risk: Risk) {
    setActiveRisk(risk);
    props.setSelectedRisks(event, risk);
  }
  const handleChange = (event) => {
    const iRiskSelected = _.find(risks, l => l.id === event.target.value)
    if (iRiskSelected) {
      setSelectedRisk(event, iRiskSelected)
    }
  };

  return (
    <div>
      {risks ? (
        <>

          <Box>
            <FormControl fullWidth>
              <InputLabel style={{ top: '-6px', left: '12px' }} id="demo-simple-select-label">Select risk</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={activeRisk?.risk}
                label="Select Risk"
                onChange={handleChange}
                variant="outlined"
                defaultValue={""}
              >
                {risks.map(item => (
                  <MenuItem key={uuid()} value={item.id} disabled={projRisk && !!projRisk.find(element => element.risk_id === item.id)}>
                    {item.risk}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* <Autocomplete
            value={activeRisk ? activeRisk : null}
            onChange={(event, value) => setSelectedRisk(event, value!)}
            style={{ width: '100%' }}
            options={risks}
            //groupBy={(option) => option.type}
            getOptionLabel={(option) => option?.risk ?? ''}
            disabled={props.isDisabled}
            // getOptionDisabled={option => option?.risk === risks.indexOf(option)}
            getOptionDisabled={(option) => projRisk && !!projRisk.find(element => element.risk_id === option.id)}
            renderInput={(params) =>
              <TextField {...params}
                label="Select Risk"
                variant="outlined"
              />
            }
          /> */}
          {/* {activeRisk?.risk ? activeRisk.risk : 
          <div>
            <InputLabel htmlFor="risk-list">Select Risk</InputLabel>
            <Select
              fullWidth
              disabled={props.isDisabled}
              value={activeRisk ? activeRisk.risk : 'no active risk'}
              onChange={handleChange}
              input={<OutlinedInput name="risks" id="risk-list" placeholder='Select risks' />}
              variant="outlined"
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              {risks.map(item => (
                <MenuItem key={uuid()} value={item.id} disabled={projRisk && !!projRisk.find(element => element.risk_id === item.id)}>{item.risk}</MenuItem>
              ))}
            </Select>
          </div>} */}

        </>

      ) :
        <div></div>
      }
    </div>


  );
}

RiskDropdown.propTypes = {
  setSelectedRisks: PropTypes.func,
  projectRisk: PropTypes.object,
  isDisabled: PropTypes.bool,
  riskAdded: PropTypes.bool,
  riskList: PropTypes.array,
};

export default RiskDropdown;
