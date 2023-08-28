import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { ImageUploaderProps } from 'src/types/types';

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const originalFileName = file.name;
      const fileExtension = originalFileName.split('.').pop();
      const randomFileName = uuidv4() + '.' + fileExtension;

      onImageSelect(new File([file], randomFileName));
    }
  };

  return (
    <div>
      <S.FileLabel>
        <S.FileInput type="file" accept="image/*" onChange={handleImageUpload} />
        <S.FileLabelText>파일 선택</S.FileLabelText>
      </S.FileLabel>
    </div>
  );
};

export default ImageUploader;

const S = {
  FileInput: styled.input`
    display: none; /* 숨김 처리 */
  `,
  FileLabel: styled.label`
    border: 1px solid #ccc;
    padding: 8px;
    cursor: pointer;
    display: inline-block;
  `,
  FileLabelText: styled.span`
    /* 파일 선택 텍스트 스타일을 정의하세요 */
  `
};
