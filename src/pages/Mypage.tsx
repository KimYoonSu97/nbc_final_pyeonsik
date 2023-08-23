import React, { ReactComponentElement, ReactElement } from 'react';
import { useAtom } from 'jotai';
import { RenderComponents } from 'src/types/types';
import { styled } from 'styled-components';
import MyAchievement from 'src/components/mypage/MyAchievement';
import MyPost from 'src/components/mypage/MyPost';
import Profile from 'src/components/mypage/Profile';
import { useParams } from 'react-router';

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
  //사이드바 버튼으로 컨텐츠 영역의 컴포넌트를 제어합니다.
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
