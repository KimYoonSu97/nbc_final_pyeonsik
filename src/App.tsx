import React from 'react';
import Router from './shared/Router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import GlobalState from './globalState/GlobalState';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalState />
      <Router />
    </QueryClientProvider>
  );
};

export default App;
