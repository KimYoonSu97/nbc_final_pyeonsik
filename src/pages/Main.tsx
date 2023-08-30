import React from 'react';
import { useNavigate } from 'react-router';
import PostList from 'src/components/post/PostList';
import { useAtom } from 'jotai';
import { modalOpenAtom } from 'src/globalState/jotai';

const Main = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useAtom(modalOpenAtom);

  return (
    <>
      <button onClick={() => navigate('/write')}>write</button>
      <PostList />
    </>
  );
};

export default Main;
