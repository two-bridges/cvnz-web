
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Card,
  Button,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import GoogleMapsComponent from '../../GoogleMap/GoogleMapsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import * as _ from "underscore";
import { loadOrganisation, newOrganisation, saveOrganisation, setOrganisation, unsetOrganisationError } from 'src/redux/actions/editableOrganisationActions';
import { LatLng } from 'react-google-places-autocomplete/build/GooglePlacesAutocomplete.types';
import StatusSnackbar from 'src/customviews/SnackBar/StatusSnackBar';
import { useHistory, useLocation, useParams } from 'react-router';
import { IOrganisation } from 'src/redux/model/organisation.model';
import PhotoUpload from 'src/customviews/FieldNotes/Components/FieldNotePhotoUpload/PhotoUpload';
import { addOrUpdateFieldNoteImage } from 'src/redux/actions/FieldNoteActions/fieldNoteImageActions';
import { CreateNewImageUpload } from 'src/redux/model/fieldNote.model';
import { snakeCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  paper: { minWidth: "500px" },
}));

function OrganisationForm(props) {
  const { open, className = "", ...rest } = props;
  const orgError = useSelector((state: Store) => state?.editableOrganisation?.lastError);
  const organisation: IOrganisation = props.organisation;
  const history = useHistory();
  const dispatch = useDispatch();

  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');

  const getImageFileUploadedDetails = (value) => {
    setUploadedFile(value);
  }

  const getImageStoredUrl = (value) => {
    setFileUrl(value);
    organisation.imageUrl = value
  }

  const handleChange = event => {
    event.preventDefault();

    dispatch(setOrganisation({
      ...organisation,
      [event.target.name]: event.target.value
    } as any, 'modified'));
  };

  const handleOrganisationSave = async (event) => {
    event.preventDefault();

    if (organisation) {
      const result = (await dispatch(saveOrganisation(organisation))) as unknown;
      if (result) {
        props.handleTabChange(snakeCase(organisation.name), 'users');
      }
    }

  };

  const goBack = () => {
    history.push('/admin/organisations');
  }

  function handleCoordinateChange(coordinates: LatLng, address: string, googleMapId: string) {
    if (organisation) {
      console.log(`handleCoordinateChange`);
      dispatch(setOrganisation({
        ...organisation,
        hq_location: {
          googleMapId,
          address: address,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        }
      }, 'modified'));
    }
  }

  return (
    <>
      <StatusSnackbar message={orgError} panelStatus={'error'} onClose={() => dispatch(unsetOrganisationError())} />
      <Grid container spacing={2}>
        <Grid item xl={6} md={6} lg={6} xs={12} sm={12}>
          <Card>
            <CardContent style={{ width: '100%' }} >
              <Grid item >
                <TextField
                  fullWidth
                  label="Organisation Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={organisation?.name ?? ''}
                  variant="outlined"
                />
                <Divider />
                <br />
                <GoogleMapsComponent
                  location={organisation?.hq_location}
                  handleCoordinateChange={handleCoordinateChange}
                  inputTitle='Head Office Location'
                />
              </Grid>
              <br />
            </CardContent>
          </Card>
        </Grid>
        {/** Profile Card */}
        <Grid item xl={6} md={6} lg={6} xs={12} sm={12}>
          <PhotoUpload getImageFileUploadedDetails={getImageFileUploadedDetails} uploadText={'Upload Organisation Logo'} getImageStoredUrl={getImageStoredUrl} fileUrl={organisation.imageUrl} showImageInDiv={true}></PhotoUpload>
        </Grid>
      </Grid>

      <Grid item style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Button
          type="submit"
          variant="contained"
          color='primary'
          size='small'
          onClick={goBack}
          style={{ marginRight: '10px' }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color='primary'
          size='small'
          onClick={handleOrganisationSave}
        >
          Save
        </Button>
      </Grid>
    </>

  );
}

OrganisationForm.propTypes = {
  className: PropTypes.string,
  organisation: PropTypes.object,
  open: PropTypes.bool,
  handleOrganisationSave: PropTypes.func,
  handleChange: PropTypes.func,
  handleCoordinateChange: PropTypes.func,
  handleTabChange: PropTypes.func
};
export default OrganisationForm;

