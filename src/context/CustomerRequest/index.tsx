import { element } from 'prop-types';
import React, { createContext, useMemo } from 'react';
import { INITIAL_CUSTOMER_INFO } from '../../constants/booking';
import useSessionStorage from '../../utils/useSessionStorage';

type Customer = {
  name: string;
};

type CustomerRequest = {
  customer: Customer;
};

type CustomerContext = {
  customerInfo: CustomerRequest;
  setCustomerInfo: React.Dispatch<CustomerRequest>;
};

export const CustomerRequestContext = createContext<CustomerContext>({
  customerInfo: INITIAL_CUSTOMER_INFO,
  setCustomerInfo: null,
});

const CustomerRequestProvider = ({ children }) => {
  const [savedCustomerInfo, setSavedCustomerInfo] = useSessionStorage<CustomerRequest>(
    'customerInfo',
    INITIAL_CUSTOMER_INFO,
  );

  const data = useMemo(() => ({ customerInfo: savedCustomerInfo, setCustomerInfo: setSavedCustomerInfo }), [savedCustomerInfo]);

  return <CustomerRequestContext.Provider value={data}>{children}</CustomerRequestContext.Provider>;
};

CustomerRequestProvider.propTypes = {
  children: element,
};

CustomerRequestProvider.defaultProps = {
  children: null,
};

export default CustomerRequestProvider;
