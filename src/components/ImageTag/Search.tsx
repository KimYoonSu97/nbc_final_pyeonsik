import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import supabase from 'src/lib/supabaseClient';
import { Data } from 'src/types/types';
import { SearchProps } from 'src/types/types';

const Search: React.FC<SearchProps> = ({ onSearchResultSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Data[]>([]);

  const performSearch = async () => {
    if (!searchKeyword) return;

    const { data: filteredResults, error } = await supabase
      .from('products')
      .select('*')
      .filter('prodName', 'ilike', `%${searchKeyword}%`);

    if (error) {
      console.error('검색오류!', error);
      return;
    }

    setSearchResults(filteredResults);
  };

  const handleSearchTextChange = (SearchKeyword: string) => {
    setSearchKeyword(SearchKeyword);
  };

  const handleSelectResult = (result: Data) => {
    onSearchResultSelect(result);
    setSearchKeyword('');
    setSearchResults([]);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <S.SearchContainer>
      <S.SearchButton onClick={performSearch}>🔎</S.SearchButton>
      <S.SearchInput
        type="text"
        value={searchKeyword}
        onChange={(event) => handleSearchTextChange(event.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="제품명을 검색해주세요."
      />

      <S.SearchResults>
        {searchResults.map((result, index) => (
          <S.SearchResultItem key={index} onClick={() => handleSelectResult(result)}>
            <S.ImageAndTextContainer>
              <S.ImageContainer>
                <img src={result.prodImg} alt="이미지" />
              </S.ImageContainer>
              <S.TextContainer>
                <div>{result.prodBrand}</div>
                <div>{result.prodName}</div>
              </S.TextContainer>
            </S.ImageAndTextContainer>
          </S.SearchResultItem>
        ))}
      </S.SearchResults>
    </S.SearchContainer>
  );
};

export default Search;

const S = {
  SearchContainer: styled.div`
    position: relative;
  `,

  SearchInput: styled.input`
    text-align: center;
    width: 300px;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  `,

  SearchButton: styled.button`
    position: absolute;
    margin-top: 7px;
    margin-left: 5px;
    z-index: 2; /* 다른 요소 위에 위치 */
    background-color: transparent;
    cursor: pointer;
  `,
  SearchResults: styled.div`
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    padding: 10px;

    width: 300px;
    height: 380px;
    /* overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    } */
  `,
  SearchResultItem: styled.div`
    border-radius: 10px;
    display: flex;
    cursor: pointer;
    width: 320px;
    height: 100px;
    margin-bottom: 10px;
    background-color: white;
  `,

  ImageContainer: styled.div`
    max-width: 100%;
    height: auto;

    img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }
  `,
  ImageAndTextContainer: styled.div`
    display: flex;
    align-items: center;
  `,

  TextContainer: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  `
};
