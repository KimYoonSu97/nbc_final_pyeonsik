import React, { useState, useRef } from 'react';

import { Tag, Data } from 'src/types/types';
import { ImageTagProps } from 'src/types/types';
import ImageUploader from './ImageUploader';
import Search from './Search';
import PostWriteBodyInput from '../post/write/PostWriteBodyInput';
import { TagIcon, DeleteIcon } from '../icons/index';
import { IconPlusTag } from '../icons';
import { S } from './StyledImageTag';

const ImageTag: React.FC<ImageTagProps> = ({
  onTagsAndResultsChange,
  onImageSelect,
  onContentsChange,
  body,
  imageData,
  tagData
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(imageData ?? null);
  const [contents, setContents] = useState(body ?? '');
  const [tags, setTags] = useState<Tag[]>(tagData ?? []);
  const [addTagMode, setAddingTagMode] = useState(false);
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [searchFormHandler, setSearchFormHandler] = useState(false);
  const [selectedTagVisible, setselectedTagVisible] = useState(false);
  const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);

  const postRef = useRef<HTMLTextAreaElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  //이미지 클릭 시 태그를 찍는 함수 x,y 값과 text, img, price, prodBrand, id를 갖고있다
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (addTagMode) {
      //  이미지를 정해서 해당 이미지에서만 Tag가 찍힘
      const image = event.currentTarget;
      const imageRect = image.getBoundingClientRect();

      const x = event.clientX - imageRect.left;
      const y = event.clientY - imageRect.top;

      // 이미 값을 가지고 있는 태그 중 마지막에 값을 가지지 않은 태그의 인덱스를 찾음
      const lastEmptyTagIndex = tags.findIndex((tag) => !tag.prodData);
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

    //선택된 이미지를 blob객체로 만들어서 이미지를 디스플레이
    const blob = new Blob([imageFile], { type: imageFile.type });
    const blobUrl = URL.createObjectURL(blob);
    setImageBlobUrl(blobUrl);

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
        <ImageUploader onImageSelect={handleImageSelect} imageSelected={selectedImage ? 'true' : 'false'} />
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
              <S.Image src={imageBlobUrl || 'null'} alt="이미지" onClick={handleImageClick} />
            )}
            <S.AddTagButton
              onClick={(e) => {
                e.preventDefault();
                setAddingTagMode(!addTagMode);
              }}
            >
              <S.IconBox>
                <IconPlusTag />
              </S.IconBox>
              {addTagMode ? '태그 추가 완료' : '제품 태그 추가'}
            </S.AddTagButton>

            {tags.map((tag, index) => (
              <S.TagContainer
                key={index}
                onClick={() => handleTagClick(index)}
                onMouseDown={(event) => handleTagDrag(index, event)}
                style={{
                  left: tag.x,
                  top: tag.y
                }}
              >
                <S.TagIconContainer>
                  <S.TagIconBox>
                    <TagIcon />
                  </S.TagIconBox>
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
                      <S.SearchResultsContainer id="search">
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
