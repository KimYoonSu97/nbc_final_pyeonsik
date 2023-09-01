import React from 'react';

import styled from 'styled-components';

const SearchResult = () => {
  return (
    <>
      <S.SearchResultBox>SearchResult</S.SearchResultBox>
      <S.SearchBg></S.SearchBg>
    </>
  );
};

export default SearchResult;

const S = {
  SearchResultBox: styled.div`
    position: fixed;
    z-index: 9999;
    top: 108px;
    width: 630px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.3);
    right: calc(((100vw - 1280px) / 2) + 16px);
  `,
  SearchBg: styled.div`
    background-color: rgba(0, 0, 0, 0);
    z-index: 9999;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    position: fixed;
  `
};
