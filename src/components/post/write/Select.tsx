import { useAtom } from 'jotai';
import React from 'react';
import Header from 'src/components/header/Header';
import { IconCommonPost, IconRecipePost } from 'src/components/icons';
import { writeCategorySelect } from 'src/globalState/jotai';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';

const Select = () => {
  const [_, setWriteCategorySelect] = useAtom(writeCategorySelect);

  return (
    <>
      <Header />
      <S.Container>
        <S.TitleArea>카테고리를 선택해주세요.</S.TitleArea>
        <S.RecipeButton
          onClick={() => {
            setWriteCategorySelect('recipe');
          }}
        >
          <S.Title>편식조합 공유하기</S.Title>
          <IconRecipePost />
        </S.RecipeButton>
        <S.CommonButton
          onClick={() => {
            setWriteCategorySelect('common');
          }}
        >
          <S.Title>그르르갉 글쓰기</S.Title>
          <IconCommonPost />
        </S.CommonButton>
      </S.Container>
    </>
  );
};

export default Select;

const S = {
  Container: styled.div`
    margin: 0 auto;
    width: 1280px;
    height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  TitleArea: styled.p`
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px; /* 133.333% */
    margin-bottom: 28px;
    background: linear-gradient(109deg, #ffb334 23.92%, #eb4335 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `,
  RecipeButton: styled.div`
    width: 450px;
    height: 120px;
    border-radius: 10px;
    border: 2px solid var(--main, #f02826);
    color: var(--font-black, var(--Black, #242424));
    ${styleFont.headlineMedium}
    margin-bottom:20px;
    background: #fff;

    padding: 34px 32px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    &:hover {
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
    }
  `,
  CommonButton: styled.div`
    width: 450px;
    height: 120px;
    border-radius: 10px;
    border: 2px solid var(--sub, #feb334);
    color: var(--font-black, var(--Black, #242424));
    ${styleFont.headlineMedium}
    padding: 34px 32px;
    display: flex;
    background: #fff;

    /* justify-content: center; */
    align-items: center;
    &:hover {
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
    }
  `,
  Title: styled.q`
    margin-right: auto;
  `
};
