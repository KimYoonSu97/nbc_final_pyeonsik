import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchProd } from 'src/api/product';
import { useInView } from 'react-intersection-observer';
import { InfinityProductList, Product } from 'src/types/types';
import ProdCard from '../eventProd/ProdCard';
import { FlexBoxCenter } from 'src/styles/styleBox';
import { brands } from '../sidebar/event/BrandSelector';
import { setBrandName } from 'src/function/setBrandName';
import { toast } from 'react-toastify';

const ProdSearch = () => {
  const [eventFilter, setEventFilter] = useState(false);
  const [brandFilter, setBrandFilter] = useState('');

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

  const ButtonFilter = (list: Product[], eventFilter: boolean, brandfilter: string): Product[] => {
    let filteredData: Product[];

    // 이벤트 필터가 거짓 이고 브랜드 필터도 전체일때
    if (!eventFilter && brandFilter === 'all') return list;

    // 이벤트 필터가 참이면?
    if (eventFilter) {
      filteredData = list.filter((item) => item.event !== null);
      // 이벤트 필터가 참인데 브랜드 필터가 전체일때
      if (brandFilter === 'all') {
        return filteredData;
      } else if (brandFilter === 'GS25') {
        // return
      }
    }
    // else if ( brandFilter === 'CU') {
    return list;
    // }else if ( brandFilter === 'emart24') {

    // }else  {

    // }
  };

  // const filterdProduct = ()

  return (
    <>
      <S.FixedContainer>
        {brands.map((item) => {
          return <S.BrandSelect key={item.name}>{setBrandName(item.path.slice(2))}</S.BrandSelect>;
        })}

        <S.FilterArea>
          <S.FilterButton $isSelected={eventFilter}>전체제품</S.FilterButton>
          <S.FilterButton $isSelected={!eventFilter}>행사제품</S.FilterButton>
        </S.FilterArea>
      </S.FixedContainer>
      <S.FixedBox />

      <S.Container>
        {products?.map((item) => {
          return <ProdCard key={item.id} data={item} />;
        })}
      </S.Container>
      <S.EmptyBox ref={ref} />
    </>
  );
};

export default ProdSearch;

interface FilterProps {
  $isSelected: boolean;
}

const S = {
  BrandSelect: styled(FlexBoxCenter)`
    cursor: pointer;
    width: 68px;
    color: var(--font-black, var(--Black, #242424));
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 100px;
    border-radius: 100px;
    border: 1px solid var(--neutral-300, #d0d5dd);
    background: #fff;
    padding: 3px 0;
    margin-right: 4px;
  `,
  Container: styled.div`
    margin-top: 30px;

    display: flex;
    align-items: center;
    align-content: center;
    gap: 30px;
    flex-wrap: wrap;
  `,
  EmptyBox: styled.div`
    width: 200px;
    height: 200px;
  `,
  FixedContainer: styled.div`
    width: 890px;

    display: flex;
    align-items: center;
    position: fixed;
    padding: 24px 0px 10px 0px;
    background: red;

    top: 106px;
    left: calc((100vw - 1280px) / 2 + 16px);
    z-index: 10;
    /* background: #f6f7f9; */
  `,

  FixedBox: styled.div`
    width: 100%;
    height: 7px;

    position: fixed;
    top: 160px;

    background: linear-gradient(0deg, transparent 0%, #f6f7f9 100%);

    right: calc((100vw - 1280px) / 2 + 16px + 296px + 62px);
    z-index: 11;
  `,
  FilterArea: styled.div`
    display: flex;
    gap: 5px;
    margin-left: auto;
  `,
  FilterButton: styled.div<FilterProps>`
    display: flex;
    width: 56px;
    height: 26px;
    border-radius: 100px;
    cursor: pointer;

    background: ${(props) => {
      if (props.$isSelected) {
        return 'f6f7f9';
      } else {
        return '#fff';
      }
    }};

    font-weight: ${(props) => {
      if (props.$isSelected) {
        return '400';
      } else {
        return '700';
      }
    }};

    justify-content: center;
    align-items: center;

    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    line-height: 16px; /* 133.333% */
  `
};
