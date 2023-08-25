import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

import supabase from 'src/lib/supabaseClient';
import useMutate from 'src/hooks/useMutate';
import PostWriteInput from './PostWriteInput';
import { Tag } from 'src/types/types';
import AddImageTagComponent from '../ImageTag/AddImageTagComponent';

const PostWriteForm = () => {
  // user id 윤수님
  const userId = 'be029d54-dc65-4332-84dc-10213d299c53';

  const navigate = useNavigate();
  const { addMutate } = useMutate('posts');

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [tags, setTags] = useState<{ tags: Tag[] }>({
    tags: []
  });

  const postRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (image: File) => {
    setSelectedImage(image);
  };

  // console.log('selectedImage', selectedImage);
  // console.log('tags', tags);

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

    const newPost = {
      userId,
      title,
      body: body,
      tags: tags.tags,
      tagimage: imageUrl
    };
    addMutate.mutate(newPost);
    navigate(`/`);
  };

  return (
    <>
      <AddImageTagComponent onTagsAndResultsChange={(tags) => setTags({ tags })} onImageSelect={handleImageSelect} />

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
        <PostWriteInput
          type="text"
          name="body"
          title="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default PostWriteForm;
