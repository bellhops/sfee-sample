import React from 'react';

import { Box, Button, Link, Typography } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Header from '../shared/Layout/Header';

const Error404 = () => (
  <>
    <Typography variant="h1" paragraph>
      <span role="img" aria-label="confounding_face">
        &#128534;
      </span>
    </Typography>
    <Typography variant="h2" color="textSecondary" paragraph>
      Something went wrong.
    </Typography>
    <Typography variant="h3" color="textSecondary" paragraph>
      Looks like you took a wrong turn somewhere.
    </Typography>
    <Button href="/">Back to home</Button>
  </>
);

const ErrorOther = () => (
  <>
    <Typography variant="h1">
      <span role="img" aria-label="man shrugging">
        🤷‍♂️
      </span>
    </Typography>
    <Typography variant="h2" paragraph>
      Something went wrong.
    </Typography>
    <Typography variant="body1" color="textSecondary" paragraph>
      We apologize for the inconvenience and are fixing the problem. Please try again later or give us a call.
    </Typography>
    <Link href="tel:615-463-4655">1 (855) 463-4655</Link>
  </>
);

const Error = () => {
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);
  const is404 = isRouteError && routeError.status === 404;

  const errorContent = () => {
    if (is404) return <Error404 />;

    return <ErrorOther />;
  };

  return (
    <Box minHeight={{ xs: 'calc(100vh - 51px)', md: 'calc(100vh - 105px)' }} display="flex" flexWrap="wrap">
      <Header />
      <Box
        width="100%"
        height="100%"
        pt={{ xs: 10, md: 24 }}
        pb={{ xs: 20, sm: 10, md: 20 }}
        px={{ xs: 10 }}
        bgcolor="background.default"
        display="flex"
        flexDirection="column"
        textAlign="center"
      >
        {errorContent()}
      </Box>
    </Box>
  );
};

export default Error;
