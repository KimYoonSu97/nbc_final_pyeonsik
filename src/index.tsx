import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';

window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
window.Kakao.isInitialized();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
    <App />
  //</React.StrictMode>
);
