

/Users/deangrande/code/cva/cva-web/src/customviews/Projects/Create/ProjectCreate.tsx

```tsx

// this is the style that 
const useStyles = makeStyles((theme) => {
  return ({
    // these props are passed from the component (we're inside a callback here that generates styles based on latest props)
    anyElementNameOrWhatever: (props) => ({
      backgroundColor: props.anythingYouWantHere.status === 'good' ? colors.green[600] : colors.red[600],
      color: (props as any).content.color,
    }),
  });
});

function StatusSnackbar({ panelStatus, onClose, message }) {
  // 'status' is an example of a prop that we need to convert from a value to CSS...
  const status: 'good' | 'bad' = 'good';

  // the object passed to useStyles will be 
  const classes = useStyles({
    // this data gets passed to makeStyles
    // makeStyles can then transform it
    anythingYouWantHere: {
      // let's pass 'good' to makeStyles
      status: status,
      backgroundColor = colors.amber[500]
    }
  });

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={6000}
      onClose={onClose}
      open={!!message}
    >
      <SnackbarContent
        className={classes.content}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={() => onClose()}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
        message={(
          <span className={classes.message}>
            {/* <CheckCircleIcon className={classes.icon} /> */}
            {message}
          </span>
        )}
      // variant="h6"
      />
    </Snackbar>
  );
}


```