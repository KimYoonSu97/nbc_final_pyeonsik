// AddImageTagComponent.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ImageTag from './ImageTag';
import { atom, useAtom } from 'jotai';
import { ImageTagPropsToAddImageComponent, Tag } from 'src/types/types';

export const contentsAtom = atom<string[]>([]);
export const tagsDataAtom = atom<Tag[][]>([]);

const AddImageTagComponent: React.FC<ImageTagPropsToAddImageComponent> = ({ onImageSelect, onRemovedImage }) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const [inputData, setInputData] = useAtom(contentsAtom);
  const [tagsData, setTagsData] = useAtom(tagsDataAtom);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  console.log('inputData', inputData);
  console.log('tagsData', tagsData);
  console.log('selectedImages', selectedImages);

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

    setImageTagComponents((prevComponents) => [...prevComponents, newImageTagComponent]);
    setInputData((prevInputData) => [...prevInputData, '']);
    setTagsData((prevTagsData) => [...prevTagsData, []]);
  };

  //각 컴포넌트의 Tag 값을 배열로 저장하는 함수
  const handleTagsChange = (uuid: string, tags: Tag[]) => {
    const index = imageTagComponents.findIndex((component) => component.key === uuid);
    if (index !== -1) {
      const updatedTagsData = [...tagsData];
      updatedTagsData[index] = tags;
      setTagsData(updatedTagsData);
    }
  };

  //각 컴포넌트의 body 값을 배열로 저장하는 함수
  const handleContentsChange = (uuid: string, newContents: string) => {
    const index = imageTagComponents.findIndex((component) => component.key === uuid);
    if (index !== -1) {
      setInputData((prevInputData) => {
        const updatedInputData = [...prevInputData];
        updatedInputData[index] = newContents;
        return updatedInputData;
      });
    }
  };

  const removeImageTagComponent = (uuid: string) => {
    // 아이템의 인덱스를 찾기 위해 uuid를 사용하여 검색
    const index = imageTagComponents.findIndex((component) => {
      const componentKey = String(component.key); // key 값을 문자열로 변환
      // 컴포넌트의 key와 uuid가 일치하는 경우 해당 컴포넌트의 인덱스 반환
      return componentKey === uuid;
    });

    if (index !== -1) {
      const removedImage = selectedImages[index];
      onRemovedImage(removedImage);

      setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));

      setImageTagComponents((prevComponents) => {
        const updatedComponents = prevComponents.filter((_, i) => i !== index);
        return updatedComponents;
      });
      setInputData((prevInputData) => {
        const updatedInputData = prevInputData.filter((_, i) => i !== index);
        return updatedInputData;
      });
      setTagsData((prevTagsData) => {
        const updatedTagsData = prevTagsData.filter((_, i) => i !== index);
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
