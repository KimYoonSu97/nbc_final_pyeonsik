import React from 'react';
import { styleFont } from 'src/styles/styleFont';
import { styled } from 'styled-components';
import Achievement from './Achievement';

const MyAchievement = () => {
  return (
    <S.Container>
      <Achievement />
    </S.Container>
  );
};

export default MyAchievement;

const S = {
  Container: styled.div`
    ${styleFont.bodyLarge}
  `
};
