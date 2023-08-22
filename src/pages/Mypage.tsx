import React from 'react';
import { styled } from 'styled-components';

const Mypage = () => {
  return <S.ContentsBox>Mypage</S.ContentsBox>;
};

export default Mypage;

const S = {
  ContentsBox: styled.div`
    background: orange;
    height: 4000px;

    /* height: 424px; */
    border-radius: 10px;
  `
};
