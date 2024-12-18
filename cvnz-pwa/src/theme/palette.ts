
// Theme Colors - HowTo: readme/mui-theme-styles-ftw.md

import { ButtonPropsColorOverrides, PaletteColorOptions, PaletteOptions, colors, createTheme } from "@mui/material";


const white = '#FFFFFF';
export interface CustomPaletteOptions {
  link: string;
  icon: string;
}

declare module "@mui/material/styles" {
  interface CustomPalette {
    anger: PaletteColorOptions;
  }
  interface Palette extends CustomPalette { }
  interface PaletteOptions extends CustomPalette { }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    anger: true;
  }
}
const a: ButtonPropsColorOverrides = {
  anger: true,

}
// this createTheme() call is just to obtain the pallette object. See: src/theme/index.ts for the actual theme object
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });



// TBD: set the global background color for things like buttons, TopBar, etc
var options: PaletteOptions = {
  mode: 'light',
  primary: {
    contrastText: white,
    dark: colors.deepPurple[900],
    main: colors.deepPurple[600],
    light: colors.deepPurple[300]
  },
  anger: createColor('#F40B27'),
  secondary: {
    contrastText: white,
    dark: '#004C8C',
    main: colors.lightBlue[800],
    light: colors.lightBlue[500]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
  },
  // link: colors.blue[600],
  // icon: colors.blueGrey[600],
  background: {
    paper: 'white'
  },
  divider: colors.grey[200]
};
export default options;