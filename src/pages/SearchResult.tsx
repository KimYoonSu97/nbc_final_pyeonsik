import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useParams } from 'react-router';
import { getPostByKeyword } from 'src/api/posts';

interface Search {
  keyword: string;
  type?: string;
}

const SearchResult = () => {
  const param = useParams();
  const location = useLocation();
  console.log(param);
  console.log(location);

  console.log();

  const searchKey = {
    keyword: decodeURI(window.location.search).slice(2),
    type: param.type
  };

  const { data, isError, isLoading } = useQuery(['searchPostAll'], () => {
    return getPostByKeyword(searchKey);
  });
  console.log(data);
  return <div>SearchResult</div>;
};

export default SearchResult;
