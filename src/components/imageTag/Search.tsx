import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import supabase from 'src/lib/supabaseClient';
import { Data } from 'src/types/types';
import { SearchProps } from 'src/types/types';
import { ReactComponent as SearchIcon } from 'src/components/imageTag/svg/SearchIcon.svg';
import { FlexBox, FlexBoxAlignCenter } from 'src/styles/styleBox';
import debounce from 'lodash/debounce';
import { setBrandName } from 'src/function/setBrandName';

const Search: React.FC<SearchProps> = ({ onSearchResultSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Data[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
  }, 100);

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
      debouncedSearch(searchKeyword);
    }
  };

  const handleClickToFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

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
          onKeyPress={handleKeyPress}
          placeholder="제품명을 검색해 주세요."
          autoFocus
          ref={searchInputRef}
          onClick={handleClickToFocus}
        />
      </S.SearchInputArea>

      <S.SearchResults>
        {searchResults.length === 0 ? (
          <>
            <S.NoResultText>
              앗!
              <S.ProductKeyWordContainer>
                "{searchKeyword.length > 5 ? `${searchKeyword.slice(0, 5)}...` : searchKeyword}"
              </S.ProductKeyWordContainer>
              에 대한 검색 결과가 없어요!
            </S.NoResultText>
          </>
        ) : (
          searchResults.map((result, index) => (
            <S.SearchResultItem key={index} onClick={() => handleSelectResult(result)}>
              <S.ImageAndTextContainer>
                <S.ImageContainer>
                  <img src={result.prodImg} alt="이미지" />
                </S.ImageContainer>
                <S.TextContainer>
                  <S.ProdContainer>{setBrandName(result.prodBrand)}</S.ProdContainer>
                  <div>{result.prodName}</div>
                </S.TextContainer>
              </S.ImageAndTextContainer>
            </S.SearchResultItem>
          ))
        )}
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
    width: 355px;

    max-height: 400px;
    overflow-y: scroll;

    margin-bottom: 10px;
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    /* 마우스 오버시 스크롤바 색상 변경 */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `,

  SearchResultItem: styled(FlexBox)`
    border-radius: 10px;
    cursor: pointer;
    width: 335px;
    height: 100px;
    /* padding-right: 10px; */
    margin-right: 10px;
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
      object-fit: contain;
      background-color: white;
    }
  `,

  ImageAndTextContainer: styled(FlexBoxAlignCenter)``,

  TextContainer: styled(FlexBox)`
    flex-direction: column;
    margin-left: 10px;
    color: #000;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  `,

  ProdContainer: styled.div`
    color: #98a2b3;
  `,
  NoResultText: styled.div`
    display: flex;

    color: #98a2b3;
    margin-top: 100px;
    max-width: 340px;
    margin-left: 40px;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  `,
  ProductKeyWordContainer: styled.div`
    color: #242424;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-left: 10px;
    margin-right: 10px;
  `
};
