import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// custom hoooks
import useLoginUserId from 'src/hooks/useLoginUserId';
import useMutate from 'src/hooks/usePost';
// api
import { getPost, getPosts } from 'src/api/posts';
import OrgPostCard from './OrgPostCard';
import BottomFunction from './BottomFunction';
import { S } from './StyledPostDetailCommon';
import { Post } from 'src/types/types';

const PostDetailCommon = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  // current user id
  const userId: string | undefined = useLoginUserId();

  // 게시글 삭제, 좋아요, 좋아요 취소, 저장, 저장 취소
  const { deletePostMutate } = useMutate();

  // read data
  const { isLoading, data } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPost(id!),
    enabled: id ? true : false
  });

  // const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPosts() });
  // const post = data?.data?.[0];
  // const post = data?.data?.filter((post) => post.id === id)[0];
  const post = data?.data as Post;
  const postUser = post?.userId;
  const orgPost = post?.orgPostId as Post;
  // const orgUserNickname = orgPost?.userId?.nickname;
  // const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(id!) });
  // const QuotationNum = data?.data?.filter((post) => post.orgPostId?.id === id).length;
  // console.log(postUser);
  // console.log(post);

  // delete post
  const clickDelete = (id: string) => {
    deletePostMutate.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

  // time

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
    <S.DtailArea>
      <S.WriterContainer>
        <S.WriterImgBox>
          <S.WriterImg src={postUser.profileImg} />
        </S.WriterImgBox>
        <div>
          <S.WriterInfo>
            <S.WirterLevel>Lv. 수습</S.WirterLevel>
            {postUser.nickname}
            <S.WriterSir>님의</S.WriterSir>
            {post.postCategory}
          </S.WriterInfo>
          <S.PostDate>{post.created_at}</S.PostDate>
        </div>
        {userId === postUser.id && (
          <S.WriterFunction>
            <S.WriterButton onClick={clickEdit}>수정</S.WriterButton>
            <S.Contour />
            <S.WriterButton onClick={() => clickDelete(post.id)}>삭제</S.WriterButton>
          </S.WriterFunction>
        )}
      </S.WriterContainer>
      <S.PostTitle>{post.title}</S.PostTitle>
      <S.PostBodyCommon dangerouslySetInnerHTML={{ __html: post.body }} />
      {orgPost && <OrgPostCard orgPost={orgPost as Post} orgUserNickname={orgPost?.userId?.nickname as string} />}
      <BottomFunction userId={userId} post={post} />
    </S.DtailArea>
  );
};

export default PostDetailCommon;
