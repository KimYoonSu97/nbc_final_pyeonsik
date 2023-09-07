import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { ReactComponent as CameraIcon } from 'src/components/imageTag/svg/CameraIcon.svg';
import { ImageUploaderProps } from 'src/types/types';
import { FlexBoxColumn } from 'src/styles/styleBox';

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imageSelected }) => {
  const [, setImageSelect] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const originalFileName = file.name;
      const fileExtension = originalFileName.split('.').pop();
      const randomFileName = uuidv4() + '.' + fileExtension;

      onImageSelect(new File([file], randomFileName));
      setImageSelect(true);
    }
  };

  return (
    <div>
      <S.ImageContainer id="stylebox" imageselected={imageSelected}>
        <S.FileLabel as="label" imageselected={imageSelected}>
          <S.IconWrapper imageselected={imageSelected}>
            {imageSelected === 'true' ? '🔃' : <CameraIcon />}
          </S.IconWrapper>
          <S.FileInput type="file" accept="image/*" onChange={handleImageUpload} />
        </S.FileLabel>
      </S.ImageContainer>
    </div>
  );
};

export default ImageUploader;

const S = {
  ImageContainer: styled.div<{ imageselected: string }>`
    position: ${(props) => (props.imageselected === 'true' ? 'absolute' : 'initial')};
    top: ${(props) => (props.imageselected === 'true' ? '94%' : 'initial')};
  `,
  FileInput: styled.input`
    opacity: 0;
    cursor: pointer;
  `,
  FileLabel: styled(FlexBoxColumn)<{ imageselected: string }>`
    cursor: pointer;
    flex-direction: column;
    border-radius: 10px;

    border: ${(props) => (props.imageselected === 'true' ? 'none' : '1px solid #ccc')};
    /* width: 474px;
    height: 360px; */

    width: ${(props) => (props.imageselected === 'true' ? '40px' : '474px')};
    height: ${(props) => (props.imageselected === 'true' ? '40px' : '360px')};
    position: ${(props) => (props.imageselected === 'true' ? 'absolute' : 'initial')};
    margin-left: ${(props) => (props.imageselected === 'true' ? '30px' : '0')};
    margin-top: ${(props) => (props.imageselected === 'true' ? '-30px' : '0')};

    z-index: 1;
  `,

  IconWrapper: styled.span<{ imageselected: string }>`
    &:hover {
      transform: ${(props) => (props.imageselected === 'true' ? 'scale(1.5)' : 'initial')};
    }
  `,

  FileLabelText: styled.span`
    margin-left: 140px;
  `
};