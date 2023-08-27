// AddImageTagComponent.tsx
import React, { useState } from 'react';
import ImageTag from './ImageTag';
import { atom, useAtom } from 'jotai';
import { ImageTagPropsToAddImageComponent, Tag } from 'src/types/types';

export const contentsAtom = atom<string[]>([]);
export const tagsDataAtom = atom<Tag[][]>([]);

const AddImageTagComponent: React.FC<ImageTagPropsToAddImageComponent> = ({ onImageSelect, onRemovedImage }) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const [, setInputData] = useAtom(contentsAtom);
  const [tagsData, setTagsData] = useAtom(tagsDataAtom);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const addImageTagComponent = () => {
    const newImageTagComponent = (
      <div key={Date.now()}>
        <ImageTag
          onTagsAndResultsChange={(tags) => handleTagsChange(imageTagComponents.length, tags)}
          onImageSelect={(selectedImage) => {
            setSelectedImages((prevImages) => [...prevImages, selectedImage]);
            onImageSelect(selectedImage);
          }}
          onContentsChange={(newContents) => handleContentsChange(imageTagComponents.length, newContents)}
        />
      </div>
    );

    setImageTagComponents((prevComponents) => [...prevComponents, newImageTagComponent]);
    setInputData((prevInputData) => [...prevInputData, '']);
    setTagsData((prevTagsData) => [...prevTagsData, []]);
  };

  //각 컴포넌트의 Tag 값을 배열로 저장하는 함수
  const handleTagsChange = (index: number, tags: Tag[]) => {
    const updatedTagsData = [...tagsData];
    updatedTagsData[index] = tags;
    setTagsData(updatedTagsData);
  };

  //각 컴포넌트의 body 값을 배열로 저장하는 함수
  const handleContentsChange = (index: number, newContents: string) => {
    setInputData((prevInputData) => {
      const updatedInputData = [...prevInputData];
      updatedInputData[index] = newContents;
      return updatedInputData;
    });
  };

  const removeImageTagComponent = (index: number) => {
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
  };

  return (
    <div>
      <button onClick={addImageTagComponent}>이미지 추가</button>
      {imageTagComponents.map((component, index) => {
        console.log('Rendering & Delete Index:', index); // 콘솔 출력
        return (
          <div key={index}>
            {component}
            <button onClick={() => removeImageTagComponent(index)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default AddImageTagComponent;
