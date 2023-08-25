import React from 'react';
import styled from 'styled-components';
import ProdCard from './ProdCard';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getEventProd } from 'src/api/product';
import { useLocation } from 'react-router';

const ProdList = () => {
  const location = useLocation();
  console.log(location.search);

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['eventProd'],
    ({ pageParam = 0 }) => {
      getEventProd(pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      }
    }
  );

  console.log(isSuccess);
  console.log(data);

  return (
    <></>
    // <S.Container>
    //   {data?.data.map((item) => {
    //     return <ProdCard key={item.id} data={item} />;
    //   })}
    // </S.Container>
  );
};

export default ProdList;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    gap: 30px;
    flex-wrap: wrap;
  `
};
