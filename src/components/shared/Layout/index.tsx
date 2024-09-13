import React, { useContext, useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { bool } from 'prop-types';
import { Form, Outlet, useParams } from 'react-router-dom';

import ActionFormProvider, { ActionFormContext } from '../../../context/ActionForm';
import { CustomerRequestContext } from '../../../context/CustomerRequest';
import Header from './Header';

const ActionFormWrapper = ({ stripeLoaded }) => {
  const { formRef } = useContext(ActionFormContext);
  const { customerInfo } = useContext(CustomerRequestContext);
  const { step } = useParams();

  return (
    <Form method="post" ref={formRef}>
      {customerInfo ? <input type="hidden" name="customerInfo" value={JSON.stringify(customerInfo)} /> : null}
      <Box px={{ xs: 2 }} pb={{ xs: 2, sm: 0 }}>
        {step !== 'checkout' || stripeLoaded ? <Outlet /> : null}
      </Box>
    </Form>
  );
};

ActionFormWrapper.propTypes = {
  stripeLoaded: bool,
};

ActionFormWrapper.defaultProps = {
  stripeLoaded: false,
};

const Layout = () => {
  const { step } = useParams();

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (step === 'checkout') {
      setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY));
    }
  }, [step]);

  return (
    <Box minHeight={{ xs: 'calc(100vh - 51px)', md: 'calc(100vh - 105px)' }} display="flex" flexWrap="wrap">
      <Header />
      <Box
        width="100%"
        height="100%"
        pt={{ xs: 10, sm: 11 }}
        pb={{ xs: 20, sm: 15 }}
        bgcolor="background.default"
        display="flex"
        flexDirection="column"
      >
        <ActionFormProvider>
          {step === 'checkout' && stripePromise ? (
            <Elements stripe={stripePromise}>
              <ActionFormWrapper stripeLoaded />
            </Elements>
          ) : (
            <ActionFormWrapper />
          )}
        </ActionFormProvider>
      </Box>
    </Box>
  );
};

export default Layout;
