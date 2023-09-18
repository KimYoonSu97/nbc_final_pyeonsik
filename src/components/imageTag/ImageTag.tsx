import React, { useState, useRef } from 'react';

import { Tag, Data } from 'src/types/types';
import { ImageTagProps } from 'src/types/types';
import ImageUploader from './ImageUploader';
import Search from './Search';
import PostWriteBodyInput from '../post/write/PostWriteBodyInput';
import { TagIcon, DeleteIcon } from '../icons/index';
import { IconPlusTag } from '../icons';
import { S } from './StyledImageTag';
import TagModal from './TagModal';
import { setBrandName } from 'src/function/setBrandName';

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
  const [modal, setModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const postRef = useRef<HTMLTextAreaElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (addTagMode) {
      const image = event.currentTarget;
      const imageRect = image.getBoundingClientRect();

      const x = event.clientX - imageRect.left;
      const y = event.clientY - imageRect.top;

      const lastEmptyTagIndex = tags.findIndex((tag) => !tag.prodData);
      const updatedTags = [...tags];

      if (lastEmptyTagIndex !== -1) {
        updatedTags.splice(lastEmptyTagIndex, 1);
      }

      const newTag = { x, y, prodData: '', img: '', price: '', prodBrand: '', id: '' };
      setTags([...updatedTags, newTag]);

      setContents(contents);

      setSelectedTagIndex(updatedTags.length);
      setselectedTagVisible(true);
      setSearchFormHandler(true);
    }
  };

  const handleTagClick = (index: number) => {
    if (addTagMode || selectedTagIndex !== index) {
      setSelectedTagIndex(index);

      if (!tags[index].prodData) {
        setselectedTagVisible(true);
        setSearchFormHandler(true);
      } else {
        setselectedTagVisible(!selectedTagVisible);
        setSearchFormHandler(false);
      }
    } else {
      setselectedTagVisible(!selectedTagVisible);
    }
  };

  const handleSearchModalClose = () => {
    if (searchFormHandler) {
      setSelectedTagIndex(null);
      setTags(tags.filter((_, index) => index !== selectedTagIndex));
    }

    setSearchFormHandler(false);
  };

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

      onTagsAndResultsChange(updatedTags, []);
    }
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = tags.filter((_, idx) => idx !== index);
    setTags(updatedTags);
    setselectedTagVisible(false);
    setSelectedTagIndex(null);
    onTagsAndResultsChange(updatedTags, []);
  };

  const handleImageSelect = (imageFile: File) => {
    setSelectedImage(imageFile);

    const blob = new Blob([imageFile], { type: imageFile.type });
    const blobUrl = URL.createObjectURL(blob);
    setImageBlobUrl(blobUrl);

    onImageSelect(imageFile);
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleTagDrag = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);

    const selectedTag = tags[index];

    if (selectedTag.prodData && addTagMode) {
      setSelectedTagIndex(index);
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

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <>
      <S.ImageTagContainer>
        <ImageUploader onImageSelect={handleImageSelect} imageSelected={selectedImage ? 'true' : 'false'} />
        {selectedImage && (
          <S.ImageContainer ref={imageContainerRef}>
            {typeof selectedImage === 'string' ? (
              <S.Image
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${selectedImage}`}
                alt="이미지"
                onClick={handleImageClick}
                style={addTagMode ? { cursor: 'pointer' } : {}}
              />
            ) : (
              <S.Image
                src={imageBlobUrl || 'null'}
                alt="이미지"
                onClick={(event) => {
                  handleImageClick(event);
                  closeModal();
                }}
                style={addTagMode ? { cursor: 'pointer' } : {}}
              />
            )}
            <S.AddTagButton
              onClick={(e) => {
                e.preventDefault();
                setAddingTagMode(!addTagMode);
                openModal();
              }}
            >
              <S.IconBox>
                <IconPlusTag />
              </S.IconBox>
              {addTagMode ? '태그 추가 완료' : '제품 태그 추가'}
              <S.BubbleContainer className="dropDownLink">
                <S.BubbleTail />
                <S.BubbleTailFalse />
                <S.BubbleBox>버튼을 누르고 원하는 위치를 클릭해 주세요.</S.BubbleBox>
              </S.BubbleContainer>
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
                  <S.TagDataContainer searchFormHandler={searchFormHandler} onClick={handleModalClick}>
                    {tag.img && <S.TagImage src={`${tag.img}`} alt="이미지" />}

                    <S.DeleteButton onClick={() => handleDeleteTag(index)}>
                      <S.DeleteIconContainer>
                        <DeleteIcon />
                        삭제
                      </S.DeleteIconContainer>
                    </S.DeleteButton>

                    <S.DataContainer>
                      {tag.prodBrand && <S.ProdBrandContainer>{setBrandName(tag.prodBrand)}</S.ProdBrandContainer>}
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
