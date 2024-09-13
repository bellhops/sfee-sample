import React, { useEffect, useState } from 'react';

import { bool, func } from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Button, CircularProgress, Dialog, Typography } from '@mui/material';

const Avatar = `${process.env.PUBLIC_URL}/images/checkout/timeoutAvatar.png`;

const TimeoutModal = ({ open, resetTimer }) => {
  const [viewState, setViewState] = useState<string>('');
  const [quoteLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchParamsString = searchParams.toString();

  const viewStates = {
    expired: {
      title: 'Looks like your quote expired.',
      subtitle: "Don't worry, we got you. Let's check if we're still available.",
      buttonText: 'Check now',
      buttonCallback: () => {
        if(Math.random() < 0.5) {
          setViewState('available');
        } else {
          setViewState('unavailable');
        }
      },
    },
    available: {
      title: 'Looks like your package is still available!',
      subtitle: 'Your package is still available for checkout. Click the button and the timer will restart.',
      buttonText: 'Back to checkout',
      buttonCallback: () => {
        resetTimer();
      },
    },
    unavailable: {
      title: 'Unfortunately, your quote is no longer available.',
      subtitle: "Don't worry, we're flexible.",
      buttonText: 'Pick new date',
      buttonCallback: () => {
        navigate(`/mid/${searchParamsString ? `?${searchParamsString}` : ''}`);
      },
    },
  };

  useEffect(() => {
    if (open) {
      setViewState('expired');
    }
  }, [open]);

  return (
    <Dialog open={open} sx={{ '& .MuiPaper-root': { overflowY: 'visible' } }}>
      <Box
        display="flex"
        flexDirection="column"
        borderRadius={1}
        width={360}
        top="40$"
        bgcolor="secondary.dark"
        textAlign="center"
        px={4}
        sx={{
          outline: 0,
        }}
      >
        <Box mt={-5}>
          <img src={Avatar} alt="customer service woman" />
        </Box>
        <Typography color="primary">{viewStates[viewState]?.title}</Typography>
        <Box pt={1} pb={2}>
          <Typography variant="h5" color="grey.50">
            {viewStates[viewState]?.subtitle}
          </Typography>
        </Box>
        <Box pb={4}>
          {quoteLoading ? (
            <CircularProgress size={34} />
          ) : (
            <Button variant="contained" onClick={viewStates[viewState]?.buttonCallback}>
              {viewStates[viewState]?.buttonText}
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

TimeoutModal.propTypes = {
  open: bool.isRequired,
  resetTimer: func.isRequired,
};

export default TimeoutModal;
