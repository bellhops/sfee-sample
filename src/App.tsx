import { QueryClientProvider } from '@tanstack/react-query';
import { shape } from 'prop-types';
import React from 'react';
import { Outlet } from 'react-router-dom';

import CustomerRequestProvider from './context/CustomerRequest';
import Theme from './theme';

const App = ({ queryClient }) => (
  <Theme>
    <QueryClientProvider client={queryClient}>
      <CustomerRequestProvider>
        <Outlet />
      </CustomerRequestProvider>
    </QueryClientProvider>
  </Theme>
);

App.propTypes = {
  queryClient: shape({}).isRequired,
};

export default App;
