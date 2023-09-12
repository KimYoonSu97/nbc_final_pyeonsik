import React from 'react';
import Router from './shared/Router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './';
import ReportIcon from './components/report/ReportIcon';
import SearchSummary from './components/search/SearchSummary';
import { useAtom } from 'jotai';
import { myPageHover, searchKeyWord } from './globalState/jotai';
import MyPageHover from './components/mypage/MyPageHover';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'production') {
  console = window.console || {};
  console.log = function no_console() {};
  console.warn = function no_console() {};
  console.error = function () {};
}

const App = () => {
  const [search, _] = useAtom(searchKeyWord);
  const [myPage, __] = useAtom(myPageHover);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        {search && <SearchSummary />}
        {myPage && <MyPageHover />}
        <ReportIcon />
        <Router />
        <ToastContainer
          style={{
            width: '530px'
          }}
          toastStyle={{
            backgroundColor: 'black',
            color: 'white',
            minWidth: '530px',
            maxHeight: '200px',
            marginBottom: '0 10px',
            padding: '0',
            textAlign: 'center',
            borderRadius: '10px'
          }}
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          transition={Slide}
          pauseOnHover={false}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
