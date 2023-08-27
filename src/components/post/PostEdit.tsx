import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPosts } from 'src/api/posts';
import useMutate from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';
import { Tag } from 'src/types/types';
import ImageTag from '../ImageTag/ImageTag';
import supabase from 'src/lib/supabaseClient';
// import AddImageTagComponent from '../ImageTag/AddImageTagComponent';

const PostEdit = () => {
  // const [imageTagComponents, setImageTagComponents] = useState<JSX.Element[]>([]);
  const [inputData, setInputData] = useState<string[]>([]);
  const [tagsData, setTagsData] = useState<Tag[][]>([]);

  const { id: prams } = useParams<string>();
  const navigate = useNavigate();
  const { tagUpdatePostMutate } = useMutate();

  const [title, setTitle] = useState<string>('');
  // const [body, setBody] = useState<string>('');
  const [body, setBody] = useState<string[]>([]);
  // const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [allSelectedImages, setAllSelectedImages] = useState<File[]>([]);
  const [tagData, setTagData] = useState<Tag[][]>([]);

  const postRef = useRef<HTMLInputElement>(null);

  console.log('allSelectedImages', allSelectedImages);
  console.log('tagData', tagData);

  // read
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPosts() });
  const post = data?.data?.find((post) => post.id === prams);

  // useEffect 순서 확인하기!
  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.body);
    setAllSelectedImages(post?.tagimage);
    setTagData(post?.tags);
    setTagsData(post?.tags);
    setInputData(post?.body);
    console.log('몇 번 실행되냐?');
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

  console.log('0');
  if (isLoading) {
    console.log('1');
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }
  console.log('2');

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
      {/* <AddImageTagComponent onImageSelect={handleImageSelect} /> */}

      {body.map((bodyValue, index) => (
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

        <button type="submit">save</button>
      </form>
      <button onClick={clickCancle}>cancle</button>
    </div>
  );
};

export default PostEdit;
