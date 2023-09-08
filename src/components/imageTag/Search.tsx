import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import supabase from 'src/lib/supabaseClient';
import { Data } from 'src/types/types';
import { SearchProps } from 'src/types/types';
import { ReactComponent as SearchIcon } from 'src/components/imageTag/svg/SearchIcon.svg';
import { FlexBox, FlexBoxAlignCenter } from 'src/styles/styleBox';
import debounce from 'lodash/debounce';

const Search: React.FC<SearchProps> = ({ onSearchResultSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Data[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(searchKeyword);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  const debouncedSearch = debounce(async (keyword: string) => {
    if (!keyword) return;

    const { data: filteredResults, error } = await supabase
      .from('products')
      .select('*')
      .filter('prodName', 'ilike', `%${keyword}%`);

    if (error) {
      console.error('검색오류!', error);
      return;
    }
    setSearchResults(filteredResults);
  }, 300);

  const handleSearchTextChange = (SearchKeyword: string) => {
    setSearchKeyword(SearchKeyword);
  };

  const handleSelectResult = (result: Data) => {
    onSearchResultSelect(result);
    setSearchKeyword('');
    setSearchResults([]);
  };

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     debouncedSearch(searchKeyword);
  //   }
  // };

  return (
    <S.SearchContainer>
      <S.SearchInputArea>
        <S.SearchButton onClick={() => debouncedSearch(searchKeyword)}>
          <SearchIcon />
        </S.SearchButton>
        <S.SearchInput
          as="input"
          type="text"
          value={searchKeyword}
          onChange={(event) => handleSearchTextChange(event.target.value)}
          // onKeyPress={handleKeyPress}
          placeholder="제품명을 검색해주세요."
          autoFocus
        />
      </S.SearchInputArea>

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
    padding: 20px;
    /* z-index: 9999; */
    /* z-index: 999; */
  `,
  SearchInputArea: styled(FlexBox)`
    width: 356px;
    height: 42px;

    align-items: center;
    border-radius: 10px;

    border: 1px solid #ccc;
  `,
  SearchInput: styled(FlexBox)`
    width: 80%;

    outline: none;
    border: none;

    color: #000;

    /* body-large */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    &::placeholder {
      color: var(--neutral-400, #98a2b3);
    }
  `,

  SearchButton: styled.button`
    background-color: transparent;
    cursor: pointer;
  `,

  SearchResults: styled.div`
    margin-top: 12px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    /* width: 380px; */
    max-height: 400px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  SearchResultItem: styled(FlexBox)`
    border-radius: 10px;
    cursor: pointer;
    width: 356px;
    height: 100px;
    /* margin-bottom: 10px; */
    background-color: white;
    &:hover {
      background: #efefef;
    }
  `,

  ImageContainer: styled.div`
    max-width: 100%;
    height: auto;

    img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      border: 1px solid #ccc;
      margin-left: 10px;
    }
  `,

  ImageAndTextContainer: styled(FlexBoxAlignCenter)``,

  TextContainer: styled(FlexBox)`
    flex-direction: column;
    margin-left: 10px;
    color: #000;

    /* label-large */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
  `
};
