import React from 'react';
import { Post } from 'src/types/types';
import { styled } from 'styled-components';
import CommonPost from './reactionSource/CommonPost';
import { useNavigate } from 'react-router';
import { atomWithHash } from 'jotai-location';

interface Props {
  data: Post[];
}

const PostCards = ({ data }: Props) => {
  const navigate = useNavigate();

  return (
    <S.Area>
      {data?.map((item: Post) => {
        if (item.postCategory === 'common') {
          return <CommonPost key={item.id} item={item}></CommonPost>;
        } else {
          //레시피 게시물 보여주는 컴포넌트 따로 짜야댐
          return <CommonPost key={item.id} item={item}></CommonPost>;
        }
      })}
    </S.Area>
  );
};

export default PostCards;

interface ImgProps {
  $url: string;
}

const S = {
  Area: styled.div`
    margin-top: 30px;
  `,
  Container: styled.div`
    margin-bottom: 55px;
  `,
  UserArea: styled.div`
    margin-bottom: 10px;
    height: 30px;
    display: flex;
    align-items: center;
  `,
  ProfileImg: styled.div<ImgProps>`
    width: 30px;
    height: 30px;
    border-radius: 100px;
    border: 1px solid black;
    background-image: ${(props) => `url(${props.$url})`};
    background-position: center;
    background-size: cover;
  `,
  Level: styled.div`
    font-size: 12px;
    font-weight: 700;
    line-height: 16px; /* 133.333% */
    background: #d9d9d9;
    width: 58px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    margin-left: 8px;
    padding-top: 2px;
  `,
  Nickname_Category: styled.div`
    color: #000;
    /* body-medium */
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    padding-top: 2px;
    margin-left: 4px;
  `,
  Caption: styled.div`
    color: #737373;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    padding-top: 2px;
    margin-left: 4px;
  `,
  PostBox: styled.div`
    height: 230px;
    background-color: white;
    padding: 20px 50px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  `,
  TitleArea: styled.div`
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    margin-bottom: 22px;
  `,
  BodyArea: styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  `,
  GradientArea: styled.div`
    position: absolute;
    width: 100%;
    right: 0;
    height: 50px;
    bottom: 50px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0) 100%);
  `,
  BottomArea: styled.div`
    position: absolute;
    width: 100%;
    height: 50px;
    background-color: white;
    right: 0;
    bottom: 0;
    padding: 0px 50px 26px 50px;
    display: flex;
    gap: 32px;
  `
};
