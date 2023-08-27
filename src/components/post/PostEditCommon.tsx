import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPost } from 'src/api/posts';
import useMutate from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';
import useLoginUserId from 'src/hooks/useLoginUserId';

const PostEditCommon = () => {
  const { id: prams } = useParams<string>();
  const navigate = useNavigate();
  const { updatePostMutate } = useMutate();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const postRef = useRef<HTMLInputElement>(null);

  // current user id
  const userId: string | undefined = useLoginUserId();

  // read
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(prams!) });
  const post = data?.data?.[0];
  const orgPost = post?.orgPostId;
  const orgUserId = post?.orgUserId;

  // useEffect 순서 확인하기!
  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.body);
  }, [post]);

  // edit
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('이거', post?.id);
    console.log(orgPost?.id);
    e.preventDefault();

    const editPost = {
      orgPostId: post.orgPostId.id,
      orgUserId: post.orgUserId.id,
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
            e.preventDefault();
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
        {orgPost && (
          <div>
            인용 게시글
            <div>{orgPost.title}</div>
            <pre dangerouslySetInnerHTML={{ __html: orgPost.body }} />
            <div>{orgUserId.nickname}</div>
            <div>{orgPost.created_at}</div>
          </div>
        )}
        <button type="submit">save</button>
      </form>
      <button onClick={clickCancle}>cancle</button>
    </div>
  );
};

export default PostEditCommon;
