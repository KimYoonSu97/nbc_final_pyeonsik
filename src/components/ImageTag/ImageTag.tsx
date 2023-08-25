import React, { useState, useRef } from 'react';

import { Tag, Data } from 'src/types/types';

import { ImageTagProps } from 'src/types/types';
import ImageUploader from './ImageUploader';
import Search from './Search';
import PostWriteInput from '../post/PostWriteInput';

const ImageTag: React.FC<ImageTagProps> = ({ onTagsAndResultsChange, onImageSelect, onContentsChange }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [addTagMode, setAddingTagMode] = useState(false);
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [searchFormHandler, setSearchFormHandler] = useState(false);
  const [selectedTagVisible, setselectedTagVisible] = useState(false);
  const [contents, setContents] = useState('');

  console.log('나는 ImageTag', contents);

  const postRef = useRef<HTMLInputElement>(null);

  console.log('selectedImage', selectedImage?.name);

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

      const newTag = { x, y, prodData: '', img: '', price: '', selectedimg: selectedImage?.name };
      setTags([...updatedTags, newTag]);

      setContents(contents);

      setSelectedTagIndex(updatedTags.length);
      setselectedTagVisible(true);
      setSearchFormHandler(true);
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

  const handleSearchModalClose = () => {
    // 검색을 수행하지 않은 상태에서 닫는 경우에만 검색 결과를 초기화하고 선택한 태그를 삭제
    if (searchFormHandler) {
      setSelectedTagIndex(null);
      setTags(tags.filter((_, index) => index !== selectedTagIndex));
    }

    setSearchFormHandler(false);
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

  const handleImageSelect = (imageFile: File) => {
    setSelectedImage(imageFile); // 이미지 선택 시 상태 업데이트
    onImageSelect(imageFile);
  };

  return (
    <>
      <div>
        <PostWriteInput
          ref={postRef}
          type="text"
          name="body"
          title="body"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
            onContentsChange(e.target.value);
          }}
        />

        <ImageUploader onImageSelect={handleImageSelect} />
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
        {selectedTagIndex !== null && searchFormHandler && <Search onSearchResultSelect={handleSelectResult} />}
        {searchFormHandler && <button onClick={handleSearchModalClose}>닫기</button>}
      </div>
    </>
  );
};

export default ImageTag;
