import React from 'react';
import { useNavigate } from 'react-router';
import PostList from 'src/components/post/PostList';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '4240px', width: '200px' }}>
      메인컴포넌트
      <PostList />
      <button onClick={() => navigate('/write')}>write</button>
    </div>
  );
};

export default Main;
