import React, { useContext } from 'react';

import { Box } from '@mui/material';
import { Form, Outlet } from 'react-router-dom';

import ActionFormProvider, { ActionFormContext } from '../../../context/ActionForm';
import { CustomerRequestContext } from '../../../context/CustomerRequest';
import Header from './Header';

const ActionFormWrapper = () => {
  const { formRef } = useContext(ActionFormContext);
  const { customerInfo } = useContext(CustomerRequestContext);

  return (
    <Form method="post" ref={formRef}>
      {customerInfo ? <input type="hidden" name="customerInfo" value={JSON.stringify(customerInfo)} /> : null}
      <Box px={{ xs: 2 }} pb={{ xs: 2, sm: 0 }}>
        <Outlet />
      </Box>
    </Form>
  );
};

const Layout = () => (
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
        <ActionFormWrapper />
      </ActionFormProvider>
    </Box>
  </Box>
);

export default Layout;
