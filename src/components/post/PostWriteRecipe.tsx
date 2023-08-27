import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';

import AddImageTagComponent, { contentsAtom, tagsDataAtom } from '../ImageTag/AddImageTagComponent';
import supabase from 'src/lib/supabaseClient';
import usePost from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';

const PostWriteRecipe = () => {
  const userId = 'be029d54-dc65-4332-84dc-10213d299c53';
  const navigate = useNavigate();
  //입력값이 배열로 바뀌었기에 query 선언을 하나 더 했습니다!
  const { addRecipePostMutate } = usePost();

  //제출 후 값을 초기화 해주기 위해 선언
  const [, setContentsAtom] = useAtom(contentsAtom);
  const [, setTagsDataAtom] = useAtom(tagsDataAtom);

  const [title, setTitle] = useState<string>('');
  const [allSelectedImages, setAllSelectedImages] = useState<File[]>([]);

  const [allContents] = useAtom(contentsAtom);
  const [allTags] = useAtom(tagsDataAtom);

  const handleImageSelect = (image: File) => {
    setAllSelectedImages((prevImages) => [...prevImages, image]);
  };

  const handleRemovedImage = (removedImage: File) => {
    const updatedImages = allSelectedImages.filter((image) => image !== removedImage);
    setAllSelectedImages(updatedImages);
  };

  const postRef = useRef<HTMLInputElement>(null);

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
      postCategory: 'recipe',
      userId,
      title,
      body: allContents,
      tags: allTags,
      tagimage: imageUrls
    };

    addRecipePostMutate.mutate(newPost);

    setContentsAtom([]); // contentsAtom 아톰 상태 초기화
    setTagsDataAtom([]); // tagsDataAtom 아톰 상태 초기화

    navigate(`/`);
  };

  return (
    <>
      <AddImageTagComponent onImageSelect={handleImageSelect} onRemovedImage={handleRemovedImage} />

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
    </>
  );
};

export default PostWriteRecipe;
