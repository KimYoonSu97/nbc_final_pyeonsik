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
import styled from 'styled-components';

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
      {orgPost && <OrgPostCard orgPost={orgPost} orgUserNickname={orgUserNickname} />}
      <BottomFunction userId={userId} post={post} />
    </S.DtailArea>
  );
};

export default PostDetailCommon;

export const S = {
  DtailArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  WriterContainer: styled.div`
    background-color: transparent;

    width: 890px;
    height: 42px;
    margin-bottom: 23px;

    display: flex;
  `,

  WriterImgBox: styled.div`
    width: 42px;
    height: 42px;
    margin-right: 8px;

    border-radius: 100px;
    overflow: hidden;
  `,

  WriterImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    transform: translateZ(0);
    backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
  `,

  WriterInfo: styled.div`
    font-style: normal;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    display: inline-flex;
    align-items: flex-start;
    margin-bottom: 6px;
    gap: 4px;
  `,

  WirterLevel: styled.div`
    background: #fff;
    height: 20px;
    padding: 0px 13px;
    border-radius: 100px;
    border: 1px solid var(--neutral-300, #d0d5dd);

    color: var(--font-black, var(--black, #242424));
    font-size: 12px;
    font-weight: 700;
    line-height: 16px; /* 133.333% */

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  WriterSir: styled.div`
    color: var(--neutral-500, #667085);
  `,

  PostDate: styled.div`
    color: var(--neutral-500, #667085);
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  `,

  WriterFunction: styled.div`
    width: 90px;
    height: 26px;
    margin: 8px 0px;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 0;
  `,

  Contour: styled.div`
    background: var(--neutral-300, #d0d5dd);

    width: 1px;
    height: 12px;
    border-radius: 100px;
    margin: 0px 4.5px;
  `,

  WriterButton: styled.button`
    background-color: transparent;

    width: 40px;
    height: 26px;
    padding: 3px 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--neutral-500, #667085);
    text-align: center;
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
  `,

  PostTitle: styled.div`
    width: 790px;
    margin: 24px 0px 12px 0px;

    display: flex;
    align-items: center;

    color: var(--black, #242424);
    font-style: normal;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px; /* 127.273% */
  `,

  PostBodyCommon: styled.pre`
    width: 790px;
    margin: 10px 0px 10px 0px;

    font-family: 'inherit';
  `
};
