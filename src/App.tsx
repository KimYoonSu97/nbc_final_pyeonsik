import React from "react";
import logo from "./logo.svg";
import Router from "./shared/Router";
import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router></Router>
    </QueryClientProvider>
  );
}

export default App;
