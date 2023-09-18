import React from 'react';
import { useParams } from 'react-router';
import { RenderComponents } from 'src/types/types';
import { styled } from 'styled-components';
import Profile from 'src/components/mypage/Profile';
import MyPost from 'src/components/mypage/MyPost';
import MyAchievement from 'src/components/mypage/MyAchievement';

const renderPage = [
  {
    type: 'profile',
    component: <Profile />
  },
  {
    type: 'mypost',
    component: <MyPost />
  },
  {
    type: 'achievement',
    component: <MyAchievement />
  }
];

const Mypage = () => {
  const param = useParams();

  const renderSelector = (type: string, renderPage: RenderComponents[]): JSX.Element => {
    const [find] = renderPage.filter((item) => {
      return item.type === type;
    });
    return find.component;
  };

  return <S.ContentsBox>{renderSelector(param.tab as string, renderPage)}</S.ContentsBox>;
};

export default Mypage;

const S = {
  ContentsBox: styled.div`
    height: auto;
    border-radius: 10px;
  `
};
