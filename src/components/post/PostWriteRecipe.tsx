import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Data, Tag } from 'src/types/types';

import supabase from 'src/lib/supabaseClient';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';
import ImageTag from './ImageTag';

interface orgPostIdProbs {
  orgPostId: string;
  orgUserId: string;
}

// recipe, common write component 정리 필요
const PostWriteRecipe = ({ orgPostId, orgUserId }: orgPostIdProbs) => {
  const navigate = useNavigate();
  const { addPostMutate } = usePost();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [tagsAndResults, setTagsAndResults] = useState<{ tags: Tag[]; searchResults: Data[] }>({
    tags: [],
    searchResults: []
  });
  const postRef = useRef<HTMLInputElement>(null);

  // current user id
  const userId: string | undefined = useLoginUserId();

  const handleImageSelect = (image: File) => {
    setSelectedImage(image);
  };

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = null;
    if (selectedImage) {
      const { data, error } = await supabase.storage.from('photos').upload(`tags/${selectedImage.name}`, selectedImage);
      if (error) {
        console.error('Error uploading image to Supabase storage:', error);
        alert('이미지 업로드 중 에러가 발생했습니다!');
        return;
      }
      imageUrl = data.path;
    }
    console.log('imageUrl', imageUrl);

    // orgin post

    const newPost = {
      orgPostId,
      orgUserId,
      postCategory: 'recipe',
      userId,
      title,
      body: body,
      tags: tagsAndResults.tags,
      tagimage: imageUrl
    };

    addPostMutate.mutate(newPost);
    navigate(`/`);
  };

  console.log('selectedImage', selectedImage);

  return (
    <>
      <form onSubmit={submitPost}>
        <button type="submit">add</button>
        <PostWriteInput
          ref={postRef}
          type="text"
          name="title"
          title="title"
          value={title}
          onChange={(e) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
          autoFocus
        />
        <ImageTag
          onTagsAndResultsChange={(tags, searchResults) => setTagsAndResults({ tags, searchResults })}
          onImageSelect={handleImageSelect}
        />
        <PostWriteInput
          type="text"
          name="body"
          title="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default PostWriteRecipe;
