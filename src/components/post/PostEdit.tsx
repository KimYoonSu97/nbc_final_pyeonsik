import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/posts';
import useMutate from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';

const PostEditForm = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { updateMutate } = useMutate('posts');

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const postRef = useRef<HTMLInputElement>(null);

  // read
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPosts() });
  const post = data?.data?.find((post) => post.id === id);
  // console.log(post);

  // useEffect 순서 확인하기!
  useEffect(() => {
    console.log('3', post);
    setTitle(post?.title);
  }, [post]);

  // edit
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editPost = {
      id: post.id,
      title,
      body
    };
    updateMutate.mutate(editPost);
    navigate(`/detail/${id}`);
  };

  const clickCancle = () => {
    navigate(`/detail/${id}`);
  };

  console.log('0');
  if (isLoading) {
    console.log('1');
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }
  console.log('2');

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
