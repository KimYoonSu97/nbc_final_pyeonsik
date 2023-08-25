import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';

import { Tag } from 'src/types/types';
import AddImageTagComponent, { contentsAtom } from '../ImageTag/AddImageTagComponent';
import supabase from 'src/lib/supabaseClient';
import usePost from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';

const PostWriteRecipe = () => {
  const userId = 'be029d54-dc65-4332-84dc-10213d299c53';
  const navigate = useNavigate();
  const { addPostMutate2 } = usePost();

  const [title, setTitle] = useState<string>('');
  const [, setSelectedImage] = useState<File | null>(null);
  const [allSelectedImages, setAllSelectedImages] = useState<File[]>([]);
  const [allSelectedTags, setAllSelectedTags] = useState<Set<Tag>>(new Set());
  const [allSelectedContents, setAllSelectedContents] = useState<string[]>([]);
  const [allContents] = useAtom(contentsAtom);

  console.log('나 PostWrite', allContents);

  const handleTagSelect = (selectedTags: Tag[]) => {
    setAllSelectedTags((prevSelectedTags) => {
      const newTags = new Set([...prevSelectedTags, ...selectedTags]);
      return newTags;
    });
  };

  const handleImageSelect = (image: File) => {
    setSelectedImage(image);
    setAllSelectedImages((prevImages) => [...prevImages, image]);
  };

  const handleContentsChange = (index: number, newContents: string) => {
    setAllSelectedContents((prevContents) => {
      const updatedContents = [...prevContents];
      updatedContents[index] = newContents;
      return updatedContents;
    });
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
      tags: Array.from(allSelectedTags),
      tagimage: imageUrls
    };

    addPostMutate2.mutate(newPost);
    navigate(`/`);
  };

  return (
    <>
      <AddImageTagComponent
        onTagsAndResultsChange={handleTagSelect}
        onImageSelect={handleImageSelect}
        onContentsChange={(newContents) => handleContentsChange(allSelectedContents.length, newContents)}
      />

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
