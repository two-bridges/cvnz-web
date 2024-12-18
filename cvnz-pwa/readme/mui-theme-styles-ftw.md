 # CVA

1. [How To - Style Mui Button](#how-to---style-mui-button)

# References
* https://smartdevpreneur.com/how-to-set-mui-background-color-for-all-components-3-ways/
* https://stackoverflow.com/questions/50069724/how-to-add-custom-mui-palette-colors


# How To - Style Mui Button and other components

* FTW - our customisationts are in the overrides folder: 
  * src/theme/overrides/MuiButton.ts
  * src/theme/components.ts

```typescript

import { colors, Theme } from '@mui/material';

export default {
  contained: {
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.14)',
    backgroundColor: colors.grey[100],
    '&:hover': {
      backgroundColor: colors.grey[300]
    },
  },
  outlined: {
    // backgroundColor: colors.green[500],
  },
};

```

# How To - Add Additional Mui Theme Colors (ie. on top of primary, secondary)

* eg. src/views/Login/LoginForm.tsx

```typescript

// If you're using typescript, you also need to add additional types for the colors you just defined:
declare module '@mui/material/styles' {
  interface CustomPalette {
    anger: PaletteColorOptions;
    apple: PaletteColorOptions;
    steelBlue: PaletteColorOptions;
    violet: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    anger: true;
    apple: true;
    steelBlue: true;
    violet: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    anger: createColor('#F40B27'),
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#BC00A3'),
  },
});

```

```html
<Button color="anger" variant="contained">
  anger
</Button>
<Button color="apple" variant="contained">
  apple
</Button>
<Button color="steelBlue" variant="contained">
  steelBlue
</Button>
<Button color="violet" variant="contained">
  violet
</Button>

```