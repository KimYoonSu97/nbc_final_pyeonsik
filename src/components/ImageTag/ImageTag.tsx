import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Tag, Data } from 'src/types/types';
import { ImageTagProps } from 'src/types/types';
import ImageUploader from './ImageUploader';
import Search from './Search';
// import PostWriteInput from '../post/PostWriteInput';
import PostWriteBodyInput from '../post/PostWriteBodyInput';

const ImageTag: React.FC<ImageTagProps> = ({
  onTagsAndResultsChange,
  onImageSelect,
  onContentsChange,
  body,
  imageData,
  tagData
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(imageData ?? null);
  const [tags, setTags] = useState<Tag[]>(tagData ?? []);
  const [addTagMode, setAddingTagMode] = useState(false);
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [searchFormHandler, setSearchFormHandler] = useState(false);
  const [selectedTagVisible, setselectedTagVisible] = useState(false);
  const [contents, setContents] = useState(body ?? '');

  const postRef = useRef<HTMLInputElement>(null);

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
    setSelectedImage(imageFile);
    onImageSelect(imageFile);
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <ImageUploader onImageSelect={handleImageSelect} />
      <S.ImageTagContainer>
        {/* 이미지 선택 후 태그가 찍힐 부분 */}
        {selectedImage && (
          <S.ImageContainer>
            <S.AddTagButton
              onClick={(e) => {
                e.preventDefault();
                setAddingTagMode(!addTagMode);
              }}
            >
              {addTagMode ? '태그 추가 완료' : '상품 태그 추가'}
            </S.AddTagButton>
            {typeof selectedImage === 'string' ? (
              <S.Image
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${selectedImage}`}
                alt="이미지"
                onClick={handleImageClick}
              />
            ) : (
              <S.Image src={URL.createObjectURL(selectedImage)} alt="이미지" onClick={handleImageClick} />
            )}

            {tags.map((tag, index) => (
              <S.TagContainer
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
                  //검색창이 나오는 부분
                  <S.TagContainer onClick={handleModalClick}>
                    {tag.img && <S.TagImage src={`${tag.img}`} alt="이미지" />}
                    {tag.prodData && <S.ProdContainer> {tag.prodData}</S.ProdContainer>}
                    {tag.prodData || tag.price || tag.img ? (
                      <S.DeleteButton onClick={() => handleDeleteTag(index)}>삭제</S.DeleteButton>
                    ) : null}

                    {selectedTagIndex !== null && searchFormHandler && (
                      <S.SearchResultsContainer>
                        <Search onSearchResultSelect={handleSelectResult} />
                        <S.CloseButton onClick={handleSearchModalClose}>취소</S.CloseButton>
                      </S.SearchResultsContainer>
                    )}
                  </S.TagContainer>
                )}
              </S.TagContainer>
            ))}
          </S.ImageContainer>
        )}

        <PostWriteBodyInput
          ref={postRef}
          type="text"
          name="body"
          title="body"
          value={contents}
          onChange={(e) => {
            e.preventDefault();
            setContents(e.target.value);
            onContentsChange(e.target.value);
          }}
        />
      </S.ImageTagContainer>
    </>
  );
};

export default ImageTag;

const S = {
  ImageTagContainer: styled.div`
    display: flex;
    position: relative;
  `,
  AddTagButton: styled.button`
    background-color: #3498db;
    width: 200px;
    height: 40px;
    color: white;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
  `,
  ImageContainer: styled.div`
    position: relative;
  `,
  Image: styled.img`
    width: 360px;
    height: 360px;
  `,
  TagImage: styled.img`
    width: 80px;
    height: 80px;
  `,
  TagContainer: styled.div`
    width: 356px;
    height: 100px;
    background-color: white;
    display: flex;
    padding: 8px;
    box-sizing: border-box;
  `,
  ProdContainer: styled.div`
    width: 246px;
    height: 50px;
    margin-top: 50px;
  `,
  DeleteButton: styled.button`
    width: 40px;
    height: 16px;
    font-size: 8px;
    background-color: transparent;
    cursor: pointer;
  `,
  CloseButton: styled.button`
    width: 40px;
    height: 30px;
    position: absolute;
    margin-left: 300px;
    cursor: pointer;
    color: black;
    background-color: transparent;

    &:hover {
      color: gray;
    }
  `,
  SearchResultsContainer: styled.div`
    width: 380px;
    height: 450px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    background-color: white;
    overflow-y: auto;
    position: absolute;
    z-index: 1;
    /* scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    } */
  `
};
