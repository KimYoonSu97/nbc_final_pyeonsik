// AddImageTagComponent.tsx

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ImageTag from './ImageTag';
import { atom, useAtom } from 'jotai';
import { ImageTagPropsToAddImageComponent, Tag } from 'src/types/types';

//Jotai atom을 이용 데이터 전역관리
export const contentsAtom = atom<{ [key: string]: string }>({});
export const tagsDataAtom = atom<{ [key: string]: Tag[] }>({});

// 이미지 태그를 추가하는 컴포넌트 정의
const AddImageTagComponent: React.FC<ImageTagPropsToAddImageComponent> = ({ onImageSelect, onRemovedImage }) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const [inputData, setInputData] = useAtom(contentsAtom);
  const [, setTagsData] = useAtom(tagsDataAtom);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // 이미지 태그 컴포넌트 추가 함수
  const addImageTagComponent = () => {
    const componentUuid = uuidv4();
    const newImageTagComponent = (
      <div key={componentUuid}>
        <ImageTag
          onTagsAndResultsChange={(tags) => handleTagsChange(componentUuid, tags)}
          onImageSelect={(selectedImage) => {
            setSelectedImages((prevImages) => [...prevImages, selectedImage]);
            onImageSelect(selectedImage);
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

  // 내용 변경 처리 콜백 함수
  const handleContentsChange = (uuid: string, newContents: string) => {
    setInputData((prevInputData) => ({ ...prevInputData, [uuid]: newContents }));
  };

  // 이미지 태그 컴포넌트 제거 함수
  const removeImageTagComponent = (uuid: string) => {
    const index = Object.keys(inputData).indexOf(uuid);

    if (index !== -1) {
      const removedImage = selectedImages[index];
      // 이미지 삭제 콜백 호출
      onRemovedImage(removedImage);

      // 기존 상태 업데이트
      setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));

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
      <button onClick={addImageTagComponent}>이미지 추가</button>
      {imageTagComponents.map((component) => {
        const componentUuid = (component.key as string) || '';
        return (
          <div key={componentUuid}>
            {component}
            <button onClick={() => removeImageTagComponent(componentUuid)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default AddImageTagComponent;
