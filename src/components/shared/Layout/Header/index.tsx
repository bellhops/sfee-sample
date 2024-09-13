import React from 'react';

import { AppBar, Box, LinearProgress, Link, Toolbar, Typography } from '@mui/material';

const HopperLogo = `${process.env.PUBLIC_URL}/images/header/hopper.svg`;

const Header = () => {
  const bellhopLogo = HopperLogo;

  return (
    <Box>
      <AppBar component={Box} elevation={0} zIndex={10001}>
        <Toolbar component={Box} variant="dense" disableGutters>
          <Box display="flex" alignItems="center">
            <Box pr={3}>
              {bellhopLogo ? (
                <Link href={typeof window !== 'undefined' ? `/${window.location.search}` : '/'}>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      '& img': ({ breakpoints }) => ({
                        width: '100%',
                        maxWidth: ({ spacing }) => spacing(5),
                        [breakpoints.up('md')]: {
                          maxWidth: ({ spacing }) => spacing(20),
                        },
                      }),
                    }}
                  >
                    <img src={bellhopLogo} alt="Bellhop Logo" />
                  </Box>
                </Link>
              ) : null}
            </Box>
          </Box>
          <Box flexGrow={1} textAlign="center">
            <Typography>Bellhop SFEE Sample</Typography>
          </Box>
        </Toolbar>
        <Box width="100%" zIndex={10001}>
          <LinearProgress color="primary" variant="determinate" value={100} />
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
