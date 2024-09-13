import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import TimeoutModal from './TimeoutModal';

const DEFAULT_TIMER = 1000 * 75; // 75 seconds
const DEFAULT_WARNING_TIMER = 1000 * 60; // 1 minute
const NUMERIC_LOCALE_OPTIONS = {
  minimumIntegerDigits: 2,
  useGrouping: false,
};

const CountdownTimer = () => {
  const [timer, setTimer] = useState<number>(DEFAULT_TIMER);
  const [timeoutModalOpen, setTimeoutModalOpen] = useState<boolean>(false);

  const resetTimer = () => {
    setTimer(DEFAULT_TIMER);
    setTimeoutModalOpen(false);
  };

  // gets the minutes and forces 2 digit placeholders
  const minutes =
    timer >= 1000
      ? Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', NUMERIC_LOCALE_OPTIONS)
      : '00';

  // gets the seconds and forces 2 digit placeholders
  const seconds =
    timer >= 1000 ? Math.floor((timer % (1000 * 60)) / 1000).toLocaleString('en-US', NUMERIC_LOCALE_OPTIONS) : '00';

  useEffect(() => {
    const timerTimeout = setTimeout(() => {
      if (timer < 1000) {
        setTimeoutModalOpen(true);
      } else {
        setTimer(timer - 1000);
      }
    }, 1000);
    return () => clearTimeout(timerTimeout);
  }, [timer]);

  return (
    <>
      <TimeoutModal open={timeoutModalOpen} resetTimer={resetTimer} />
      <Box bgcolor="grey.100" display="flex" flexDirection="column" alignItems="center" py={2}>
        <Typography>YOUR MOVE IS AVAILABLE FOR:</Typography>
        <Typography variant="h2" color={timer <= DEFAULT_WARNING_TIMER ? 'error' : 'secondary'}>
          {`${minutes}:${seconds}`}
        </Typography>
      </Box>
    </>
  );
};

export default CountdownTimer;
