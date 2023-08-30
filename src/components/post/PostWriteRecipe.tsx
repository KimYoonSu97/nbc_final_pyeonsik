import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';

import AddImageTagComponent, { contentsAtom, tagsDataAtom, imagesAtom } from '../ImageTag/AddImageTagComponent';
import supabase from 'src/lib/supabaseClient';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';
import { OrgPostIdProbs } from 'src/types/types';

// recipe, common write component 정리 필요
const PostWriteRecipe = ({ orgPostId }: OrgPostIdProbs) => {
  const navigate = useNavigate();

  //입력값이 배열로 바뀌었기에 query 선언을 하나 더 했습니다!
  const { addRecipePostMutate } = usePost();

  //제출 후 값을 초기화 해주기 위해 선언
  const [allContents, setContentsAtom] = useAtom(contentsAtom);
  const [allTags, setTagsDataAtom] = useAtom(tagsDataAtom);
  const [selectedImages, setImagesDataAtom] = useAtom(imagesAtom);

  const [title, setTitle] = useState<string>('');

  // const [allContents] = useAtom(contentsAtom);
  // const [allTags] = useAtom(tagsDataAtom);
  // const [allImages] = useAtom(imagesAtom);

  // current user id
  const userId: string | undefined = useLoginUserId();

  const postRef = useRef<HTMLInputElement>(null);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrls = [];

    for (const selectedImage of selectedImages) {
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
    setImagesDataAtom([]);

    navigate(`/`);
  };

  return (
    <>
      <form onSubmit={submitPost}>
        <PostWriteInput
          ref={postRef}
          type="text"
          name="title"
          title="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          autoFocus
        />
        <button type="submit">add</button>
      </form>

      <AddImageTagComponent onImageSelect={() => {}} />
    </>
  );
};

export default PostWriteRecipe;
