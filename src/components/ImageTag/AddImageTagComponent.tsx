import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import ImageTag from './ImageTag';
import { atom, useAtom } from 'jotai';
import { Tag } from 'src/types/types';
import { ReactComponent as TrashCanIcon } from 'src/components/ImageTag/svg/TrashCanIcon.svg';

//Jotai atom을 이용 데이터 전역관리
export const contentsAtom = atom<{ [key: string]: string }>({});
export const tagsDataAtom = atom<{ [key: string]: Tag[] }>({});
export const imagesAtom = atom<{ [key: string]: File }>({});

export interface AddImageTagProps {
  imageData?: File[];
  tagData?: Tag[][] | null;
  body?: string[] | null;
  isEditMode?: boolean;
}

// 이미지 태그를 추가하는 컴포넌트 정의
const AddImageTagComponent: React.FC<AddImageTagProps> = ({ body, imageData, tagData, isEditMode }) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const [inputData, setInputData] = useAtom(contentsAtom);
  const [image, setImages] = useAtom(imagesAtom);
  const [tagsData, setTagsData] = useAtom(tagsDataAtom);

  //데이터를 받아와서 세팅하기 위한 변수
  const [, setSelectedImage] = useState<File[] | null>(imageData ?? null);
  const [, setTags] = useState<Tag[][]>(tagData ?? []);
  const [, setContents] = useState<string[]>(body ?? []);
  const [editMode] = useState<boolean>(isEditMode ?? false);

  useEffect(() => {
    setSelectedImage(imageData ?? null);
    setTags(tagData ?? []);
    setContents(body ?? []);
  }, [body, imageData, body]);

  useEffect(() => {
    if (!editMode) {
      addImageTagComponent();
    }
  }, []);

  //수정 페이지에서 접근 시 필요합니다
  useEffect(() => {
    if (imageData && imageData.length > 0) {
      if (imageTagComponents.length >= 10) {
        return;
      }
      const newComponents = imageData.map((image, index) => {
        const componentUuid = uuidv4();

        //수정 페이지에서 접근 시 들어온 값을 Atom에 세팅
        setImages((prevImages) => ({
          ...prevImages,
          [componentUuid]: image
        }));

        setInputData((prevInputData) => ({
          ...prevInputData,
          [componentUuid]: (body && body[index]) || ''
        }));

        setTagsData((prevTagsData) => ({
          ...prevTagsData,
          [componentUuid]: (tagData && tagData[index]) || []
        }));

        return (
          <div key={componentUuid}>
            <ImageTag
              onTagsAndResultsChange={(tags) => handleTagsChange(componentUuid, tags)}
              onImageSelect={(selectedImage) => handleSetImage(componentUuid, selectedImage)}
              onContentsChange={(newContents) => handleContentsChange(componentUuid, newContents)}
              imageData={image}
              tagData={tagData && tagData[index]}
              body={body && body[index]}
            />
          </div>
        );
      });

      setImageTagComponents((prevComponents) => [...prevComponents, ...newComponents]);
    }
  }, [imageData]);

  // 이미지 태그 컴포넌트 추가 함수
  const addImageTagComponent = () => {
    const componentUuid = uuidv4();
    const newImageTagComponent = (
      <div key={componentUuid}>
        <ImageTag
          onTagsAndResultsChange={(tags) => handleTagsChange(componentUuid, tags)}
          onImageSelect={(selectedImage) => handleSetImage(componentUuid, selectedImage)}
          onContentsChange={(newContents) => handleContentsChange(componentUuid, newContents)}
        />
      </div>
    );

    setImageTagComponents((prevComponents) => [...prevComponents, newImageTagComponent]);
  };

  //이미지 변경 처리 함수
  const handleSetImage = (uuid: string, selectedImage: File) => {
    setImages((prevImages) => ({
      ...prevImages,
      [uuid]: selectedImage
    }));
  };

  // 태그 변경 처리 함수
  const handleTagsChange = (uuid: string, tags: Tag[]) => {
    setTagsData((prevTagsData) => ({ ...prevTagsData, [uuid]: tags }));
  };

  //내용 변경 처리 함수
  const handleContentsChange = (uuid: string, newContents: string) => {
    setInputData((prevInputData) => ({ ...prevInputData, [uuid]: newContents }));
  };

  //컴포넌트 삭제 처리 함수
  const removeImageTagComponent = (uuid: string) => {
    const index = imageTagComponents.findIndex((component) => {
      const componentUuid = (component.key as string) || '';
      return componentUuid === uuid;
    });

    setImages((prevImages) => {
      const updatedImages = { ...prevImages };
      delete updatedImages[uuid];
      return updatedImages;
    });

    setImageTagComponents((prevComponents) => {
      const updatedComponents = prevComponents.filter((_, i) => i !== index);
      return updatedComponents;
    });

    setInputData((prevInputData) => {
      const updatedInputData = { ...prevInputData };
      delete updatedInputData[uuid];
      return updatedInputData;
    });

    setTagsData((prevTagsData) => {
      const updatedTagsData = { ...prevTagsData };
      delete updatedTagsData[uuid];
      return updatedTagsData;
    });
  };

  return (
    <div>
      <S.AddBtn type="button" onClick={addImageTagComponent}>
        이미지 추가
      </S.AddBtn>
      {imageTagComponents.map((component) => {
        const componentUuid = (component.key as string) || '';
        return (
          <div key={componentUuid} style={{ marginTop: '10px' }}>
            <S.RemoveButton type="button" onClick={() => removeImageTagComponent(componentUuid)}>
              <TrashCanIcon />
            </S.RemoveButton>
            {component}
            {image[componentUuid] && (
              <div>
                {typeof image[componentUuid] === 'string' ? (
                  <img
                    style={{ maxWidth: '100px', maxHeight: ' 100px' }}
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image[componentUuid]}`}
                    alt="이미지"
                  />
                ) : (
                  <img src={URL.createObjectURL(image[componentUuid])} alt="이미지" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default AddImageTagComponent;

const S = {
  RemoveButton: styled.button`
    width: 48px;
    height: 48px;
    position: absolute;
    margin-left: 950px;
    z-index: 999;
  `,

  AddBtn: styled.button`
    width: 48px;
    height: 48px;
    position: fixed;
    left: calc(100vw - 1280px / 2 + 93);
    z-index: 999;
  `
};
