import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

import _ from 'underscore';
import uuid from 'uuid/v1';
import { GetTimeFrame } from './TimeFrameCalculation';

export const ITimeFrame = [
  '1 Month',
  '3 Months',
  '6 Months',
  '1 Year',
  '3 Years',
]
function TimeframeDropdown(props) {
  const [selectedTimeframe, setTimeframe] = useState<string | undefined>('');
  const timeframes = ITimeFrame;

  const handleChange = (event) => {
    setTimeframe(event.target.value);
    let dateRange = GetTimeFrame(event.target.value);
    props.setSelectedTimeframe(event, dateRange);
  };
  return (
    <div>
      {timeframes ? (
        <>
          <FormControl variant='outlined' style={{ width: '100%' }} >
            <InputLabel id='test-select-label'>TimeFrame</InputLabel>
            <Select
              labelId='test-select-label'
              id='test-select'
              value={selectedTimeframe ? selectedTimeframe : ''}
              onChange={handleChange}
              label={"TimeFrame"}
            >
              {timeframes.map(item => (
                <MenuItem key={uuid()} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </>

      ) :
        <div></div>
      }
    </div>
  );
}

TimeframeDropdown.propTypes = {
  setSelectedTimeframe: PropTypes.func,
  title: PropTypes.string,
};

export default TimeframeDropdown;
