import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import KakaoMap from 'src/kakaoMap/KakaoMap';

const NearBy = () => {
  return (
    <S.Container>
      <KakaoMap />
    </S.Container>
  );
};

export default NearBy;

type Props = {
  $location: string;
  $type: string;
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 10px;
  `,

  Icon: styled.div`
    padding: 10px 0;
    /* width: 20px; */
    /* height: 20px; */
    margin-right: 4px;
  `,

  TapButton: styled(Link)<Props>`
    display: flex;
    align-items: center;
    padding: 10px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    border-radius: 10px;
    text-decoration: none;
    color: black;
    cursor: pointer;
    ${(props) =>
      props.$type === props.$location &&
      css`
        background-color: #efefef;
      `}
    &:hover {
      background-color: #efefef;
    }
  `
};
