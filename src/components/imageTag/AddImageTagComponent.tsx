import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { atom, useAtom, useSetAtom } from 'jotai';

import ImageTag from './ImageTag';
import { Tag, AddImageTagProps } from 'src/types/types';
import { ReactComponent as TrashCanIcon } from 'src/components/imageTag/svg/TrashCanIcon.svg';
import { S } from './StyledAddImageTagComponent';
import { NON_MEMBER } from 'src/utility/alertMessage';
import { toast } from 'react-toastify';

//Jotai atom을 이용 데이터 전역관리
export const contentsAtom = atom<{ [key: string]: string }>({});
export const tagsDataAtom = atom<{ [key: string]: Tag[] }>({});
export const imagesAtom = atom<{ [key: string]: File }>({});

// 이미지 태그를 추가하는 컴포넌트 정의
const AddImageTagComponent: React.FC<AddImageTagProps> = ({ body, imageData, tagData, isEditMode }) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const setInputData = useSetAtom(contentsAtom);
  const setTagsData = useSetAtom(tagsDataAtom);
  const [image, setImages] = useAtom(imagesAtom);

  //데이터를 받아와서 세팅하기 위한 변수
  const [, setSelectedImage] = useState<File[] | null>(imageData ?? null);
  const [, setTags] = useState<Tag[][]>(tagData ?? []);
  const [, setContents] = useState<string[]>(body ?? []);
  const [editMode] = useState<boolean>(isEditMode ?? false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!editMode) {
      addImageTagComponent();
    }
    setSelectedImage(imageData ?? null);
    setTags(tagData ?? []);
    setContents(body ?? []);
  }, [imageData, tagData, body]);

  // 수정 페이지에서 접근 시 필요합니다
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
      toast('이미지는 10개까지 첨부 가능합니다.');
      // alert('이미지는 10개까지 첨부 가능합니다.');
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

    setInputData((prevInputData) => ({ ...prevInputData, [componentUuid]: '' }));
    setTagsData((prevTagsData) => ({ ...prevTagsData, [componentUuid]: [] }));
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

  const updateComponentOrder = (newOrder: string[]) => {
    const filteredComponents = newOrder
      .map((uuid) => imageTagComponents.find((component) => (component.key as string) === uuid))
      .filter(Boolean);

    setImageTagComponents(filteredComponents as JSX.Element[]);

    setInputData((prevInputData) => {
      const updatedInputData: { [key: string]: string } = {};
      newOrder.forEach((uuid, index) => {
        updatedInputData[uuid] = prevInputData[uuid];
      });
      return updatedInputData;
    });
    setImages((prevImages) => {
      const updatedImages: { [key: string]: File } = {};
      newOrder.forEach((uuid, index) => {
        updatedImages[uuid] = prevImages[uuid];
      });
      return updatedImages;
    });
    setTagsData((prevTagsData) => {
      const updatedTagsData: { [key: string]: Tag[] } = {};
      newOrder.forEach((uuid, index) => {
        updatedTagsData[uuid] = prevTagsData[uuid];
      });
      return updatedTagsData;
    });
  };

  const changeComponentOrder = (currentIndex: number, targetIndex: number) => {
    if (currentIndex === targetIndex) return;

    const updatedComponents = [...imageTagComponents];
    const [movedComponent] = updatedComponents.splice(currentIndex, 1);
    updatedComponents.splice(targetIndex, 0, movedComponent);

    const componentsOrder = updatedComponents.map((component) => (component.key as string) || '');
    updateComponentOrder(componentsOrder);
  };

  const handleDragStart = (index: number, event: React.DragEvent) => {
    event.dataTransfer.setData('text/plain', index.toString());
    setDragging(true);
  };

  const handleDrop = (index: number, event: React.DragEvent) => {
    event.preventDefault();
    const sourceIndex = Number(event.dataTransfer.getData('text/plain'));

    if (dragging && sourceIndex !== index) {
      const updatedComponents = [...imageTagComponents];
      const [movedComponent] = updatedComponents.splice(sourceIndex, 1);
      updatedComponents.splice(index, 0, movedComponent);

      const componentsOrder = updatedComponents.map((component) => (component.key as string) || '');
      updateComponentOrder(componentsOrder);
      setDragging(false);
    }
  };

  return (
    <>
      <S.ButtonThumbnailArea>
        <S.SmallButton>
          <S.AddBtn type="button" onClick={addImageTagComponent}>
            이미지 추가
          </S.AddBtn>
        </S.SmallButton>

        {imageTagComponents.map((component, index) => {
          const componentUuid = (component.key as string) || '';
          return (
            // 김윤수 추가 S.Contests
            <React.Fragment key={componentUuid}>
              {image[componentUuid] && (
                <S.SmallButton>
                  {typeof image[componentUuid] === 'string' ? (
                    <S.ThumbnailImg
                      src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image[componentUuid]}`}
                      alt="이미지"
                      draggable
                      onDragStart={(e) => handleDragStart(index, e)}
                      onDrop={(e) => handleDrop(index, e)}
                      onDragOver={(e) => e.preventDefault()}
                    />
                  ) : (
                    <S.ThumbnailImg
                      src={URL.createObjectURL(image[componentUuid])}
                      alt="이미지"
                      draggable
                      onDragStart={(e) => handleDragStart(index, e)}
                      onDrop={(e) => handleDrop(index, e)}
                      onDragOver={(e) => e.preventDefault()}
                    />
                  )}
                </S.SmallButton>
              )}
            </React.Fragment>
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

              <S.UpDownButtonArea>
                <S.UpDownButton
                  as="button"
                  type="button"
                  onClick={() => changeComponentOrder(index, index - 1)}
                  disabled={index === 0}
                >
                  위
                </S.UpDownButton>
                <S.UpDownButton
                  as="button"
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
