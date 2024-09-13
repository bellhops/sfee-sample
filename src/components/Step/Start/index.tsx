import React, { useContext, useEffect, useState } from 'react';

import { Box, TextField } from '@mui/material';

import { ActionFormContext } from '../../../context/ActionForm';
import { CustomerRequestContext } from '../../../context/CustomerRequest';

const Start = () => {
  const { customerInfo, setCustomerInfo } = useContext(CustomerRequestContext);
  const { setContinueDisabled } = useContext(ActionFormContext);

  const [name, setName] = useState('');

  const updateContinueDisabled = () => {
    if (!customerInfo.customer?.name) {
      setContinueDisabled(true);
    } else {
      setContinueDisabled(false);
    }
  };

  useEffect(() => {
    setCustomerInfo({
      ...customerInfo,
      customer: {
        ...customerInfo.customer,
        name,
      },
    });
  }, [name]);

  useEffect(() => {
    updateContinueDisabled();
  }, [customerInfo]);

  useEffect(() => {
    updateContinueDisabled();
  }, []);

  return (
    <Box maxWidth={820} mx="auto" display="flex" justifyContent="center" mt={10}>
      <TextField value={name} onChange={({ target: { value } }) => setName(value)} label="Name" />
    </Box>
  );
};

export default Start;
