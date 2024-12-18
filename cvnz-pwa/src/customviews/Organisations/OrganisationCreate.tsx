
import React from 'react';
import { Typography, TextField, Card, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import GoogleMapsComponent from '../GoogleMap/GoogleMapsComponent';


function OrganisationCreate(props) {
  const { organisation, className = "", ...rest } = props;
  const handleChange = event => {
    props.handleChange(event);
  };

  const handleSubmit = async (event) => {
    props.handleOrganisationSave(event);
  };


  const handleCoordinateChange = async (coordinates, address, placeId) => {
    props.handleCoordinateChange(coordinates, address, placeId);
  };

  return (
    <Card style={{ padding: "30px" }}>
      <Typography
        component="h2"
        gutterBottom
        variant="overline"
        style={{ marginBottom: "20px", fontSize: "14px" }}>
        Add Organisation
      </Typography>

      <Grid item md={5} xs={10}>
        <TextField
          fullWidth
          label="Organisation Name"
          name="name"
          onChange={handleChange}
          required
          value={props.name}
          variant="outlined"
        />
        <GoogleMapsComponent handleCoordinateChange={handleCoordinateChange}></GoogleMapsComponent>
      </Grid>

      <br />
      <Grid item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Add Organisation
        </Button>
      </Grid>

    </Card>

  );
}

OrganisationCreate.propTypes = {
  className: PropTypes.string,
  organisation: PropTypes.object,
  handleOrganisationSave: PropTypes.func,
  handleChange: PropTypes.func,
  handleCoordinateChange: PropTypes.func
};
export default OrganisationCreate;
