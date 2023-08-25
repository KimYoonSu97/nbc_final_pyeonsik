import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from 'src/api/posts';
import useMutate from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';
import useLoginUserId from 'src/hooks/useLoginUserId';

const PostEdit = () => {
  const navigate = useNavigate();
  const { id: prams } = useParams<string>();
  const { updatePostMutate } = useMutate();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const postRef = useRef<HTMLInputElement>(null);

  // current user id
  const userId: string | undefined = useLoginUserId();

  // read
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(prams!) });
  const post = data?.data?.[0];

  // useEffect 순서 확인하기!
  useEffect(() => {
    console.log('3');
    setTitle(post?.title);
    setBody(post?.body);
  }, [data]);

  // edit
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editPost = {
      id: post.id,
      title,
      body
    };
    updatePostMutate.mutate(editPost);
    navigate(`/detail/${prams}`);
  };

  const clickCancle = () => {
    navigate(`/detail/${prams}`);
  };

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (userId && post?.userId.id !== userId) {
    alert('접근할 수 없습니다.');
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={submitPost}>
        <PostWriteInput
          ref={postRef}
          type="text"
          name="title"
          title="title"
          value={title || ''}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          autoFocus
        />
        <PostWriteInput
          type="text"
          name="body"
          title="body"
          value={body || ''}
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

export default PostEdit;
