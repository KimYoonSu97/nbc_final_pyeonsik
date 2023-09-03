import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Tag, Data } from 'src/types/types';
import { ImageTagProps } from 'src/types/types';
import ImageUploader from './ImageUploader';
import Search from './Search';
import PostWriteBodyInput from '../post/PostWriteBodyInput';
import { ReactComponent as TagIcon } from 'src/components/ImageTag/svg/TagIcon.svg';
import { ReactComponent as DeleteIcon } from 'src/components/ImageTag/svg/DeleteIcon.svg';

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

  const postRef = useRef<HTMLTextAreaElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  //이미지 클릭 시 태그를 찍는 함수 x,y 값과 text, img, price, prodBrand, id를 갖고있다
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

      //태그 안에 담을 데이터를 가진 newTag변수
      const newTag = { x, y, prodData: '', img: '', price: '', prodBrand: '', id: '' };
      setTags([...updatedTags, newTag]);

      setContents(contents);

      setSelectedTagIndex(updatedTags.length);
      setselectedTagVisible(true);
      setSearchFormHandler(true);
    }
  };

  //태그를 클릭 시 실행되는 함수 모달 내용 보였다 안보였다
  const handleTagClick = (index: number) => {
    if (addTagMode || selectedTagIndex !== index) {
      setSelectedTagIndex(index);
      setselectedTagVisible(!selectedTagVisible);
      setSearchFormHandler(false);
    } else {
      setselectedTagVisible(!selectedTagVisible);
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
      selectedTag.prodBrand = result.prodBrand;
      selectedTag.id = result.id;

      setTags(updatedTags);
      setSearchFormHandler(false);

      //검색 후 검색결과를 담아서 콜백으로 부모 컴포넌트로 값 전달
      onTagsAndResultsChange(updatedTags, []);
    }
  };

  //태그 삭제 함수
  const handleDeleteTag = (index: number) => {
    const updatedTags = tags.filter((_, idx) => idx !== index);
    setTags(updatedTags);
    setselectedTagVisible(false);
    setSelectedTagIndex(null);
    //삭제 후 콜백으로 수정된 값을 전달
    onTagsAndResultsChange(updatedTags, []);
  };

  //이미지 선택 함수
  const handleImageSelect = (imageFile: File) => {
    setSelectedImage(imageFile);
    //선택된 이미지 값을 콜백으로 전달
    onImageSelect(imageFile);
  };

  //모달 클릭 함수
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // 태그 드래그 함수
  const handleTagDrag = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const selectedTag = tags[index];

    if (selectedTag.prodData && addTagMode) {
      setSelectedTagIndex(index);
      setselectedTagVisible(true);
      setSearchFormHandler(false);

      const imageContainer = imageContainerRef.current;
      const imageContainerRect = imageContainer?.getBoundingClientRect();

      if (imageContainerRect) {
        const offsetX = event.clientX - imageContainerRect.left - selectedTag.x;
        const offsetY = event.clientY - imageContainerRect.top - selectedTag.y;

        const handleMouseMove = (event: MouseEvent) => {
          const x = event.clientX - imageContainerRect.left - offsetX;
          const y = event.clientY - imageContainerRect.top - offsetY;

          if (x >= 0 && x <= imageContainerRect.width && y >= 0 && y <= imageContainerRect.height) {
            // 이미지 컨테이너 내부에서만 좌표 업데이트
            const updatedTags = [...tags];
            updatedTags[index] = { ...selectedTag, x, y };
            setTags(updatedTags);
            onTagsAndResultsChange(updatedTags, []);
          }
        };

        const handleMouseUp = () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      }
    }
  };

  return (
    <>
      <S.ImageTagContainer>
        {!selectedImage && <ImageUploader onImageSelect={handleImageSelect} imageSelected={!!selectedImage} />}
        {/* 이미지 선택 후 태그가 찍힐 부분 */}
        {selectedImage && (
          <S.ImageContainer ref={imageContainerRef}>
            {typeof selectedImage === 'string' ? (
              <S.Image
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${selectedImage}`}
                alt="이미지"
                onClick={handleImageClick}
              />
            ) : (
              <S.Image src={URL.createObjectURL(selectedImage)} alt="이미지" onClick={handleImageClick} />
            )}
            <S.AddTagButton
              onClick={(e) => {
                e.preventDefault();
                setAddingTagMode(!addTagMode);
              }}
            >
              {addTagMode ? '태그 추가 완료' : '상품 태그 추가'}
            </S.AddTagButton>

            {tags.map((tag, index) => (
              <S.TagContainer
                key={index}
                onClick={() => handleTagClick(index)}
                // 요 onMouseDown은 JS내장 함수라할까요 내장된 친구입니다
                onMouseDown={(event) => handleTagDrag(index, event)}
                style={{
                  left: tag.x,
                  top: tag.y
                }}
              >
                <S.TagIconContainer>
                  <TagIcon />
                </S.TagIconContainer>

                {selectedTagIndex === index && selectedTagVisible && (
                  //검색창이 나오는 부분
                  <S.TagDataContainer searchFormHandler={searchFormHandler} onClick={handleModalClick}>
                    {tag.img && <S.TagImage src={`${tag.img}`} alt="이미지" />}

                    <S.DeleteButton onClick={() => handleDeleteTag(index)}>
                      <S.DeleteIconContainer>
                        <DeleteIcon />
                        삭제
                      </S.DeleteIconContainer>
                    </S.DeleteButton>

                    <S.DataContainer>
                      {tag.prodBrand && <S.ProdBrandContainer>{tag.prodBrand}</S.ProdBrandContainer>}
                      {tag.prodData && <S.ProdContainer>{tag.prodData}</S.ProdContainer>}
                    </S.DataContainer>

                    {selectedTagIndex !== null && searchFormHandler && (
                      <S.SearchResultsContainer>
                        <Search onSearchResultSelect={handleSelectResult} />
                        <S.CloseButton onClick={handleSearchModalClose}>취소</S.CloseButton>
                      </S.SearchResultsContainer>
                    )}
                  </S.TagDataContainer>
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
    /* margin-left: 72px; */
    display: flex;
    position: relative;
    /* background-color: royalblue; */
    gap: 12px;
    margin-bottom: 20px;
  `,
  AddTagButton: styled.button`
    background: var(--white, #fff);

    height: 40px;
    border-radius: 50px;
    /* color: white; */
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    position: absolute;
    top: 95%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  `,

  ImageContainer: styled.div`
    position: relative;
    border-radius: 10px;
    /* overflow: hidden; */

    /* margin-right: 10px; */
  `,
  // 이미지 태그 사이즈 고정....
  Image: styled.img`
    width: 474px;
    height: 360px;
    object-fit: cover;
  `,
  TagImage: styled.img`
    width: 80px;
    height: 80px;
  `,
  TagContainer: styled.div`
    width: 356px;
    height: 100px;
    display: flex;
    align-items: center;
    background-size: 30px;
    position: absolute;
    display: flex;
    width: 20px;
    height: 20px;
  `,

  TagDataContainer: styled.div<{ searchFormHandler: boolean }>`
    margin-top: 150px;
    z-index: 2;
    position: absolute;
    left: -178px;
    width: 356px;
    height: 100px;
    background-color: ${(props) => (props.searchFormHandler ? 'transparent' : 'white')};
    display: flex;
    padding: 8px;
    box-sizing: border-box;
  `,

  DataContainer: styled.div`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
  `,

  ProdContainer: styled.div`
    width: 246px;
    font-size: 16px;
    height: 50px;
  `,

  ProdBrandContainer: styled.div`
    width: 113px;
    margin-bottom: 5px;
    font-size: 14px;
    height: 20px;
  `,

  DeleteButton: styled.button`
    width: 24px;
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
    margin-top: 5px;
    cursor: pointer;
    color: black;
    background-color: transparent;

    &:hover {
      color: gray;
    }
  `,
  SearchResultsContainer: styled.div`
    width: 400px;
    padding-top: 20px;
    padding-left: 20px;
    height: 478px;
    border-radius: 10px;
    display: flex;
    background-color: white;
    position: absolute;
    z-index: 1;
    /* overflow-y: auto; */
    /* scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    } */
  `,
  DeleteIconContainer: styled.div`
    display: flex;
    width: 34px;
    margin-left: 210px;
    align-items: center;
  `,
  TagIconContainer: styled.div`
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  `
};
