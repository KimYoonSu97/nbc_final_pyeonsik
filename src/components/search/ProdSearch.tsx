import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchProd } from 'src/api/product';
import { useLocation } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { InfinityProductList } from 'src/types/types';
import ProdCard from '../evnetProd/ProdCard';

const ProdSearch = () => {
  const keyword: string = decodeURI(window.location.search).slice(2);
  const {
    data: productList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<InfinityProductList>({
    queryKey: [`searchProduct`],
    queryFn: ({ pageParam }) => getSearchProd(pageParam, keyword),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    refetchOnWindowFocus: false
  });

  const products = useMemo(() => {
    return productList?.pages
      .map((data) => {
        return data.products;
      })
      .flat();
  }, [productList]);

  const { ref } = useInView({
    threshold: 1,
    onChange: (inview) => {
      if (!inview || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  return (
    <>
      <S.Container>
        {products?.map((item) => {
          return <ProdCard key={item.id} data={item} />;
        })}
        <></>
      </S.Container>
      <S.EmptyBox ref={ref}></S.EmptyBox>
    </>
  );
};

export default ProdSearch;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    gap: 30px;
    flex-wrap: wrap;
  `,
  EmptyBox: styled.div`
    width: 200px;
    height: 200px;
  `
};
