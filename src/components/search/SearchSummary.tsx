import { useQueries } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import React from 'react';
import { getPostByKeyword } from 'src/api/posts';
import { searchBar, searchKeyWord } from 'src/globalState/jotai';
import styled from 'styled-components';
const SearchSummary = () => {
  const [search, setSearch] = useAtom(searchBar);
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeyWord);

  const searchKey = {
    keyword: searchKeyword
  };

  const [{ isLoading: allLoading, data: all }] = useQueries({
    queries: [
      {
        queryKey: ['searchAll'],
        queryFn: () => getPostByKeyword(searchKey),
        enabled: searchKey.keyword !== '' ? true : false,
        refetchOnWindowFocus: false
      }
    ]
  });

  if (!search) {
    return <></>;
  }

  return (
    <AnimatePresence>
      <S.Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <S.PostContainer>
          <S.Title>게시글</S.Title>
          <S.PostRow>
            <S.PostCategory>편식조합</S.PostCategory>
            <S.PostTitle>제목</S.PostTitle>
          </S.PostRow>
        </S.PostContainer>
        <S.ProductContainer>
          <S.Title>편의점 제품</S.Title>
          <S.ProductRow>
            <S.ProductBrand>브랜드</S.ProductBrand>
            <S.ProductTitle>제품명</S.ProductTitle>
          </S.ProductRow>
        </S.ProductContainer>
      </S.Container>
    </AnimatePresence>
  );
};

export default SearchSummary;

const S = {
  Container: styled(motion.div)`
    /* width: 100vw;
    height: 100vh; */
    padding: 12px 14px;

    width: 635px;
    min-height: 200px;
    max-height: 450px;
    position: fixed;
    z-index: 100;
    /* top: 0; */
    right: calc(((100vw - 1280px) / 2) + 16px);
    /* right: 0; */
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(25px);
  `,
  PostContainer: styled.div``,
  ProductContainer: styled.div``,
  Title: styled.div`
    color: var(--neutral-400, var(--neutral-400, #98a2b3));
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 200% */
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
    line-height: 24px; /* 171.429% */
  `,
  PostRow: styled.div`
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
    gap: 8px;
  `,
  ProductRow: styled.div`
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
    gap: 8px;
  `,
  ProductBrand: styled.div`
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
  ProductTitle: styled.div`
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
  `
};
