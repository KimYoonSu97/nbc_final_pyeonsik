import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Post } from 'src/types/types';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import WriterContainer from './reactionSource/WriterContainer';
import ContentBox from './reactionSource/ContentBox';
import BottomFunction from '../post/detail/BottomFunction';
import useLoginUserId from 'src/hooks/useLoginUserId';
import BestComment from './reactionSource/BestComment';

interface Props {
  item: Post;
}

const PostForMain = ({ item: postData }: Props) => {
  const location = useLocation();
  const userId = useLoginUserId();
  const post = useMemo(() => postData, [postData]);
  const writer = post?.userId;

  return (
    <S.Container>
      {/* 게시글 작성자 정보 */}
      <S.Head>
        <WriterContainer post={post} writer={writer} />
      </S.Head>

      {/* 여기를 클릭하면 링크로 넘어감 */}
      <S.ContentAreaForClickEvent to={`/detail/${postData.id}`} state={{ backgroundLocation: location }}>
        {/* 게시글 데이터 */}
        <S.ContentArea>
          <S.ContentBox>
            <ContentBox post={post} />
          </S.ContentBox>
        </S.ContentArea>
        <S.LinearContainer />
      </S.ContentAreaForClickEvent>
      <S.BottomContainer>
        {/* 베스트 댓글 => 좋아요가 많은 댓글 */}
        <BestComment postId={post.id} />
        {/* 인터렉션 버튼 */}
        <S.FunctionBox>
          <BottomFunction userId={userId} post={post} />
        </S.FunctionBox>
      </S.BottomContainer>
    </S.Container>
  );
};

export default PostForMain;

const S = {
  FunctionBox: styled.div`
    border-left: 1px solid #d9d9d9;
    /* pointer-events: none; */
    /* width: 200px; */

    gap: 20px;
    display: flex;
    margin-left: auto;
    padding-left: 30px;
    /* background-color: red; */
  `,
  LinearContainer: styled.div`
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    position: absolute;
    width: 100%;
    height: 18%;
    bottom: 100px;
  `,
  BottomContainer: styled.div`
    padding: 0 50px;
    bottom: 0;
    width: 100%;
    height: 100px;

    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background: #fff;
  `,
  Container: styled.div`
    min-height: 250px;
    max-height: 580px;
    margin-bottom: 50px;
    width: 890px;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
  `,
  Head: styled.div`
    background-color: transparent;
    height: 42px;
    margin-bottom: 14px;
    display: flex;
    position: relative;
  `,
  ContentAreaForClickEvent: styled(Link)`
    text-decoration: none;
  `,
  ContentArea: styled.div`
    pointer-events: none;
    background-color: white;
    border-radius: 10px;
  `,
  ContentBox: styled.div`
    width: 890px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
};
