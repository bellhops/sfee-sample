// Disable ESLint unused due to TS module declarations
/* eslint-disable no-unused-vars */
import React from 'react';

import { node } from 'prop-types';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import components from './components';

declare module '@mui/material' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
  }
}

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
  }

  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
  }
}

const headerFont = ['CalibreMedium', '-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Arial', 'sans-serif'].join(',');

let theme = createTheme();

theme = createTheme({
  palette: {
    primary: {
      main: '#16D3A9',
      light: '#F3FDFB',
    },
    secondary: {
      light: '#6994F414',
      main: '#295AB7',
      dark: '#233152',
    },
    text: {
      primary: '#233152',
      secondary: '#747C82',
      disabled: '#B6B8BB',
    },
    background: {
      paper: '#FFF',
      default: '#FFF',
    },
    error: {
      main: '#FA4767',
    },
    warning: {
      main: '#F57F17',
      contrastText: '#180D02',
    },
  },
  typography: {
    fontFamily: ['Calibre', '-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontFamily: headerFont,
      fontSize: '3.79rem',
    },
    h2: {
      fontFamily: headerFont,
      fontSize: '2.25rem',
      fontWeight: 400,
    },
    h3: {
      fontFamily: headerFont,
      fontSize: '1.68rem',
    },
    h4: {
      fontFamily: headerFont,
      fontSize: '1.125rem',
    },
    h5: {
      // No headerFont family here to use normal Calibre for h5
      fontSize: '1.125rem',
    },
    body1: {
      fontSize: '1.5rem',
    },
    body2: {
      fontFamily: headerFont,
      fontSize: '1.1rem',
    },
    body3: {
      fontSize: '1rem',
    },
    body4: {
      fontSize: '0.9rem',
      lineHeight: '1.1rem',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.43,
    },
    button: {
      fontFamily: headerFont,
      fontSize: '1.125rem',
      textTransform: 'none',
    },
  },
});

theme = createTheme(theme, {
  components: components(theme),
  overrides: {},
});

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

Theme.propTypes = {
  children: node.isRequired,
};

export default Theme;
