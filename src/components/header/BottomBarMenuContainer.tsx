import React from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const BottomBarMenuContainer = () => {
  const param = useParams();
  const location = useLocation();

  const findPath = (str: string): string => {
    return str.split('/')[1];
  };

  return (
    <S.ButtonArea>
      {findPath(location.pathname) === 'search' && <S.SearchCategory>검색 카테고리</S.SearchCategory>}
      <S.BoardButton to={`/search/all${location.search}`} $type={'/search/all'} $location={location.pathname}>
        전체보기
      </S.BoardButton>
      <S.BoardButton to={`/search/recipe${location.search}`} $type={'/search/recipe'} $location={location.pathname}>
        편식조합
      </S.BoardButton>
      <S.BoardButton to={`/search/common${location.search}`} $type={'/search/common'} $location={location.pathname}>
        그르르갉
      </S.BoardButton>
      {findPath(location.pathname) === 'search' && (
        <S.BoardButton
          to={`/search/products${location.search}`}
          $type={'/search/products'}
          $location={location.pathname}
        >
          편의점 제품
        </S.BoardButton>
      )}
    </S.ButtonArea>
  );
};

type Props = {
  $location: string;
  $type: string;
};

export default BottomBarMenuContainer;

const S = {
  ButtonArea: styled.div`
    display: flex;
    margin-right: 14px;
    justify-content: center;
    align-items: center;
  `,
  BoardButton: styled(Link)<Props>`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 3px 18px;
    border-bottom: 2px solid white;
    text-decoration: none;
    color: var(--font-black, var(--black, #242424));
    ${(props) =>
      props.$type === props.$location &&
      css`
        transition: 0.5s;
        border-bottom: 2px solid #000;
      `}
    &:hover {
      transition: 0.5s;
      border-bottom: 2px solid #000;
    }
  `,
  QuickButtonArea: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  QuickPostButton: styled.div`
    display: flex;
    align-items: center;
    border-radius: 100px;
    background-color: #f5f5f5;
    padding: 3px 18px;
    height: 34px;
  `,
  SearchCategoryArea: styled.div``,
  SearchCategory: styled.div`
    display: flex;
    height: 34px;
    padding: 0 18px;
    padding-top: 2px;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
    border-radius: 100px;
    background: var(--neutral-200, #e4e7ec);
    color: var(--font-black, var(--black, #242424));

    /* label-large */

    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    /* line-height: 24px; 150% */
  `
};
