import React, { ReactComponentElement, ReactElement } from 'react';
import MyAchievement from 'src/components/mypage/MyAchievement';
import MyPost from 'src/components/mypage/MyPost';
import Profile from 'src/components/mypage/Profile';
import { myPageTabAtom } from 'src/globalState/jotai';
import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { RenderComponents } from 'src/types/types';

const renderPage = [
  {
    type: '1',
    component: <Profile />
  },
  {
    type: '2',
    component: <MyPost />
  },
  {
    type: '3',
    component: <MyAchievement />
  }
];

const Mypage = () => {
  //사이드바 버튼으로 컨텐츠 영역의 컴포넌트를 제어합니다.
  const [tab] = useAtom(myPageTabAtom);

  //렌더링 해줄 컴포넌트를 내뱉는 함수입니다. 전역상태로 선언된 탭과 상단에 선언된 렌더링 페이지 객체배열을 파라미터로 받습니다.
  const renderSelector = (type: string, renderPage: RenderComponents[]): JSX.Element => {
    const [find] = renderPage.filter((item) => {
      return item.type === type;
    });
    return find.component;
  };

  return <S.ContentsBox>{renderSelector(tab, renderPage)}</S.ContentsBox>;
};

export default Mypage;

const S = {
  ContentsBox: styled.div`
    /* background: white; */
    height: auto;

    /* height: 424px; */
    border-radius: 10px;
  `
};
