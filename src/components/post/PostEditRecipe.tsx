import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from 'src/lib/supabaseClient';

import { getPost } from 'src/api/posts';
import useMutate from 'src/hooks/usePost';
import { Tag } from 'src/types/types';
import ImageTag from '../ImageTag/ImageTag';
import useLoginUserId from 'src/hooks/useLoginUserId';
import PostWriteInput from './PostWriteInput';

const PostEditRecipe = () => {
  const [inputData, setInputData] = useState<string[]>([]);
  const [tagsData, setTagsData] = useState<Tag[][]>([]);

  const { id: prams } = useParams<string>();
  const navigate = useNavigate();
  const { tagUpdatePostMutate } = useMutate();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string[]>([]);
  const [allSelectedImages, setAllSelectedImages] = useState<File[]>([]);
  const [tagData, setTagData] = useState<Tag[][]>([]);

  console.log('여기입니다!', body);
  console.log('여기입니다!', allSelectedImages);
  console.log('여기입니다!', tagData);

  const postRef = useRef<HTMLInputElement>(null);

  // current user id
  const userId: string | undefined = useLoginUserId();

  // read
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(prams!) });
  const post = data?.data?.[0];

  // useEffect 순서 확인하기!
  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.body);
    setAllSelectedImages(post?.tagimage);
    setTagData(post?.tags);
    setTagsData(post?.tags);
    setInputData(post?.body);
  }, [post]);

  // edit
  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedImageUrls = [];

    // 파일 업로드 및 URL 가져오기
    for (const selectedImage of allSelectedImages) {
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
      body: inputData,
      tags: tagsData,
      tagimage: updatedImageUrls
    };

    tagUpdatePostMutate.mutate(editPost);

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

  //각 컴포넌트의 Tag 값을 배열로 저장하는 함수
  const handleTagsChange = (index: number, tags: Tag[]) => {
    const updatedTagsData = [...tagsData];
    updatedTagsData[index] = tags;
    setTagsData(updatedTagsData);
  };

  //각 컴포넌트의 body 값을 배열로 저장하는 함수
  const handleContentsChange = (index: number, newContents: string) => {
    setInputData((prevInputData) => {
      const updatedInputData = [...prevInputData];
      updatedInputData[index] = newContents;
      return updatedInputData;
    });
  };

  const handleImageSelect = (image: File, index: number) => {
    setAllSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = image;
      return updatedImages;
    });
  };

  return (
    <div>
      <form onSubmit={submitPost}>
        <PostWriteInput
          ref={postRef}
          type="text"
          name="title"
          title="title"
          value={title || ''}
          onChange={(e) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
          autoFocus
        />
        {/* <AddImageTagComponent onImageSelect={handleImageSelect} /> */}
        {tagData.map((_, index) => (
          <ImageTag
            key={index}
            onTagsAndResultsChange={(tags) => handleTagsChange(index, tags)}
            onImageSelect={(image) => handleImageSelect(image, index)}
            onContentsChange={(newContents) => handleContentsChange(index, newContents)}
            imageData={allSelectedImages[index]}
            tagData={tagData ? tagData[index] : null}
            body={body ? body[index] : null}
          />
        ))}
        <button type="submit">save</button>
      </form>
      <button onClick={clickCancle}>cancle</button>
    </div>
  );
};

export default PostEditRecipe;
