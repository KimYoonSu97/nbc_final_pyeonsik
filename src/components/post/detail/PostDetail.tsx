import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
// custom hoooks
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
// api
import { getPost } from 'src/api/posts';
import OrgPostCard from './OrgPostCard';
import BottomFunction from './BottomFunction';
// import { S } from '../style/StyledPostDetail';
import CreatedAt from 'src/function/CreatedAt';
import TagImage from 'src/components/ImageTag/TagImage';
import Comment from 'src/components/Detail/comments/Comment';
import { Location } from 'react-router-dom';

import styled, { css } from 'styled-components';

interface Props {
  isModal?: boolean;
}

const PostDetail = ({ isModal }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  // current user id
  const userId: string | undefined = useLoginUserId();

  // 게시글 삭제, 좋아요, 좋아요 취소, 저장, 저장 취소
  const { deletePostMutate } = usePost();

  // read data
  const { isLoading, data } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPost(id!)
    // enabled: id ? true : false
  });
  const post = data?.data;
  const writer = post?.userId;

  // delete post
  const clickDelete = (id: string) => {
    deletePostMutate.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`, { state: post });
  };

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>error</p>;
  }

  return (
    <S.DtailArea>
      <S.PostHead>
        <S.WriterImgBox>
          <S.WriterImg src={writer.profileImg} />
        </S.WriterImgBox>
        <S.WriterContainer>
          <div>
            <S.WriterInfo $isModal={isModal}>
              <S.WirterLevel>Lv. 수습</S.WirterLevel>
              {writer.nickname}
              <S.WriterSir $isModal={isModal}>님의</S.WriterSir>
              {post.postCategory === 'common' && '그르륵갉'}
              {post.postCategory === 'recipe' && '편식조합'}
            </S.WriterInfo>
            <S.PostDate $isModal={isModal}>
              <CreatedAt createdAt={post.created_at} />
            </S.PostDate>
          </div>
          {userId === writer.id && (
            <S.WriterFunction $isModal={isModal}>
              <S.WriterButton $isModal={isModal} onClick={clickEdit}>
                수정
              </S.WriterButton>
              <S.Contour />
              <S.WriterButton $isModal={isModal} onClick={() => clickDelete(post.id)}>
                삭제
              </S.WriterButton>
            </S.WriterFunction>
          )}
        </S.WriterContainer>
      </S.PostHead>
      <S.ContentsBox>
        <S.PostTitle>{post.title}</S.PostTitle>
        {post.postCategory === 'common' && <S.PostBodyCommon dangerouslySetInnerHTML={{ __html: post.body }} />}
        <div>
          {post.postCategory === 'recipe' &&
            post.tagimage.length > 0 &&
            post.tagimage.map((tagImageUrl: string, index: string) => (
              <TagImage
                key={index}
                imageUrl={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${tagImageUrl}`}
                recipeBody={post.recipeBody[index]}
                tagsForImage={post.tags[index] || []}
              />
            ))}
        </div>
        {post.orgPostId && <OrgPostCard orgPost={post.orgPostId} />}
        <BottomFunction userId={userId} post={post} />
        <Comment />
      </S.ContentsBox>
    </S.DtailArea>
  );
};

export default PostDetail;

interface ColorProps {
  $isModal?: boolean;
}

export const S = {
  DtailArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 84px 0;
  `,

  PostHead: styled.div`
    background-color: transparent;

    width: 890px;
    height: 42px;
    margin-bottom: 23px;

    display: flex;
    position: relative;
  `,

  WriterContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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

  WriterInfo: styled.div<ColorProps>`
    ${(props) =>
      props.$isModal
        ? css`
            color: white;
          `
        : css`
            color: var(--neutral-500, #667085);
          `}

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

  WriterSir: styled.div<ColorProps>`
    ${(props) =>
      props.$isModal
        ? css`
            color: white;
          `
        : css`
            color: var(--neutral-500, #667085);
          `}
  `,

  PostDate: styled.div<ColorProps>`
    ${(props) =>
      props.$isModal
        ? css`
            color: white;
          `
        : css`
            color: var(--neutral-500, #667085);
          `}

    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  `,

  WriterFunction: styled.div<ColorProps>`
    ${(props) =>
      props.$isModal &&
      css`
        color: white !important;
      `}

    width: 90px;
    height: 26px;
    margin: 8px 0px;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
  `,

  Contour: styled.div`
    background: var(--neutral-300, #d0d5dd);

    width: 1px;
    height: 12px;
    border-radius: 100px;
    margin: 0px 4.5px;
  `,

  WriterButton: styled.button<ColorProps>`
    background-color: transparent;

    width: 40px;
    height: 26px;
    padding: 3px 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) =>
      props.$isModal
        ? css`
            color: white !important;
          `
        : css`
            color: var(--neutral-500, #667085);
          `}
    text-align: center;
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
  `,
  // 김윤수가 추가한 컨텐츠 박스
  ContentsBox: styled.div`
    width: 890px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    padding-bottom: 100px;
  `,

  PostTitle: styled.div`
    width: 790px;
    margin: 20px 0px 20px 0px;

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
    min-height: 40vh;
    margin: 10px 0px 10px 0px;
    white-space: normal;
    word-wrap: break-word;
    color: var(--Black, #242424);

    /* body-게시글 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
    /* 디자이너님에게 공유  */
    /* padding: 20px; */
    /* border: 1px solid black; */
    /* border-radius: 10px; */

    font-family: 'inherit';
    /* background-color: royalblue; */
  `
};
