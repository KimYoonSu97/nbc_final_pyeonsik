import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import BrandSelector from './BrandSelector';

const EventSideBar = () => {
  const location = useLocation();

  return (
    <S.Container>
      <S.ContentsBox>
        <BrandSelector />
      </S.ContentsBox>
    </S.Container>
  );
};

export default EventSideBar;

const S = {
  Container: styled.div`
    position: fixed;
    right: calc(((100vw - 1280px) / 2) + 16px);
  `,
  ContentsBox: styled.div`
    background: white;
    width: 296px;
    border-radius: 10px;
    margin-bottom: 20px;
  `
};
