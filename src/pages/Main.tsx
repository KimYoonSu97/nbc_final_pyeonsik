import React from 'react';
import { useNavigate } from 'react-router';
import PostList from 'src/components/post/PostList';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '4240px', width: '200px' }}>
      <div>Main</div>
      <button onClick={() => navigate('/write')}>write</button>
      <PostList />
    </div>
  );
};

export default Main;
