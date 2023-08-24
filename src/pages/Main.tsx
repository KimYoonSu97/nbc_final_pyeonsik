import React from 'react';
import { useNavigate } from 'react-router';
import PostList from 'src/components/post/PostList';

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/write')}>write</button>
      <PostList />
    </>
  );
};

export default Main;
