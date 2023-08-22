import React, { useEffect } from 'react';
import { styled } from 'styled-components';

const MyAchievement = () => {
  useEffect(() => {
    console.log('뱃지 컴포넌트 마운트됨');
    return () => {
      console.log('뱃지컴포넌트 언마운트됨');
    };
  });

  return <S.Container>MyAchievement</S.Container>;
};

export default MyAchievement;

const S = {
  Container: styled.div`
    background-color: orange;
  `
};
