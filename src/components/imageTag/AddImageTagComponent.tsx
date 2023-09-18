import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { atom, useAtom, useSetAtom } from 'jotai';

import ImageTag from './ImageTag';
import { Tag, AddImageTagProps } from 'src/types/types';
import { AddBtn, TrashCanIcon, ArrowIcon, DotIcon } from '../icons/index';
import { ArrowIconWrapper, S, DocIconWrapper } from './StyledAddImageTagComponent';
import { toast } from 'react-toastify';
import Confirm from 'src/components/popUp/Confirm';

export const contentsAtom = atom<{ [key: string]: string }>({});
export const tagsDataAtom = atom<{ [key: string]: Tag[] }>({});
export const imagesAtom = atom<{ [key: string]: File }>({});

const AddImageTagComponent = ({ body, imageData, tagData, isEditMode }: AddImageTagProps) => {
  const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const setInputData = useSetAtom(contentsAtom);
  const setTagsData = useSetAtom(tagsDataAtom);
  const [image, setImages] = useAtom(imagesAtom);

  const [, setSelectedImage] = useState<File[] | null>(imageData ?? null);
  const [, setTags] = useState<Tag[][]>(tagData ?? []);
  const [, setContents] = useState<string[]>(body ?? []);
  const [editMode] = useState<boolean>(isEditMode ?? false);
  const [dragging, setDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!editMode) {
      addImageTagComponent();
    }
    setSelectedImage(imageData ?? null);
    setTags(tagData ?? []);
    setContents(body ?? []);
  }, [imageData, tagData, body]);

  useEffect(() => {
    if (imageData && imageData.length > 0) {
      const newComponents = imageData.map((image, index) => {
        const componentUuid = uuidv4();

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

  const addImageTagComponent = () => {
    const componentUuid = uuidv4();

    if (imageTagComponents.length === 9) {
      toast('이미지는 10개까지 첨부 가능합니다.');
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

  const handleSetImage = (uuid: string, selectedImage: File) => {
    setImages((prevImages) => ({
      ...prevImages,
      [uuid]: selectedImage
    }));
  };

  const handleTagsChange = (uuid: string, tags: Tag[]) => {
    setTagsData((prevTagsData) => ({ ...prevTagsData, [uuid]: tags }));
  };

  const handleContentsChange = (uuid: string, newContents: string) => {
    setInputData((prevInputData) => ({ ...prevInputData, [uuid]: newContents }));
  };

  const removeImageTagComponent = async (uuid: string) => {
    const confirm = await Confirm('deleteComponent');

    if (confirm) {
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <S.ButtonThumbnailArea>
        {imageTagComponents.map((component, index) => {
          const componentUuid = (component.key as string) || '';
          return (
            <React.Fragment key={componentUuid}>
              {image[componentUuid] && (
                <S.ThumbnailImgWrapper>
                  <S.SmallButton
                    draggable
                    onDragStart={(e) => handleDragStart(index, e)}
                    onDrop={(e) => handleDrop(index, e)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {typeof image[componentUuid] === 'string' ? (
                      <S.ThumbnailImg
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image[componentUuid]}`}
                        alt="이미지"
                      />
                    ) : (
                      <S.ThumbnailImg src={URL.createObjectURL(image[componentUuid])} alt="이미지" />
                    )}
                    <div>
                      <ArrowIconWrapper>
                        <ArrowIcon />
                      </ArrowIconWrapper>
                      <DocIconWrapper onMouseOver={openModal} onMouseOut={closeModal}>
                        <DotIcon />
                        {isModalOpen && (
                          <S.ModalOverlay>
                            <S.ModalContent>드래그해서 옮기기</S.ModalContent>
                          </S.ModalOverlay>
                        )}
                      </DocIconWrapper>
                    </div>
                  </S.SmallButton>
                </S.ThumbnailImgWrapper>
              )}
            </React.Fragment>
          );
        })}
        {imageTagComponents.length < 10 && (
          <S.SmallButton>
            <S.AddBtn type="button" onClick={addImageTagComponent}>
              <AddBtn />
            </S.AddBtn>
          </S.SmallButton>
        )}
      </S.ButtonThumbnailArea>
      <S.ContentArea>
        {imageTagComponents.map((component, index) => {
          const componentUuid = (component.key as string) || '';
          const isFirstContainer = index === 0;
          return (
            <S.Contents key={componentUuid} style={{ marginTop: '10px' }}>
              {component}
              {!isFirstContainer && (
                <S.RemoveButton type="button" onClick={() => removeImageTagComponent(componentUuid)}>
                  <TrashCanIcon />
                </S.RemoveButton>
              )}
            </S.Contents>
          );
        })}
      </S.ContentArea>
      <S.BackGroundColor />
    </>
  );
};
export default AddImageTagComponent;
