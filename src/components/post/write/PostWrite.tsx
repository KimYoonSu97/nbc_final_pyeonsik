import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import HeaderArea from './HeaderArea';
import TitleArea from './TitleArea';
import EditorQuill from './EditorQuill';
import OrgPostCard from '../detail/OrgPostCard';
import { S } from 'src/components/post/write/StyledPostWrite';
// recipe
import supabase from 'src/lib/supabaseClient';
import { useAtom } from 'jotai';
import AddImageTagComponent, { contentsAtom, tagsDataAtom, imagesAtom } from '../../ImageTag/AddImageTagComponent';

const PostWrite = () => {
  const navigate = useNavigate();
  const { state: orgPost } = useLocation();
  const userId: string | undefined = useLoginUserId();

  // common
  const [category, setCategory] = useState<string>('common');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  // recipe, 제출 후 값을 초기화 해주기 위해 선언
  const [allContents, setContentsAtom] = useAtom(contentsAtom);
  const [allTags, setTagsDataAtom] = useAtom(tagsDataAtom);
  const [selectedImages, setImagesDataAtom] = useAtom(imagesAtom);

  // common
  const { addPostMutate } = usePost();
  // recipe, 입력 값이 배열로 바뀌었기에 query 선언을 하나 더
  const { addRecipePostMutate } = usePost();

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // common
    if (title.trim() === '' || (category === 'common' && body.replace(/[<][^>]*[>]/gi, '').trim() === '')) {
      alert('제목과 내용을 입력해 주세요.');
      return false;
    }

    // recipe
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

    // type 문제 해결 필요
    if (category === 'common') {
      const newPost = {
        postCategory: category,
        orgPostId: orgPost?.id,
        title,
        body,
        userId
      };
      addPostMutate.mutate(newPost);
    } else if (category === 'recipe') {
      const newPost = {
        postCategory: category,
        orgPostId: orgPost?.id,
        userId,
        title,
        body: allContents,
        recipeBody: Object.values(allContents),
        tags: Object.values(allTags),
        tagimage: imageUrls
      };
      addRecipePostMutate.mutate(newPost);
    }

    setContentsAtom({});
    setTagsDataAtom({});
    setImagesDataAtom({});

    navigate(`/`);
  };

  return (
    <>
      <S.WriteForm onSubmit={submitPost}>
        <HeaderArea />
        <S.WritePostArea>
          <TitleArea category={category} setCategory={setCategory} title={title} setTitle={setTitle} />
          {category === 'recipe' && orgPost && <OrgPostCard orgPost={orgPost} />}
          {category === 'common' && <EditorQuill body={body} setBody={setBody} />}
        </S.WritePostArea>
      </S.WriteForm>
      {category === 'recipe' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '950px' }}>
            <AddImageTagComponent />
          </div>
        </div>
      )}
      {category === 'common' && orgPost && <OrgPostCard orgPost={orgPost} />}
    </>
  );
};

export default PostWrite;
