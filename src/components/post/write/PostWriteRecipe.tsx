import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import supabase from 'src/lib/supabaseClient';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import AddImageTagComponent, { contentsAtom, tagsDataAtom } from '../../ImageTag/AddImageTagComponent';
import { ReactComponent as Add } from 'src/components/post/svg/Add.svg';
import { ReactComponent as Select } from 'src/components/post/svg/Select.svg';
import { S } from './StyledPostWriteCommon';

interface orgPostIdProbs {
  orgPostId: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const PostWriteRecipe = ({ orgPostId, setCategory }: orgPostIdProbs) => {
  const navigate = useNavigate();
  const userId: string | undefined = useLoginUserId();
  const postRef = useRef<HTMLInputElement>(null);

  //제출 후 값을 초기화 해주기 위해 선언
  const [, setContentsAtom] = useAtom(contentsAtom);
  const [, setTagsDataAtom] = useAtom(tagsDataAtom);

  const [title, setTitle] = useState<string>('');
  const [allSelectedImages, setAllSelectedImages] = useState<File[]>([]);

  const [allContents] = useAtom(contentsAtom);
  const [allTags] = useAtom(tagsDataAtom);

  //입력값이 배열로 바뀌었기에 query 선언을 하나 더 했습니다!
  const { addRecipePostMutate } = usePost();

  const handleImageSelect = (image: File) => {
    setAllSelectedImages((prevImages) => [...prevImages, image]);
  };

  const handleRemovedImage = (removedImage: File) => {
    const updatedImages = allSelectedImages.filter((image) => image !== removedImage);
    setAllSelectedImages(updatedImages);
  };

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrls = [];

    for (const selectedImage of allSelectedImages) {
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
      recipeBody: Object.values(allContents),
      tags: Object.values(allTags),
      tagimage: imageUrls
    };

    addRecipePostMutate.mutate(newPost);

    setContentsAtom({});
    setTagsDataAtom({});

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
    <form onSubmit={submitPost}>
      <S.WriteHeader>
        <div onClick={clickLogo}>로고 영역</div>
        <S.AddButton type="submit">
          <S.AddText>공유하기</S.AddText>
          <S.AddIcon>
            <Add />
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
          onChange={changeTitle}
          autoFocus
        />
        <S.SelectCategory>
          <S.SelectIcon>
            <Select />
          </S.SelectIcon>
          <S.SelectText type="button" onClick={clickCategory}>
            그르르갉
          </S.SelectText>
        </S.SelectCategory>
      </S.TitleBox>
      <AddImageTagComponent onImageSelect={handleImageSelect} onRemovedImage={handleRemovedImage} />
    </form>
  );
};

export default PostWriteRecipe;
