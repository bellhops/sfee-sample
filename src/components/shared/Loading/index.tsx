import React, { useEffect } from 'react';

import { string } from 'prop-types';

import { Box, Typography } from '@mui/material';

import DotProgress from '../DotProgress';

const Loading = ({ text }) => {
  const DEFAULT_TIMER = 30000; // 30 seconds
  const STEP = 500;

  useEffect(() => {
    let tempTimer = DEFAULT_TIMER;

    const interval = setInterval(() => {
      if (tempTimer < STEP) {
        clearInterval(interval);
        throw new Error('Loading timeout error');
      } else tempTimer -= STEP;
    }, STEP);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box position="absolute" top="50%" left="50%" style={{ transform: 'translateX(-50%)' }}>
      <DotProgress />
      <Box mt={2}>
        <Typography variant="h4" align="center">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

Loading.propTypes = {
  text: string,
};

Loading.defaultProps = {
  text: 'Loading',
};

export default Loading;
