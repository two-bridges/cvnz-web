
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Container,
  Divider,
  Typography,
  Card,
  CardContent,
  ButtonGroup,
  Button,
  IconButton,
  Link,
  colors
  , Theme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import ViewWeekIcon from '@mui/icons-material/ViewWeekOutlined';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/StarBorder';
import Page from '../components/Page';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  section: {
    '& + &': {
      marginTop: theme.spacing(5)
    }
  },
  content: {
    marginBottom: theme.spacing(-3)
  },
  button: {
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  iconBefore: {
    marginRight: theme.spacing(1)
  },
  iconAfter: {
    marginLeft: theme.spacing(1)
  },
  containedSuccess: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: colors.green[600],
      }
    }
  },
  containedDanger: {
    color: theme.palette.common.white,
    backgroundColor: colors.red[600],
    '&:hover': {
      backgroundColor: colors.red[900],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: colors.red[600],
      }
    }
  },
  outlinedSuccess: {
    color: colors.green[600],
    border: `1px solid ${alpha(colors.green[600], 0.5)}`,
    '&:hover': {
      border: `1px solid ${colors.green[600]}`,
      backgroundColor: alpha(colors.green[600], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  outlinedDanger: {
    color: colors.red[600],
    border: `1px solid ${alpha(colors.red[600], 0.5)}`,
    '&:hover': {
      border: `1px solid ${colors.red[600]}`,
      backgroundColor: alpha(colors.red[600], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  textSuccess: {
    color: colors.green[600],
    '&:hover': {
      backgroundColor: alpha(colors.green[600], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      }
    }
  },
  textDanger: {
    color: colors.red[600],
    '&:hover': {
      backgroundColor: alpha(colors.red[600], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      }
    }
  }
}));

function Buttons() {
  const classes = useStyles({});

  return (
    <Page
      className={classes.root}
      title="Buttons"
    >
      <Container maxWidth="lg">
        <Typography variant="overline">
          Components
        </Typography>
        <Typography
          gutterBottom
          variant="h3"
        >
          Buttons
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.section}>
          <Typography
            gutterBottom
            variant="h4"
          >
            Contained Buttons
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body1"
          >
            We limit the usage of contained buttons in pages (usually one is
            enough) for a single clear page action. For props information please
            visit
            {' '}
            <Link
              href="https://material-ui.com/"
              target="_blank"
            >
              Material-UI
            </Link>
            {' '}
            Documentation.
          </Typography>
          <Card>
            <CardContent className={classes.content}>
              <Button
                className={classes.button}
                variant="contained"
              >
                Default
              </Button>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
              >
                Primary
              </Button>
              <Button
                className={clsx(classes.containedSuccess, classes.button)}
                variant="contained"
              >
                Success
              </Button>
              <Button
                className={clsx(classes.containedDanger, classes.button)}
                variant="contained"
              >
                Danger
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                variant="contained"
              >
                Secondary
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                variant="contained"
              >
                <StarIcon className={classes.iconBefore} />
                Icon
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                variant="contained"
              >
                Icon
                <StarIcon className={classes.iconAfter} />
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className={classes.section}>
          <Typography
            gutterBottom
            variant="h4"
          >
            Outlined Buttons
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body1"
          >
            Used on secondary actions.
          </Typography>
          <Card>
            <CardContent className={classes.content}>
              <Button
                className={classes.button}
                variant="outlined"
              >
                Default
              </Button>
              <Button
                className={classes.button}
                color="primary"
                variant="outlined"
              >
                Primary
              </Button>
              <Button
                className={clsx(classes.outlinedSuccess, classes.button)}
                variant="outlined"
              >
                Success
              </Button>
              <Button
                className={clsx(classes.outlinedDanger, classes.button)}
                variant="outlined"
              >
                Danger
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                variant="outlined"
              >
                Secondary
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                variant="outlined"
              >
                <StarIcon className={classes.iconBefore} />
                Icon
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                variant="outlined"
              >
                Icon
                <StarIcon className={classes.iconAfter} />
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className={classes.section}>
          <Typography
            gutterBottom
            variant="h4"
          >
            Text Buttons
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body1"
          >
            Used on secondary actions.
          </Typography>
          <Card>
            <CardContent className={classes.content}>
              <Button className={classes.button}>
                Default
              </Button>
              <Button
                className={classes.button}
                color="primary"
              >
                Primary
              </Button>
              <Button className={clsx(classes.textSuccess, classes.button)}>
                Success
              </Button>
              <Button className={clsx(classes.textDanger, classes.button)}>
                Danger
              </Button>
              <Button
                className={classes.button}
                color="secondary"
              >
                Secondary
              </Button>
              <Button
                className={classes.button}
                color="secondary"
              >
                <StarIcon className={classes.iconBefore} />
                Icon
              </Button>
              <Button
                className={classes.button}
                color="secondary"
              >
                Icon
                <StarIcon className={classes.iconAfter} />
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className={classes.section}>
          <Typography
            gutterBottom
            variant="h4"
          >
            Button Toggle
          </Typography>
          <Card>
            <CardContent className={classes.content}>
              <ToggleButtonGroup className={classes.button}>
                <ToggleButton value="grid">
                  <ViewWeekIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                className={classes.button}
                value="italic"
              >
                <ToggleButton
                  key={1}
                  value="bold"
                >
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton
                  key={2}
                  value="italic"
                >
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton
                  key={3}
                  value="filter"
                >
                  <FilterListIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>
        </div>
        <div className={classes.section}>
          <Typography
            gutterBottom
            variant="h4"
          >
            Button Toggle
          </Typography>
          <Card>
            <CardContent className={classes.content}>
              <ButtonGroup className={classes.button}>
                <Button>Left</Button>
                <Button>Center</Button>
                <Button>Right</Button>
              </ButtonGroup>
              <ButtonGroup
                className={classes.button}
                color="primary"
                variant="contained"
              >
                <Button>Left</Button>
                <Button>Center</Button>
                <Button>Right</Button>
              </ButtonGroup>
              <ButtonGroup
                className={classes.button}
                color="primary"
                variant="text"
              >
                <Button>Left</Button>
                <Button>Center</Button>
                <Button>Right</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        </div>
        <div className={classes.section}>
          <Typography
            gutterBottom
            variant="h4"
          >
            Icon Buttons
          </Typography>
          <Card>
            <CardContent className={classes.content}>
              <IconButton
                className={classes.button}
                size="small"
              >
                <StarIcon />
              </IconButton>
              <IconButton className={classes.button} size="large">
                <StarIcon />
              </IconButton>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Page>
  );
}

export default Buttons;
