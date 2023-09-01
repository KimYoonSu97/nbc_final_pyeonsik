import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from 'src/lib/supabaseClient';

import { getPost } from 'src/api/posts';
import useMutate from 'src/hooks/usePost';
import { Tag } from 'src/types/types';
import ImageTag from '../ImageTag/ImageTag';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { IconAdd } from 'src/components/icons';
import { S } from './style/StyledPostWrite';
import AddImageTagComponent from '../ImageTag/AddImageTagComponent';
import { useAtom } from 'jotai';
import { contentsAtom, tagsDataAtom, imagesAtom } from '../ImageTag/AddImageTagComponent';

const PostEditRecipe = () => {
  const [allContents, setContentsAtom] = useAtom(contentsAtom);
  const [allTags, setTagsDataAtom] = useAtom(tagsDataAtom);
  const [selectedImages, setImagesDataAtom] = useAtom(imagesAtom);

  const [inputData, setInputData] = useState<string[]>([]);
  const [tagsData, setTagsData] = useState<Tag[][]>([]);

  const { id: prams } = useParams<string>();
  const navigate = useNavigate();
  const { tagUpdatePostMutate } = useMutate();

  const [title, setTitle] = useState<string>('');

  const [body, setBody] = useState<string[]>([]);
  const [allSelectedImages, setAllSelectedImages] = useState<File[]>([]);
  const [tagData, setTagData] = useState<Tag[][]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);

  console.log('allSelectedImages', allSelectedImages);
  console.log('tagData', tagData);
  console.log('body', body);

  const postRef = useRef<HTMLInputElement>(null);

  // current user id
  const userId: string | undefined = useLoginUserId();

  // read
  const { isLoading, data } = useQuery({ queryKey: ['post'], queryFn: () => getPost(prams!) });
  const post = data?.data;

  // useEffect 순서 확인하기!
  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.recipeBody);
    setAllSelectedImages(post?.tagimage);
    setTagData(post?.tags);
    setTagsData(post?.tags);
    setInputData(post?.recipeBody);
  }, [post]);

  // edit
  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedImageUrls = [];

    // 파일 업로드 및 URL 가져오기
    for (const selectedImage of Object.values(selectedImages)) {
      if (selectedImage instanceof File) {
        const { data, error } = await supabase.storage
          .from('photos')
          .upload(`tags/${selectedImage.name}`, selectedImage);

        if (error) {
          console.error('Error uploading image to Supabase storage:', error);
          alert('이미지 업로드 중 에러가 발생했습니다!');
          return;
        }

        updatedImageUrls.push(data.path);
      } else {
        updatedImageUrls.push(selectedImage);
      }
    }

    const editPost = {
      id: post.id,
      title,
      recipeBody: Object.values(allContents),
      tags: Object.values(allTags),
      tagimage: updatedImageUrls
    };

    tagUpdatePostMutate.mutate(editPost);

    setContentsAtom({});
    setTagsDataAtom({});
    setImagesDataAtom({});

    navigate(`/detail/${prams}`);
  };

  const clickCancle = () => {
    navigate(`/detail/${prams}`);
  };

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (userId && post?.userId.id !== userId) {
    alert('접근할 수 없습니다.');
    return <Navigate to="/" />;
  }

  const clickLogo = () => {
    navigate(`/`);
  };

  return (
    <S.WriteArea>
      <S.WriteForm onSubmit={submitPost}>
        <S.WriteHeader>
          <div onClick={clickLogo}>로고 영역</div>
          <S.AddButton type="submit">
            <S.AddText>공유하기</S.AddText>
            <S.AddIcon>
              <IconAdd />
            </S.AddIcon>
          </S.AddButton>
        </S.WriteHeader>
        <S.TitleBox>
          <S.CategoryText>편식조합</S.CategoryText>
          <S.Contour />
          <S.Title
            ref={postRef}
            type="text"
            name="title"
            placeholder="제목 생략 가능"
            value={title}
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
            autoFocus
          />
        </S.TitleBox>
      </S.WriteForm>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '950px' }}>
          <AddImageTagComponent imageData={allSelectedImages} tagData={tagData} body={body} isEditMode={true} />
        </div>
      </div>
    </S.WriteArea>
  );
};

export default PostEditRecipe;
