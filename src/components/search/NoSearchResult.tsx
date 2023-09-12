import React from 'react';
import { FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import { IconNoSearchResult } from '../icons';
import { useLocation, useNavigate } from 'react-router';

const NoSearchResult = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Logo>
        <IconNoSearchResult />
      </S.Logo>
      <S.Caption>
        앗!
        <S.SearchKeyWord> "{decodeURI(window.location.search).slice(2)}" </S.SearchKeyWord>이 포함된 결과가 없어요!
      </S.Caption>
      <S.NavigateButton
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로 돌아가기
      </S.NavigateButton>
    </S.Container>
  );
};

export default NoSearchResult;

const S = {
  Container: styled(FlexBoxCenter)`
    flex-direction: column;
    margin-top: 200px;
  `,
  Ment: styled.div``,
  Logo: styled.div`
    margin-bottom: 32px;
  `,
  Caption: styled.span`
    color: var(--font-black, var(--Black, #242424));
    text-align: center;

    /* headline-small */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 133.333% */
    margin-bottom: 16px;
  `,
  SearchKeyWord: styled.span`
    color: var(--neutral-500, var(--Black, #667085));
    text-align: center;

    /* headline-small */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 133.333% */
  `,
  NavigateButton: styled.div`
    width: 210px;
    padding: 7px 34px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    color: var(--font-black, var(--Black, #242424));
    cursor: pointer;
    ${styleFont.bodyMedium}
    font-weight: 700;
  `
};
