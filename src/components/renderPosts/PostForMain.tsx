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
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  item: Post;
}

const PostForMain = ({ item: postData }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useLoginUserId();
  const post = useMemo(() => postData, [postData]);
  const writer = post?.userId;

  return (
    // <AnimatePresence>
    //   <S.Container key={postData.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    //     {/* 게시글 작성자 정보 */}
    //     <S.Head>
    //       <WriterContainer post={post} writer={writer} />
    //     </S.Head>
    //     {/* 여기를 클릭하면 링크로 넘어감 */}
    //     <S.HoverBox>
    //       <S.ContentAreaForClickEvent
    //         onClick={() => navigate(`/detail/${postData.id}`, { state: { backgroundLocation: location } })}
    //       >
    //         {/* 게시글 데이터 */}
    //         <S.ContentArea>
    //           <S.ContentBox>
    //             <ContentBox post={post} />
    //           </S.ContentBox>
    //         </S.ContentArea>
    //         <S.LinearContainer />
    //       </S.ContentAreaForClickEvent>
    //       <S.BottomContainer>
    //         {/* 베스트 댓글 => 좋아요가 많은 댓글 */}
    //         <BestComment postId={post.id} />
    //         {/* 인터렉션 버튼 */}
    //         <S.FunctionBox>
    //           <BottomFunction userId={userId} post={post} />
    //         </S.FunctionBox>
    //       </S.BottomContainer>
    //     </S.HoverBox>
    //   </S.Container>
    // </AnimatePresence>
    <AnimatePresence>
      <S.Container key={postData.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* 게시글 작성자 정보 */}
        <S.Head>
          <WriterContainer post={post} writer={writer} />
        </S.Head>
        {/* 여기를 클릭하면 링크로 넘어감 */}

        <S.HoverBox>
          <div style={{ height: '100%', position: 'relative' }}>
            <S.FunctionBox>
              <BottomFunction userId={userId} post={post} />
            </S.FunctionBox>
            <S.ContentAreaForClickEvent
              onClick={() => navigate(`/detail/${postData.id}`, { state: { backgroundLocation: location } })}
            >
              {/* 게시글 데이터 */}
              <S.ContentArea>
                <S.ContentBox>
                  <ContentBox post={post} />
                </S.ContentBox>
                <S.BottomContainer>
                  <BestComment postId={post.id} />
                </S.BottomContainer>
                <S.LinearContainer />
              </S.ContentArea>
            </S.ContentAreaForClickEvent>
          </div>
        </S.HoverBox>
      </S.Container>
    </AnimatePresence>
  );
};

export default PostForMain;

// <S.BottomContainer>
//   {/* 베스트 댓글 => 좋아요가 많은 댓글 */}
//   {/* 인터렉션 버튼 */}

// </S.BottomContainer>
const S = {
  HoverBox: styled.div`
    border-radius: 10px;
    min-height: 232px;
    max-height: 524px;
    overflow: hidden;
    position: relative;
    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(128, 128, 128, 0.25);
    }
  `,
  FunctionBox: styled.div`
    position: absolute;
    bottom: 26px;
    right: 0;
    margin-right: 50px;
    gap: 20px;
    display: flex;
    border-left: 1px solid #d9d9d9;
    z-index: 1;
    padding-left: 40px;
    /* height: 100px; */
  `,
  LinearContainer: styled.div`
    padding: 0 40px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 90%);
    position: absolute;
    width: 100%;
    height: 98px;
    bottom: 100px;
  `,
  BottomContainer: styled.div`
    border-radius: 10px;
    bottom: 0;
    width: 100%;
    height: 100px;
    position: absolute;
    display: flex;
    align-items: center;
    background: #fff;
  `,
  Container: styled(motion.div)`
    /* max-height: 580px; */
    /* border: 1px solid red; */
    margin-bottom: 50px;
    width: 890px;
    /* overflow: hidden; */
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
  ContentAreaForClickEvent: styled.div`
    cursor: pointer;
  `,
  ContentArea: styled.div`
    pointer-events: none;
    background-color: white;
    border-radius: 10px;
  `,
  ContentBox: styled.div`
    width: 890px;
    min-height: 232px;
    max-height: 524px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
};
