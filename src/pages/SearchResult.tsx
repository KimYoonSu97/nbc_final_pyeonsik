import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router';
import { getPostByKeyword } from 'src/api/posts';
import { Post } from 'src/types/types';
import styled from 'styled-components';
import PostCards from 'src/components/renderPosts/PostCards';
import ProdSearch from 'src/components/search/ProdSearch';

interface Search {
  keyword: string;
  type?: string;
}

const SearchResult = () => {
  const param = useParams();
  const location = useLocation();

  const searchKey = {
    keyword: decodeURI(window.location.search).slice(2),
    type: param.type
  };

  const [
    { isLoading: allLoading, data: all },
    { isLoading: recipeLoading, data: recipe },
    { isLoading: commonLoading, data: common }
  ] = useQueries({
    queries: [
      {
        queryKey: ['searchAll'],
        queryFn: () => getPostByKeyword(searchKey),
        enabled: param.type === 'all' ? true : false,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ['searchRecipe'],
        queryFn: () => getPostByKeyword(searchKey),
        enabled: param.type === 'recipe' ? true : false,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ['searchCommon'],
        queryFn: () => getPostByKeyword(searchKey),
        enabled: param.type === 'common' ? true : false,
        refetchOnWindowFocus: false
      }
    ]
  });

  return (
    <>
      {(() => {
        switch (param.type) {
          case 'all':
            return <PostCards posts={all?.data as unknown as Post[]} />;
          case 'recipe':
            return <PostCards posts={recipe?.data as unknown as Post[]} />;
          case 'common':
            return <PostCards posts={common?.data as unknown as Post[]} />;
          default:
            return <ProdSearch></ProdSearch>;
        }
      })()}
    </>
  );
};

export default SearchResult;

const S = {
  Area: styled.div`
    margin-top: 30px;
  `
};
