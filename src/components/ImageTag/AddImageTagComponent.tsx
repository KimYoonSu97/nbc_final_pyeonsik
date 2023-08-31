import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import ImageTag from './ImageTag';
import { atom, useAtom } from 'jotai';
import { ImageTagPropsToAddImageComponent, Tag } from 'src/types/types';
import { ReactComponent as TrashCanIcon } from 'src/components/ImageTag/svg/TrashCanIcon.svg';

//Jotai atom을 이용 데이터 전역관리
export const contentsAtom = atom<{ [key: string]: string }>({});
export const tagsDataAtom = atom<{ [key: string]: Tag[] }>({});
export const imagesAtom = atom<{ [key: string]: File }>({});

// 이미지 태그를 추가하는 컴포넌트 정의
const AddImageTagComponent: React.FC<ImageTagPropsToAddImageComponent> = ({ onImageSelect }) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const [, setInputData] = useAtom(contentsAtom);
  const [images, setImages] = useAtom(imagesAtom);
  const [, setTagsData] = useAtom(tagsDataAtom);

  console.log('images', images);

  // 이미지 태그 컴포넌트 추가 함수
  const addImageTagComponent = () => {
    const componentUuid = uuidv4();
    const newImageTagComponent = (
      <div key={componentUuid}>
        <ImageTag
          onTagsAndResultsChange={(tags) => handleTagsChange(componentUuid, tags)}
          onImageSelect={(selectedImage) => {
            setImages((prevImages) => {
              const updatedImages = { ...prevImages };
              updatedImages[componentUuid] = selectedImage;
              return updatedImages;
            });
          }}
          onContentsChange={(newContents) => handleContentsChange(componentUuid, newContents)}
        />
      </div>
    );

    // 상태 업데이트
    setImageTagComponents((prevComponents) => [...prevComponents, newImageTagComponent]);
    setInputData((prevInputData) => ({ ...prevInputData, [componentUuid]: '' }));
    setTagsData((prevTagsData) => ({ ...prevTagsData, [componentUuid]: [] }));
  };

  // 태그 변경 처리 콜백 함수
  const handleTagsChange = (uuid: string, tags: Tag[]) => {
    setTagsData((prevTagsData) => ({ ...prevTagsData, [uuid]: tags }));
  };

  const handleContentsChange = (uuid: string, newContents: string) => {
    setInputData((prevInputData) => ({ ...prevInputData, [uuid]: newContents }));
  };

  const removeImageTagComponent = (uuid: string) => {
    const index = imageTagComponents.findIndex((component) => {
      const componentUuid = (component.key as string) || '';
      return componentUuid === uuid;
    });

    if (index !== -1) {
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
    }
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
    left: 400px;
    z-index: 999;
  `
};
