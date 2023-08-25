import React, { useState } from 'react';
import ImageTag from '../post/ImageTag';
import { Tag, Data } from 'src/types/types';

interface AddImageTagComponentProps {
  onTagsAndResultsChange: (tags: Tag[], searchResults: Data[]) => void;
  onImageSelect: (image: File) => void;
}

const AddImageTagComponent: React.FC<AddImageTagComponentProps> = ({ onTagsAndResultsChange, onImageSelect }) => {
  const [imageTagComponents, setImageTagComponents] = useState<
    { component: JSX.Element; tags: Tag[]; searchResults: Data[] }[]
  >([]);

  const addImageTagComponent = () => {
    const newImageTagComponent = (
      <ImageTag key={Date.now()} onTagsAndResultsChange={onTagsAndResultsChange} onImageSelect={onImageSelect} />
    );

    const newImageTagData = {
      component: newImageTagComponent,
      tags: [],
      searchResults: []
    };

    console.log('newImageTagData.component', newImageTagData.component);
    console.log('newImageTagData.tags', newImageTagData.tags);
    console.log('newImageTagData.searchResults', newImageTagData.searchResults);

    setImageTagComponents((prevComponents) => [...prevComponents, newImageTagData]);
  };

  return (
    <div>
      <button onClick={addImageTagComponent}>이미지 추가</button>
      {imageTagComponents.map((imageTagData, index) => (
        <div key={index}>{imageTagData.component}</div>
      ))}
    </div>
  );
};

export default AddImageTagComponent;
