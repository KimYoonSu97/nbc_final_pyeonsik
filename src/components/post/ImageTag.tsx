import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Tag, Data } from 'src/types/types';
import supabase from 'src/lib/supabaseClient';
import { ImageTagProps } from 'src/types/types';

const ImageTag: React.FC<ImageTagProps> = ({ onTagsAndResultsChange, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [addTagMode, setAddingTagMode] = useState(false);
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [searchFormHandler, setSearchFormHandler] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Data[]>([]);
  const [selectedTagVisible, setselectedTagVisible] = useState(false);

  //이미지 클릭 시 태그를 찍는 함수 x,y 값과 text, img, price를 갖고있다
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (addTagMode) {
      const image = event.currentTarget;
      const imageRect = image.getBoundingClientRect();
      const x = event.clientX - imageRect.left;
      const y = event.clientY - imageRect.top;

      // 이미 값을 가지고 있는 태그 중 마지막에 값을 가지지 않은 태그의 인덱스를 찾음
      const lastEmptyTagIndex = tags
        .slice()
        .reverse()
        .findIndex((tag) => !tag.prodData);
      const updatedTags = [...tags];

      // 값이 없는 태그가 있고, 그 태그가 마지막에 추가한 태그라면 삭제 처리
      if (lastEmptyTagIndex !== -1 && tags.length - lastEmptyTagIndex - 1 === selectedTagIndex) {
        updatedTags.splice(tags.length - 1 - lastEmptyTagIndex, 1);
      }

      const newTag = { x, y, prodData: '', img: '', price: '' };
      setTags([...updatedTags, newTag]);

      setSelectedTagIndex(updatedTags.length);
      setselectedTagVisible(true);
      setSearchFormHandler(true);
      setSearchKeyword('');
      setSearchResults([]);
    }
  };

  //태그를 클릭 시 실행되는 함수 보였다 안보였다
  const handleTagClick = (index: number) => {
    if (addTagMode) {
      setSelectedTagIndex(index);
      setselectedTagVisible(!selectedTagVisible);
      setSearchFormHandler(false);
    } else if (selectedTagIndex === index) {
      setselectedTagVisible(!selectedTagVisible);
    } else {
      setSelectedTagIndex(index);
      setselectedTagVisible(!selectedTagVisible);
      setSearchFormHandler(false);
    }
  };

  // 검색을 수행하는 함수
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

  const handleSearchModalClose = () => {
    // 검색을 수행하지 않은 상태에서 닫는 경우에만 검색 결과를 초기화하고 선택한 태그를 삭제
    if (searchFormHandler) {
      setSearchResults([]);
      setSelectedTagIndex(null);
      setTags(tags.filter((_, index) => index !== selectedTagIndex));
    }

    setSearchFormHandler(false);
  };

  //supabase는 이미지가 한글명이거나 특수문자가 안되는 등 제약사항이 많아서 그냥 uuid로 파일명을 넣어주기 위한 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const originalFileName = file.name;
      const fileExtension = originalFileName.split('.').pop();
      const randomFileName = uuidv4() + '.' + fileExtension;
      setSelectedImage(new File([file], randomFileName));

      onImageSelect(new File([file], randomFileName));
    }
  };

  //검색결과를 반환하는 함수
  const handleSelectResult = (result: Data) => {
    if (selectedTagIndex !== null) {
      const updatedTags = [...tags];
      const selectedTag = updatedTags[selectedTagIndex];

      selectedTag.prodData = result.prodName;
      selectedTag.img = result.prodImg;
      selectedTag.price = result.price;

      setTags(updatedTags);
      setSearchResults([]);
      setSearchKeyword('');
      setSearchFormHandler(false);

      onTagsAndResultsChange(updatedTags, []);
    }
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = tags.filter((_, idx) => idx !== index);
    setTags(updatedTags);
    setselectedTagVisible(false);
    setSelectedTagIndex(null);
  };

  return (
    <>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button
          onClick={(e) => {
            e.preventDefault();
            setAddingTagMode(!addTagMode);
          }}
        >
          {addTagMode ? '태그 추가 완료' : '상품 태그 추가'}
        </button>
        {/* 이미지 선택 후 태그가 찍힐 부분 */}
        {selectedImage && (
          <div style={{ position: 'relative' }}>
            <img src={URL.createObjectURL(selectedImage)} alt="이미지" onClick={handleImageClick} />
            {tags.map((tag, index) => (
              <div
                key={index}
                onClick={() => handleTagClick(index)}
                style={{
                  position: 'absolute',
                  left: tag.x,
                  top: tag.y,
                  backgroundColor: 'red',
                  display: 'flex',
                  width: '40px',
                  height: '40px'
                }}
              >
                {selectedTagIndex === index && selectedTagVisible && (
                  <div>
                    {tag.prodData && <div> {tag.prodData}</div>}
                    {tag.price && <div> {tag.price}</div>}
                    {tag.img && <img src={`${tag.img}`} alt="이미지" />}
                    {tag.prodData || tag.price || tag.img ? (
                      <button onClick={() => handleDeleteTag(index)}>삭제</button>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* 검색창과 검색결과 부분 */}
        {selectedTagIndex !== null && searchFormHandler && (
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

            <button onClick={handleSearchModalClose}>닫기</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageTag;
