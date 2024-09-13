const components = (theme) => ({
  MuiAlert: {
    styleOverrides: {
      root: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        '& .MuiAlert-icon': {
          alignSelf: 'center',
        },
        '&.MuiAlert-standardError': {
          borderColor: theme.palette.error.main,
        },
        '&.MuiAlert-standardInfo': {
          borderColor: theme.palette.info.main,
        },
        '&.MuiAlert-standardSuccess': {
          borderColor: theme.palette.success.main,
        },
        '&.MuiAlert-standardWarning': {
          borderColor: theme.palette.warning.main,
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      outlined: {
        borderWidth: 2,
        color: theme.palette.grey[900],
        '&:hover': {
          borderWidth: 2,
          backgroundColor: theme.palette.secondary.light,
        },
      },
    },
  },
  MuiCardActionArea: {
    styleOverrides: {
      root: {
        // Override font family for card action area
        // Default gets button font which is CalibreMedium
        fontFamily: theme.typography.fontFamily,
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        paddingBottom: theme.spacing(2),
        '&:last-child': {
          paddingBottom: theme.spacing(2),
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        '&.Mui-selected, &.Mui-selected:hover': {
          color: theme.palette.secondary.main,
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: theme.spacing(4),
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        fontFamily: theme.typography.fontFamily,
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        '&:hover': {
          color: theme.palette.primary.main,
        },
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        fontSize: 18,
        fontFamily: theme.typography.h1.fontFamily,
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        '&.MuiInputLabel-root': {
          fontSize: '1.125rem',
          fontFamily: theme.typography.h1.fontFamily,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        '&.MuiOutlinedInput-root': {
          fontSize: '1.125rem',
          fontFamily: theme.typography.h1.fontFamily,
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontSize: 18,
        fontFamily: theme.typography.h1.fontFamily,
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        fontSize: 18,
        fontFamily: theme.typography.h1.fontFamily,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        input: {
          fontSize: 18,
          fontFamily: theme.typography.h1.fontFamily,
        },
        fontSize: 18,
        fontFamily: theme.typography.h1.fontFamily,
        '& .Mui-InputBase-inputSizeSmall': {
          fontSize: 18,
        },
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        width: '100%',
        height: 60,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        [theme.breakpoints.up('md')]: {
          height: 88,
          paddingLeft: theme.spacing(6),
          paddingRight: theme.spacing(6),
        },
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        caption: 'p',
      },
    },
  },
});

export default components;
