import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/posts';
import usePost from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';

const PostEditForm = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { updatePostMutation } = usePost();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const postRef = useRef<HTMLInputElement>(null);

  // read
  const { isLoading, data } = useQuery({ queryKey: ['Post'], queryFn: () => getPosts() });
  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }
  const post = data?.data.find((post) => post.id === id);

  // edit
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editPost = {
      id: post.id,
      title,
      body
    };
    updatePostMutation.mutate(editPost);
    navigate(`/detail/${id}`);
  };

  const clickCancle = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div>
      <form onSubmit={submitPost}>
        <PostWriteInput
          ref={postRef}
          type="text"
          name="title"
          title="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          autoFocus
        />
        <PostWriteInput
          type="text"
          name="body"
          title="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <button type="submit">save</button>
      </form>
      <button onClick={clickCancle}>cancle</button>
    </div>
  );
};

export default PostEditForm;
