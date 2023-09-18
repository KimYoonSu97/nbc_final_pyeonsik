import { motion } from 'framer-motion';
import React from 'react';
import { SkeletonItem } from 'src/styles/styleBox';
import styled from 'styled-components';

const PostSkeleton = () => {
  return (
    <>
      <S.Container>
        <S.UserContainer>
          <S.WriterImgBox />
          <S.WriterInfo />
        </S.UserContainer>
        <S.ContentBox />
      </S.Container>
    </>
  );
};

export default PostSkeleton;

const S = {
  Container: styled.div`
    margin-bottom: 50px;
    width: 890px;
    border-radius: 10px;
    position: relative;
    margin-top: 50px;
  `,

  UserContainer: styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
  `,

  WriterContainer: styled(SkeletonItem)`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  WriterImgBox: styled(SkeletonItem)`
    width: 42px;
    height: 42px;
    margin-right: 8px;
    border-radius: 100px;
    overflow: hidden;
  `,

  WriterInfo: styled(SkeletonItem)`
    display: inline-flex;
    align-items: flex-start;
    margin-bottom: 6px;
    height: 35px;
  `,

  ContentBox: styled(SkeletonItem)`
    border-radius: 10px;
    min-height: 232px;
    max-height: 524px;
    position: relative;
  `
};
