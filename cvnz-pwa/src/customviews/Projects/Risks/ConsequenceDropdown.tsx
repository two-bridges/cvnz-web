import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import uuid from 'uuid/v1';

import _ from 'underscore';
import { Autocomplete } from '@mui/material';
import { Consequences, IConsequence } from 'src/redux/model/risk-determination';
function ConsequenceDropdown(props) {
  const { isDisabled, projectRisk, riskAdded, className = "", ...rest } = props;

  const [selectedConsequence, setConsequence] = useState<IConsequence | undefined>(undefined);

  const consequences: IConsequence[] = Consequences;
  function setSelectedConsequence(event, consequence: IConsequence) {
    if (consequence) {
      props.setSelectedConsequence(event, consequence);
    }
  }
  const handleChange = (event) => {
    const iRiskSelected = _.find(consequences, l => l.descriptor === event.target.value)
    if (iRiskSelected) {
      setSelectedConsequence(event, iRiskSelected)
    }
  };
  useEffect(() => {
    if (projectRisk) {
      let consequenceNameIdx = _.indexBy(consequences, l => l.descriptor);
      let active = _.find(consequences, r => r.descriptor === projectRisk.consequence);
      if (active) {
        setConsequence(consequenceNameIdx[projectRisk.consequence]);
      }
    }

  });

  useEffect(() => {
    if (riskAdded) {
      setConsequence(undefined);
    }
  }, [riskAdded]);

  return (
    <div>
      {consequences ? (
        <>
          {/* <Autocomplete
            disabled={isDisabled}
            value={selectedConsequence ? selectedConsequence : null}
            onChange={(event, value) => setSelectedConsequence(event, value!)}
            options={consequences}
            getOptionLabel={(option) => option.descriptor}
            renderInput={(params) => <TextField {...params}
              label="Consequences*"
              variant="outlined" />
            }
          /> */}
          <InputLabel htmlFor="consequence-list" style={{ marginBottom: "10px" }}>Consequences</InputLabel>
          <Select disabled={isDisabled}
            fullWidth
            value={selectedConsequence?.descriptor ? selectedConsequence.descriptor : ''}
            onChange={handleChange}
            input={<OutlinedInput name="consequence" id="consequence-list" placeholder='Select consequence' />}
            variant="outlined"
          >
            {consequences.map(item => (
              <MenuItem key={uuid()} value={item.descriptor}>{item.descriptor}</MenuItem>
            ))}
          </Select>
        </>
      ) :
        <div></div>
      }
    </div>


  );
}

ConsequenceDropdown.propTypes = {
  setSelectedConsequence: PropTypes.func,
  projectRisk: PropTypes.object,
  riskAdded: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default ConsequenceDropdown;
