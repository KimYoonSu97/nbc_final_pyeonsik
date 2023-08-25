import React, { useState } from 'react';
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
      console.error('Error fetching search results:', error);
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

  return (
    <div className="tag-search-modal">
      <input
        type="text"
        value={searchKeyword}
        onChange={(event) => handleSearchTextChange(event.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={performSearch}>검색하기</button>
      <div>
        {searchResults.map((result, index) => (
          <div
            key={index}
            onClick={() => handleSelectResult(result)}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            <div> {result.prodName}</div>
            <div> {result.prodBrand}</div>
            <div> {result.price}</div>
            <div>
              <img src={result.prodImg} alt="이미지" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
