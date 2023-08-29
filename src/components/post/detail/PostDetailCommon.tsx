import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// custom hoooks
import useLoginUserId from 'src/hooks/useLoginUserId';
import useMutate from 'src/hooks/usePost';
// api
import { getPost } from 'src/api/posts';
import OrgPostCard from '../OrgPostCard';
import BottomFunction from './BottomFunction';
import WriterInfo from './WriterInfo';

const PostDetailCommon = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  // current user id
  const userId: string | undefined = useLoginUserId();

  // 게시글 삭제, 좋아요, 좋아요 취소, 저장, 저장 취소
  const { deletePostMutate } = useMutate();

  // read data
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(id!) });
  const post = data?.data?.[0];
  const postUser = post?.userId;
  const orgPost = post?.orgPostId;
  const orgUserNickname = post?.orgUserId?.nickname;

  // delete post
  const clickDelete = (id: string) => {
    deletePostMutate.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    alert('잘못된 접근입니다.');
    return <Navigate to="/" />;
  }
  if (data?.data.length === 0) {
    alert('존재하지 않는 게시물입니다.');
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div>
        <img src={postUser.profileImg} />
        <div>작성자 등급</div>
        <div>{postUser.nickname}</div>
        <div>{post.created_at}</div>
      </div>
      {userId === postUser.id && (
        <>
          <button onClick={() => clickDelete(post.id)}>delete</button>
          <button onClick={clickEdit}>edit</button>
        </>
      )}
      <div>{post.title}</div>
      <pre dangerouslySetInnerHTML={{ __html: post.body }} />
      {orgPost && <OrgPostCard orgPost={orgPost} orgUserNickname={orgUserNickname} />}
      <BottomFunction userId={userId} post={post} />
    </div>
  );
};

export default PostDetailCommon;
