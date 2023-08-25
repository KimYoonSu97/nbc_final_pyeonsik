// AddImageTagComponent.tsx
import React, { useState } from 'react';
import ImageTag from './ImageTag';
import { atom, useAtom } from 'jotai';
import { ImageTagProps } from 'src/types/types';

export const contentsAtom = atom<string[]>([]);

const AddImageTagComponent: React.FC<ImageTagProps> = ({ onTagsAndResultsChange, onImageSelect, onContentsChange }) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const [inputData, setInputData] = useAtom(contentsAtom);

  const addImageTagComponent = () => {
    const newImageTagComponent = (
      <div key={Date.now()}>
        <ImageTag
          onTagsAndResultsChange={onTagsAndResultsChange}
          onImageSelect={onImageSelect}
          onContentsChange={(newContents) => handleContentsChange(imageTagComponents.length, newContents)}
        />
      </div>
    );

    setImageTagComponents((prevComponents) => [...prevComponents, newImageTagComponent]);
    setInputData((prevInputData) => [...prevInputData, '']);
  };

  const handleContentsChange = (index: number, newContents: string) => {
    setInputData((prevInputData) => {
      const updatedInputData = [...prevInputData];
      updatedInputData[index] = newContents;
      return updatedInputData;
    });
  };

  console.log('나는 AddImageTag', inputData);

  return (
    <div>
      <button onClick={addImageTagComponent}>이미지 추가</button>
      {imageTagComponents.map((component, index) => (
        <div key={index}>{component}</div>
      ))}
    </div>
  );
};

export default AddImageTagComponent;
