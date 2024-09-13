import React from 'react';

import { Box, styled } from '@mui/material';

const Dot = styled('div')(({ theme }) => ({
  '@keyframes pulse': {
    '0%, 40%, 100%': {
      height: 10,
      width: 10,
    },
    '20%': {
      height: 14,
      width: 14,
      background: theme.palette.secondary.main,
    },
  },
  background: theme.palette.grey[300],
  borderRadius: '50%',
  animation: 'pulse 1.6s infinite ease-in-out',
  margin: 8,
}));

const DotProgress = () => (
  <Box
    display="flex"
    justifyContent="center"
    sx={{
      '& div:nth-of-type(1)': {
        animationDelay: '-1.4s',
      },
      '& div:nth-of-type(2)': {
        animationDelay: '-1.2s',
      },
      '& div:nth-of-type(3)': {
        animationDelay: '-1.0s',
      },
      '& div:nth-of-type(4)': {
        animationDelay: '-.8s',
      },
      height: '25px',
    }}
  >
    <Dot />
    <Dot />
    <Dot />
    <Dot />
  </Box>
);

export default DotProgress;
