import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';

import _ from 'underscore';
import { Autocomplete } from '@mui/material';
import { ILikelihood, Likelihoods } from 'src/redux/model/risk-determination';
import uuid from 'uuid/v1';


function LikelihoodDropdown(props) {

  const [selectedLikelihood, setLikelihood] = useState<ILikelihood | undefined>(undefined);

  const { isDisabled, projectRisk, riskAdded, className = "", ...rest } = props;

  const likelihoods: ILikelihood[] = Likelihoods;
  function setSelectedLikelihood(event, likelihood: ILikelihood) {
    if (likelihood) {
      props.setSelectedLikelihood(event, likelihood);
    }
  }

  useEffect(() => {
    if (props.projectRisk) {
      let likelihoodNameIdx = _.indexBy(likelihoods, l => l.descriptor);
      let active = _.find(likelihoods, r => r.descriptor === props.projectRisk.likelihood);
      if (active) {
        setLikelihood(likelihoodNameIdx[props.projectRisk.likelihood]);
      }
    }

  });

  useEffect(() => {
    if (riskAdded) {
      setLikelihood(undefined);
    }

  }, [riskAdded]);

  const handleChange = (event) => {
    const iRiskSelected = _.find(likelihoods, l => l.descriptor === event.target.value)
    if (iRiskSelected) {
      setSelectedLikelihood(event, iRiskSelected)
    }
  };
  return (
    <div>
      {likelihoods ? (
        <>
          {/* <Autocomplete
            disabled={isDisabled}
            value={selectedLikelihood ? selectedLikelihood : null}
            onChange={(event, value) => setSelectedLikelihood(event, value!)}
            options={likelihoods}
            getOptionLabel={(option) => option.descriptor}
            renderInput={(params) =>
              <TextField {...params}
                label="Likelihood*"
                variant="outlined"
              />
            }
          /> */}
          <InputLabel htmlFor="likelihood-list" style={{ marginBottom: "10px" }}>Likelihood</InputLabel>
          <Select disabled={isDisabled}
            fullWidth
            value={selectedLikelihood?.descriptor ? selectedLikelihood.descriptor : ''}
            onChange={handleChange}
            input={<OutlinedInput name="likelihood" id="likelihood-list" placeholder='Select likelihood' />}
            variant="outlined"
          >
            {likelihoods.map(item => (
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

LikelihoodDropdown.propTypes = {
  setSelectedLikelihood: PropTypes.func,
  projectRisk: PropTypes.object,
  riskAdded: PropTypes.bool,
  isDisabled: PropTypes.bool
};

export default LikelihoodDropdown;
