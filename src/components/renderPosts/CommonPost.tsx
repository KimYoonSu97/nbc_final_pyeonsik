import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Post, PostUserProfile } from 'src/types/types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

interface Props {
  item: Post;
}

const CommonPost = ({ item: postItem }: Props) => {
  const { nickname, profileImg } = postItem.userId as PostUserProfile;
  const { id, postCategory, body, title, recipeBody } = postItem;
  const location = useLocation();

  const item = useMemo(() => postItem, [postItem]);

  return (
    <S.Area>
      <S.Container key={id} to={`/detail/${item.id}`} state={{ backgroundLocation: location }}>
        <S.UserArea>
          <S.ProfileImg $url={profileImg} />
          <S.Level>Lv.점장</S.Level>
          <S.Nickname_Category>{nickname}</S.Nickname_Category>

          <S.Caption>님의</S.Caption>
          <S.Nickname_Category>{postCategory === 'common' ? '그르르갉' : '편식조합'}</S.Nickname_Category>
        </S.UserArea>
        <S.PostBox>
          <S.GradientArea />
          <S.BottomArea />
          <S.TitleArea>{title}</S.TitleArea>
          {/* editor 내용 변환 */}
          <S.BodyArea dangerouslySetInnerHTML={{ __html: recipeBody ? recipeBody[0] : body }} />
        </S.PostBox>
      </S.Container>
    </S.Area>
  );
};

export default CommonPost;
interface ImgProps {
  $url: string;
}

const S = {
  Area: styled.div`
    margin-top: 55px;
  `,
  Container: styled(Link)`
    /* margin-bottom: 55px; */
    text-decoration: none;
    color: black;
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
  BodyArea: styled.pre`
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
