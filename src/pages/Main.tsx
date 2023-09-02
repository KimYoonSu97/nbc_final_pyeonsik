import React from 'react';
import { useLocation, useNavigate } from 'react-router';
// import PostList from 'src/components/post/PostList';
import PostList from 'src/components/post/PostList';
import { modalOpenAtom } from 'src/globalState/jotai';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/write')}>write</button>
      <PostList />
      <div></div>
    </>
  );
};

export default Main;
