import { useQueries, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getPostByKeyword, getPostByKeywordSummary } from 'src/api/posts';
import { getSearchProdSummary } from 'src/api/product';
import { setBrandName } from 'src/function/setBrandName';
import { searchBar, searchKeyWord } from 'src/globalState/jotai';
import { Post, Product } from 'src/types/types';
import styled from 'styled-components';

const SearchSummary = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useAtom(searchBar);
  const [searchData, setSearchData] = useAtom(searchKeyWord);

  if (!search) {
    return <></>;
  }

  if (searchData.postData === null || searchData.productData === null) {
    return (
      <AnimatePresence>
        <S.Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <S.PostContainer>
            <S.Title>검색어를 2자 이상 입력해주세요!</S.Title>
          </S.PostContainer>
        </S.Container>
      </AnimatePresence>
    );
  }

  return (
    <>
      {search && (
        <AnimatePresence>
          <S.Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <S.PostContainer>
              <S.Title>게시글</S.Title>
              {searchData?.postData?.map((item) => {
                return (
                  <S.PostRow
                    key={item.id}
                    onClick={() => {
                      setSearch(false);
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <S.PostCategory>{item.postCategory === 'recipe' ? '편식조합' : '그르르갉'}</S.PostCategory>
                    <S.PostTitle>{item.title}</S.PostTitle>
                  </S.PostRow>
                );
              })}
            </S.PostContainer>
            <S.ProductContainer>
              <S.Title>편의점 상품</S.Title>
              {searchData?.productData?.map((item) => {
                return (
                  <S.ProductRow key={item.id}>
                    <S.ProductBrand $brandName={item.prodBrand}>{setBrandName(item.prodBrand)}</S.ProductBrand>
                    <S.ProductTitle>{item.prodName}</S.ProductTitle>
                  </S.ProductRow>
                );
              })}
            </S.ProductContainer>
            <S.MoreButton
              onClick={() => {
                navigate(`/search/all?=${searchData.searchKey}`);
                setSearch(false);
              }}
            >
              검색 결과 더보기{' '}
            </S.MoreButton>
          </S.Container>
        </AnimatePresence>
      )}
    </>
  );
};

export default SearchSummary;
interface ColorProps {
  $brandName: string;
}

const S = {
  MoreButton: styled.div`
    margin-left: auto;

    cursor: pointer;
    color: var(--neutral-700, #344054);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  `,
  Container: styled(motion.div)`
    padding: 12px 14px;

    width: 635px;
    min-height: 50spx;
    max-height: 450px;
    position: fixed;
    z-index: 100;
    right: calc(((100vw - 1280px) / 2) + 16px);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(25px);
    display: flex;
    flex-direction: column;
  `,
  PostContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  ProductContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  Title: styled.div`
    color: var(--neutral-400, var(--neutral-400, #98a2b3));
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  `,
  PostCategory: styled.div`
    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    padding: 3px 13px;
    background: var(--neutral-100, #f2f4f7);
    border-radius: 100px;
  `,
  PostTitle: styled.div`
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    padding-top: 1px;
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom: 1px solid gray;
    }
  `,
  PostRow: styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  `,
  ProductRow: styled.div`
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
    margin: 10px 0;
    gap: 8px;
  `,
  ProductBrand: styled.div<ColorProps>`
    color: var(--white, #fff);
    text-align: center;
    width: 68px;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    padding: 3px 0;
    background-color: ${(props) => {
      switch (props.$brandName) {
        case 'GS25':
          return '#2ABADA';
        case 'CU':
          return '#652F8D';
        case '7-ELEVEn':
          return '#008061';
        case 'emart24':
          return '#FFB81C;';

        default:
          return 'black';
      }
    }};
    border-radius: 100px;
  `,
  ProductTitle: styled.div`
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  `
};
