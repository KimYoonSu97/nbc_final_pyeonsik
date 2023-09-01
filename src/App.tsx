import React from 'react';
import Router from './shared/Router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'production') {
  console = window.console || {};
  console.log = function no_console() {};
  console.warn = function no_console() {};
  console.error = function () {};
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
