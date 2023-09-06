import React from 'react';
import { styleFont } from 'src/styles/styleFont';
import { styled } from 'styled-components';

const MyAchievement = () => {
  return <S.Container>서비스 준비중입니다.</S.Container>;
};

export default MyAchievement;

const S = {
  Container: styled.div`
    ${styleFont.bodyLarge}
  `
};
