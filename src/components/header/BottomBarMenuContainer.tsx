import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import styled, { css } from 'styled-components';

const BottomBarMenuContainer = () => {
  const location = useLocation();
  const findPath = (str: string): string => {
    return str.split('/')[1];
  };

  return (
    <S.ButtonArea>
      {findPath(location.pathname) === 'search' ? (
        <>
          <S.SearchCategory>검색 카테고리</S.SearchCategory>
          <S.BoardButton to={`/search/all${location.search}`} $type={'/search/all'} $location={location.pathname}>
            전체 보기
          </S.BoardButton>
          <S.BoardButton to={`/search/recipe${location.search}`} $type={'/search/recipe'} $location={location.pathname}>
            편식조합
          </S.BoardButton>
          <S.BoardButton to={`/search/common${location.search}`} $type={'/search/common'} $location={location.pathname}>
            그르르갉
          </S.BoardButton>
          <S.BoardButton
            to={`/search/products${location.search}`}
            $type={'/search/products'}
            $location={location.pathname}
          >
            편의점 상품
          </S.BoardButton>
        </>
      ) : (
        <>
          <S.AllButton to={`/`} $type={''} $location={location.search} $path={location.pathname}>
            전체 보기
          </S.AllButton>
          <S.BoardButton to={`/?=recipe`} $type={'?=recipe'} $location={location.search}>
            편식조합
          </S.BoardButton>
          <S.BoardButton to={`/?=common`} $type={'?=common'} $location={location.search}>
            그르르갉
          </S.BoardButton>
          <S.BoardButton to={`/event`} $type={'/event'} $location={location.pathname}>
            행사 상품
          </S.BoardButton>
        </>
      )}
    </S.ButtonArea>
  );
};

type Props = {
  $location: string;
  $type: string;
  $path?: string;
};

export default BottomBarMenuContainer;

const S = {
  ButtonArea: styled(FlexBoxCenter)`
    margin-right: 14px;
  `,
  AllButton: styled(Link)<Props>`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 3px 18px;
    border-bottom: 2px solid white;
    text-decoration: none;
    ${styleFont.labelLarge}
    color: var(--font-black, var(--black, #242424));
    ${(props) =>
      props.$type === props.$location && props.$path === '/'
        ? css`
            transition: 0.5s;
            border-bottom: 2px solid #f02826;
            color: #f02826;
          `
        : ''}

    &:hover {
      color: #f02826;
      transition: 0.5s;
    }
  `,
  BoardButton: styled(Link)<Props>`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 3px 18px;
    border-bottom: 2px solid white;
    text-decoration: none;
    ${styleFont.labelLarge}
    color: var(--font-black, var(--black, #242424));
    ${(props) =>
      props.$type === props.$location &&
      css`
        transition: 0.5s;
        border-bottom: 2px solid #f02826;
        color: #f02826;
      `}

    &:hover {
      color: #f02826;
      transition: 0.5s;
    }
  `,
  QuickButtonArea: styled(FlexBoxAlignCenter)`
    gap: 8px;
  `,
  QuickPostButton: styled(FlexBoxAlignCenter)`
    border-radius: 100px;
    background-color: #f5f5f5;
    padding: 3px 18px;
    height: 34px;
  `,
  SearchCategoryArea: styled.div``,
  SearchCategory: styled(FlexBoxCenter)`
    height: 34px;
    padding: 0 18px;
    padding-top: 2px;
    margin-bottom: 4px;
    border-radius: 100px;
    background: var(--neutral-200, #e4e7ec);
    color: var(--font-black, var(--black, #242424));
    ${styleFont.labelLarge}
  `
};
