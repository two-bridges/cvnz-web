import { colors, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';


export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {

  },

  input: {
    display: 'none'
  },
  content: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    textAlgin: 'left'
  },
  archiveButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.orange[800],
    '&:hover': {
      backgroundColor: colors.orange[900]
    }
  },
  name: {
    display: 'flex',
    flexDirection: 'row'
  },
  removeBotton: {
    width: '100%'
  },
  media: {
    display: 'flex',
    justifyContent: 'center'
  },
  groups: {
    marginTop: theme.spacing(5)
  },
  group: {
    marginTop: theme.spacing(2)
  },
  inlinelabel: {
    color: 'primary'
  },
  inlineInput: {
    color: 'secondary'
  },
  imageUpload: {
    display: 'none'
  },
  cameraIcon: {
    width: '100%',
    height: 150,
    color: '#979797'
  },
  uploadedImage: {
    maxWidth: "90%",
    maxHeight: "200px",

  },
  imageParent: {
    textAlign: 'center',
    padding: 0
  },
  saveButton: {
    color: theme.palette.common.white,
    backgroundColor: '#4527A0',
    '&:hover': {
      backgroundColor: '#4527A0',
    }
  },
  saveButtonGrid: {
    flex: 1,
    alignItems: 'flex-end'
  },
  icon: {

    color: '#979797',
  },
  title: {
    fontSize: '20px'
  },
  avatarIcon: {
    marginTop: theme.spacing(1),
    color: '#FCFCFC',
    background: 'linear-gradient(90deg, #4527A0 0%, #0277BD 100%)',
  },
  labelStyle: {
    fontSize: '16px'
  },
  projectDetail: {
    //marginTop: theme.spacing(2),
  },
  titleHeader: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  pageHeader: {
    marginTop: theme.spacing(2),

  },
  mainPage: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  }
  ,
  tooltipIcon: {
    color: '#979797',
    fontSize: '10px'
  }
}));