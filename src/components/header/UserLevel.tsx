import React from 'react';
import styled from 'styled-components';
import { styleFont } from 'src/styles/styleFont';
import { FlexBoxCenter } from 'src/styles/styleBox';

interface Props {
  level: string;
}

const UserLevel = ({ level }: Props) => {
  return (
    <S.Level>
      <S.Leveltext>Lv. {level}</S.Leveltext>
    </S.Level>
  );
};

export default UserLevel;

const S = {
  Level: styled(FlexBoxCenter)`
    border-radius: 100px;
    border: 1px solid transparent;

    background-image: linear-gradient(#fff, #fff), linear-gradient(40deg, #ffb334, #d9d9d9);
    background-origin: border-box;
    background-clip: content-box, border-box;

    height: 20px;
  `,
  Leveltext: styled.div`
    width: 100%;
    background: #fff;
    margin: 0 12px;
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 133.333% */
  `
};
