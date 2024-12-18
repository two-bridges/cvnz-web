
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import components from './components';
import { purple } from '@mui/material/colors';
// IMPORTANT: In MUI V5 you need to import ThemeProvider and createTheme from @mui/material/styles instead of @mui/styles.  src: https://keep.google.com/#NOTE/1BdCt9n-KHzwC0oCh60QYU1-vsdXBPYkabtWB-TYk4rZDqqnyqhZo1RFFCIvGx5I
import { createTheme, ThemeOptions } from '@mui/material/styles';

// DG: more info (how-to): readme/mui-theme-styles-ftw.md

const baseTheme: ThemeOptions = {
  palette,
  typography,
  components,
};

// Working.  https://keep.google.com/#NOTE/1BdCt9n-KHzwC0oCh60QYU1-vsdXBPYkabtWB-TYk4rZDqqnyqhZo1RFFCIvGx5I
export const theme = createTheme(
  {
    palette,
    typography,
    components,
  }
);

export const themeWithRtl = createTheme({ ...theme, direction: 'rtl' });
