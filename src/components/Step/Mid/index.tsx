import React from 'react';

import { Box, Card, CardContent, Typography } from '@mui/material';

import formatCurrency from '../../../utils/formatCurrency';
import useQuote from '../../../utils/useQuote';

const Mid = () => {
  const { data: quoteData } = useQuote() as any;

  return (
    <Box display="flex" justifyContent="center">
      <Card component={Box} width="100%" maxWidth={500} mt={5}>
        <CardContent>
          <Box>
            <Typography align="center">Move Date: {quoteData?.date.format('YYYY-MM-DD')}</Typography>
          </Box>
          <Box mb={4}>
            <Typography align="center" variant="h3" color="textSecondary">
              Estimated total of
            </Typography>
            <Typography align="center" variant="h1" color="secondary">
              {formatCurrency(quoteData?.price, 0)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Mid;
