import React, { useContext } from 'react';

import { Box, Card, CardContent, Typography } from '@mui/material';
import useQuote from '../../../utils/useQuote';
import { CustomerRequestContext } from '../../../context/CustomerRequest';
import formatCurrency from '../../../utils/formatCurrency';
import CountdownTimer from './CountdownTimer';

const Checkout = () => {
  const { data: quoteData } = useQuote() as any;
  const { customerInfo } = useContext(CustomerRequestContext);

  if (!quoteData) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box my={2}>
        <CountdownTimer />
      </Box>
      <Card component={Box} width="100%" maxWidth={500} mt={5}>
        <CardContent>
          <Box>
            <Typography>Name: {customerInfo?.customer?.name}</Typography>
          </Box>
          <Box>
            <Typography>
              Deposit due in 48 hours: {formatCurrency(quoteData?.price ? quoteData.price / 10 : 0, 2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Checkout;
