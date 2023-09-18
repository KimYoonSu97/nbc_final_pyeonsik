import { useAtom } from 'jotai';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { searchBar, searchKeyWord } from 'src/globalState/jotai';
import { FlexBoxAlignCenter } from 'src/styles/styleBox';
import { debounce } from 'lodash';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import { getPostByKeywordSummary } from 'src/api/posts';
import { getSearchProdSummary } from 'src/api/product';
import { styleFont } from 'src/styles/styleFont';

const HeaderSearchBar = () => {
  const [searchKeyView, setSearchKeyView] = useState('');
  const [search, setSearch] = useAtom(searchBar);
  const [_, setSearchData] = useAtom(searchKeyWord);
  const navigate = useNavigate();

  const searchSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(false);
    navigate(`/search/all?=${searchKeyView}`);
  };

  const fetchData = async (keyword: string) => {
    const postData = await getPostByKeywordSummary(keyword);
    const productData = await getSearchProdSummary(keyword);
    setSearchData({ postData, productData, searchKey: keyword });
  };

  const delaySearch = useCallback(
    debounce((keyword) => fetchData(keyword), 500),
    []
  );

  const onChangeSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyView(e.target.value);
    delaySearch(e.target.value);
  };

  return (
    <S.Area $focus={search}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect width="100%" height="100%" fill="none" />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="#818087" strokeWidth="2" />
          <path
            d="M17.2929 19.7071C17.6834 20.0976 18.3166 20.0976 18.7071 19.7071C19.0976 19.3166 19.0976 18.6834 18.7071 18.2929L17.2929 19.7071ZM14.2929 16.7071L17.2929 19.7071L18.7071 18.2929L15.7071 15.2929L14.2929 16.7071Z"
            fill="#818087"
          />
        </svg>
      </svg>
      <form
        onSubmit={(e) => {
          searchSummary(e);
        }}
      >
        <S.SearchArea
          onFocus={() => {
            setSearch(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setSearch(false);
            }, 200);
          }}
          placeholder="지금 뜨는 조합은?"
          type="text"
          value={searchKeyView}
          onChange={onChangeSearchBar}
        />
      </form>
    </S.Area>
  );
};

export default HeaderSearchBar;

interface AreaProps {
  $focus: boolean;
}

const S = {
  Area: styled(FlexBoxAlignCenter)<AreaProps>`
    height: 34px;
    background: #f4f4f4;
    border-radius: 8px;
    padding: 7px 8px;
    right: 16px;
    position: absolute;
    border: 1px solid var(--neutral-300, #d0d5dd);
    transition: 0.5s;
    ${(props) => {
      return (
        props.$focus &&
        css`
          box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        `
      );
    }}

    background: var(--neutral-100, #f2f4f7);
  `,
  SearchArea: styled.input`
    background-color: transparent;

    outline: none;
    border: none;
    margin-left: 8px;
    transition: 0.5s;

    width: 300px;
    border-radius: 8px;

    &:focus {
      transition: 0.5s;
      width: 589px;
    }

    color: var(--neutral-500, #667085);
    ${styleFont.bodyMedium}
  `,
  SearchResultBox: styled.div`
    top: 50px;
    right: 1px;
    width: 630px;
    height: 300px;
    background-color: royalblue;
  `
};
