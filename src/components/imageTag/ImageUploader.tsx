import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { CameraIcon, SelectedFileIcon } from '../icons/index';
import { ImageUploaderProps } from 'src/types/types';
import { FlexBoxCenter, FlexBoxColum } from 'src/styles/styleBox';
import { LIMIT_10MB } from 'src/utility/guide';

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imageSelected }) => {
  const [, setImageSelect] = useState(false);

  const FileSizeValid = (file: File, maxSize: number) => {
    return file.size <= maxSize;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const maxSize = 5 * 1024 * 1024;

      if (FileSizeValid(file, maxSize)) {
        const originalFileName = file.name;
        const fileExtension = originalFileName.split('.').pop();
        const randomFileName = uuidv4() + '.' + fileExtension;

        onImageSelect(new File([file], randomFileName));
        setImageSelect(true);
      } else {
        toast(LIMIT_10MB);
      }
    }
  };

  return (
    <S.ImageContainer id="stylebox" imageselected={imageSelected}>
      <S.FileLabel as="label" imageselected={imageSelected}>
        <S.IconWrapper imageselected={imageSelected}>
          {imageSelected === 'true' ? (
            <S.SelectedFileIconBox>
              <SelectedFileIcon />
            </S.SelectedFileIconBox>
          ) : (
            <S.FileAddBox>
              <CameraIcon />
              <S.FileAddText>사진 추가하기</S.FileAddText>
              <S.FileAddGuide>최대 10장까지 업로드 할 수 있어요.</S.FileAddGuide>
            </S.FileAddBox>
          )}
        </S.IconWrapper>
        <S.FileInput type="file" accept="image/*" onChange={handleImageUpload} />
      </S.FileLabel>
    </S.ImageContainer>
  );
};

export default ImageUploader;

const S = {
  ImageContainer: styled.div<{ imageselected: string }>`
    position: ${(props) => (props.imageselected === 'true' ? 'absolute' : 'initial')};
    top: ${(props) => (props.imageselected === 'true' ? '94%' : 'initial')};
  `,
  FileInput: styled.input`
    cursor: pointer;
    opacity: 0;
  `,
  FileLabel: styled(FlexBoxCenter)<{ imageselected: string }>`
    cursor: pointer;
    flex-direction: column;
    border-radius: 10px;

    border: ${(props) => (props.imageselected === 'true' ? 'none' : '2px solid #FFF;')};
    background-color: ${(props) => (props.imageselected === 'true' ? '    ' : 'var(--neutral-200, #E4E7EC);')};

    width: ${(props) => (props.imageselected === 'true' ? '40px' : '360px')};
    height: ${(props) => (props.imageselected === 'true' ? '40px' : '360px')};
    position: ${(props) => (props.imageselected === 'true' ? 'absolute' : 'initial')};
    margin-left: ${(props) => (props.imageselected === 'true' ? '160px' : '0')};
    margin-top: ${(props) => (props.imageselected === 'true' ? '0' : '0')};
    margin-right: ${(props) => (props.imageselected === 'true' ? '0' : '12px')};

    z-index: 1;
  `,

  IconWrapper: styled.span<{ imageselected: string }>``,

  FileLabelText: styled.span`
    margin-left: 140px;
  `,

  SelectedFileIconBox: styled.div`
    margin-top: 4px;
  `,

  FileAddBox: styled(FlexBoxColum)`
    text-align: center;
    color: var(--neutral-500, #667085);
    font-family: Pretendard;
    font-style: normal;
  `,

  FileAddText: styled.div`
    margin-top: 12px;

    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
  `,

  FileAddGuide: styled.div`
    margin-top: 4px;

    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  `
};
