import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import supabase from 'src/lib/supabaseClient';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import AddImageTagComponent, { contentsAtom, tagsDataAtom, imagesAtom } from '../../ImageTag/AddImageTagComponent';
import { OrgPostIdProps } from './PostWriteCommon';
import { S } from 'src/components/post/style/StyledPostWriteCommon';
import { IconAdd, IconLogoSymbolH22, IconSelect, IconWaterMarkH22 } from 'src/components/icons';

// recipe, common write component 정리 필요
const PostWriteRecipe = ({ orgPostId, setCategory }: OrgPostIdProps) => {
  const navigate = useNavigate();

  const userId: string | undefined = useLoginUserId();
  const postRef = useRef<HTMLInputElement>(null);

  //입력값이 배열로 바뀌었기에 query 선언을 하나 더 했습니다!
  const { addRecipePostMutate } = usePost();

  //제출 후 값을 초기화 해주기 위해 선언
  const [allContents, setContentsAtom] = useAtom(contentsAtom);
  const [allTags, setTagsDataAtom] = useAtom(tagsDataAtom);
  const [selectedImages, setImagesDataAtom] = useAtom(imagesAtom);

  const [title, setTitle] = useState<string>('');

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrls = [];

    for (const selectedImage of Object.values(selectedImages)) {
      const { data, error } = await supabase.storage.from('photos').upload(`tags/${selectedImage.name}`, selectedImage);

      if (error) {
        console.error('Error uploading image to Supabase storage:', error);
        alert('이미지 업로드 중 에러가 발생했습니다!');
        return;
      }

      imageUrls.push(data.path);
    }

    const newPost = {
      orgPostId,
      postCategory: 'recipe',
      userId,
      title,
      body: allContents,
      recipeBody: Object.values(allContents),
      tags: Object.values(allTags),
      tagimage: imageUrls
    };

    addRecipePostMutate.mutate(newPost);

    setContentsAtom({});
    setTagsDataAtom({});
    setImagesDataAtom({});

    navigate(`/`);
  };

  const clickLogo = () => {
    navigate(`/`);
  };
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const clickCategory = () => {
    setCategory('common');
  };

  return (
    <S.WriteArea>
      <S.WriteForm onSubmit={submitPost}>
        <S.WriteHeader>
          <S.WriteHeaderBox>
            <S.LogoContainer onClick={() => navigate('/')}>
              <IconLogoSymbolH22 />
              <IconWaterMarkH22 />
            </S.LogoContainer>
            <S.AddButton type="submit">
              공유하기
              <S.AddIcon>
                <IconAdd />
              </S.AddIcon>
            </S.AddButton>
          </S.WriteHeaderBox>
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
            onChange={changeTitle}
            autoFocus
          />
          <S.SelectCategory>
            <S.SelectIcon>
              <IconSelect />
            </S.SelectIcon>
            <S.SelectText type="button" onClick={clickCategory}>
              그르륵갉
            </S.SelectText>
          </S.SelectCategory>
        </S.TitleBox>
      </S.WriteForm>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '950px' }}>
          <AddImageTagComponent />
        </div>
      </div>
    </S.WriteArea>
  );
};

export default PostWriteRecipe;
