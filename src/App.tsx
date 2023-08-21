import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Router from "./shared/Router";
import { QueryClient,QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
