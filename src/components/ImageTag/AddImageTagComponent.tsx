import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import ImageTag from './ImageTag';
import { atom, useAtom } from 'jotai';
import { Tag } from 'src/types/types';
import { ReactComponent as TrashCanIcon } from 'src/components/ImageTag/svg/TrashCanIcon.svg';
import { AddImageTagProps } from 'src/types/types';

//Jotai atom을 이용 데이터 전역관리
export const contentsAtom = atom<{ [key: string]: string }>({});
export const tagsDataAtom = atom<{ [key: string]: Tag[] }>({});
export const imagesAtom = atom<{ [key: string]: File }>({});

// 이미지 태그를 추가하는 컴포넌트 정의
const AddImageTagComponent: React.FC<AddImageTagProps> = ({ body, imageData, tagData, isEditMode }) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const [, setInputData] = useAtom(contentsAtom);
  const [image, setImages] = useAtom(imagesAtom);
  const [, setTagsData] = useAtom(tagsDataAtom);

  //데이터를 받아와서 세팅하기 위한 변수
  const [, setSelectedImage] = useState<File[] | null>(imageData ?? null);
  const [, setTags] = useState<Tag[][]>(tagData ?? []);
  const [, setContents] = useState<string[]>(body ?? []);
  const [editMode] = useState<boolean>(isEditMode ?? false);

  useEffect(() => {
    if (!editMode) {
      addImageTagComponent();
    }
    setSelectedImage(imageData ?? null);
    setTags(tagData ?? []);
    setContents(body ?? []);
  }, [body, imageData, body]);

  //수정 페이지에서 접근 시 필요합니다
  useEffect(() => {
    if (imageData && imageData.length > 0) {
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

    if (imageTagComponents.length >= 10) {
      alert('이미지는 10개까지 첨부 가능합니다!');
      return;
    }

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
    const Message = window.confirm('작성하신 내용을 삭제하시겠습니까?');

    if (Message) {
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
    }
  };

  const changeComponentOrder = (currentIndex: number, targetIndex: number) => {
    if (currentIndex === targetIndex) return;

    const updatedComponents = [...imageTagComponents];
    const [movedComponent] = updatedComponents.splice(currentIndex, 1);
    updatedComponents.splice(targetIndex, 0, movedComponent);

    // 이미지 컴포넌트 순서 업데이트
    setImageTagComponents(updatedComponents);

    // Atom에서도 순서 업데이트
    const componentsOrder = updatedComponents.map((component) => (component.key as string) || '');
    setInputData((prevInputData) => {
      const updatedInputData: { [key: string]: string } = {};
      componentsOrder.forEach((uuid, index) => {
        updatedInputData[uuid] = prevInputData[uuid];
      });
      return updatedInputData;
    });
    setImages((prevImages) => {
      const updatedImages: { [key: string]: File } = {};
      componentsOrder.forEach((uuid, index) => {
        updatedImages[uuid] = prevImages[uuid];
      });
      return updatedImages;
    });
    setTagsData((prevTagsData) => {
      const updatedTagsData: { [key: string]: Tag[] } = {};
      componentsOrder.forEach((uuid, index) => {
        updatedTagsData[uuid] = prevTagsData[uuid];
      });
      return updatedTagsData;
    });
  };

  return (
    <>
      {/* 이미지 추가 버튼은 따로 빼서 고정 위드값과 관계없음. */}
      <S.ButtonThumbnailArea>
        <S.SmallButton>
          <S.AddBtn type="button" onClick={addImageTagComponent}>
            이미지 추가
          </S.AddBtn>
        </S.SmallButton>

        {imageTagComponents.map((component) => {
          const componentUuid = (component.key as string) || '';
          return (
            // 김윤수 추가 S.Contests
            <>
              {image[componentUuid] && (
                <S.SmallButton>
                  {typeof image[componentUuid] === 'string' ? (
                    <S.ThumbnailImg
                      src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image[componentUuid]}`}
                      alt="이미지"
                    />
                  ) : (
                    <S.ThumbnailImg src={URL.createObjectURL(image[componentUuid])} alt="이미지" />
                  )}
                </S.SmallButton>
              )}
            </>
          );
        })}
      </S.ButtonThumbnailArea>
      {/* 여기는 전체 에디터가 담길 부분임. */}
      <S.ContentArea>
        {imageTagComponents.map((component, index) => {
          const componentUuid = (component.key as string) || '';
          return (
            // 김윤수 추가 S.Contests
            <S.Contents key={componentUuid} style={{ marginTop: '10px' }}>
              {component}
              <S.RemoveButton type="button" onClick={() => removeImageTagComponent(componentUuid)}>
                <TrashCanIcon />
              </S.RemoveButton>

              {/* 아래가 위아래로 움직이는 버튼입니다 CSS는 적용이 안되어있습니다...ㅜ.ㅜ */}
              <S.UpDownButtonArea>
                <S.UpDownButton
                  type="button"
                  onClick={() => changeComponentOrder(index, index - 1)}
                  disabled={index === 0}
                >
                  위
                </S.UpDownButton>
                <S.UpDownButton
                  type="button"
                  onClick={() => changeComponentOrder(index, index + 1)}
                  disabled={index === imageTagComponents.length - 1}
                >
                  아래
                </S.UpDownButton>
              </S.UpDownButtonArea>
            </S.Contents>
          );
        })}
      </S.ContentArea>
      <S.BackGroundColor />
    </>
  );
};
export default AddImageTagComponent;

const S = {
  //김윤수 추가 2
  UpDownButtonArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    position: absolute;
    left: 962px;
    bottom: 20px;
  `,
  UpDownButton: styled.button`
    border-radius: 10px;

    width: 48px;
    height: 48px;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
      background-color: transparent;
      cursor: not-allowed;
    }
  `,
  // 김윤수 추가
  ButtonThumbnailArea: styled.div`
    width: 48px;
    position: fixed;
    left: calc((100vw - 1280px) / 2 + 93px);
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* background-color: royalblue; */
  `,
  SmallButton: styled.div`
    /* width: 48px; */
    /* height: 48px; */
    /* border-radius: 10px; */
  `,
  ThumbnailImg: styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
  `,
  Contents: styled.div`
    display: flex;
    position: relative;
  `,
  ContentArea: styled.div`
    /* background-color: royalblue; */
  `,

  RemoveButton: styled.button`
    width: 48px;
    height: 48px;
    position: absolute;
    left: 962px;
    /* margin-left: 950px; */
    /* z-index: 999; */
  `,

  AddBtn: styled.button`
    width: 48px;
    height: 48px;
  `,
  BackGroundColor: styled.div`
    width: 100vw;
    height: 100vh;
    background: var(--Background, #f6f7f9);
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  `
};
