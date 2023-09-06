import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import HeaderArea from './HeaderArea';
import TitleArea from './TitleArea';
import EditorQuill from './EditorQuill';
import OrgPostCard from '../detail/OrgPostCard';
import { S } from 'src/components/post/write/StyledPostWrite';
import supabase from 'src/lib/supabaseClient';
import { useAtom } from 'jotai';
import AddImageTagComponent, { contentsAtom, tagsDataAtom, imagesAtom } from '../../ImageTag/AddImageTagComponent';
import { levelChecker } from './userLevelUp';
import useUserMutate from 'src/hooks/useUserMutate';
import { updateFirstRecipeBadge } from 'src/api/badge';

const PostWrite = () => {
  const navigate = useNavigate();
  const { state: orgPost } = useLocation();
  const userId: string | undefined = useLoginUserId();

  const [category, setCategory] = useState<string>('recipe');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [allContents, setContentsAtom] = useAtom(contentsAtom);
  const [allTags, setTagsDataAtom] = useAtom(tagsDataAtom);
  const [selectedImages, setImagesDataAtom] = useAtom(imagesAtom);

  const { addPostMutate, addRecipePostMutate } = usePost();
  const { levelMutation } = useUserMutate();

  const [isIn] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isIn) {
        e.preventDefault();
        e.returnValue = '작성 중인 내용이 사라집니다. 페이지를 떠나시겠습니까?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      setContentsAtom({});
      setTagsDataAtom({});
      setImagesDataAtom({});
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isIn]);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAllContentsEmpty = Object.keys(allContents).every((key) => allContents[key] === '');
    if (
      title.trim() === '' ||
      (category === 'common' && body.replace(/[<][^>]*[>]/gi, '').trim() === '') ||
      (category === 'recipe' && isAllContentsEmpty)
    ) {
      alert('제목과 내용을 입력해 주세요.');
      return false;
    }

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
        hasOrgPost: !!orgPost,
        orgPostId: orgPost?.id,
        title,
        body,
        userId
      };
      addPostMutate.mutate(newPost);
    } else if (category === 'recipe') {
      const newPost = {
        postCategory: category,
        hasOrgPost: !!orgPost,
        orgPostId: orgPost?.id,
        userId,
        title,
        body: allContents,
        recipeBody: Object.values(allContents),
        tags: Object.values(allTags),
        tagimage: imageUrls
      };
      addRecipePostMutate.mutate(newPost);
      updateFirstRecipeBadge(userId);

      // 이다음에 체크하고 네비게이트
      // 이 함수가 반환하는 것은 레벨업데이트가 필요한지 여부에대한 것과 어떤 레벨로 업데이트 할것인지에 대한 것임
      const result = await levelChecker(userId);
      //만약 업데이트 가 필요하지 않다면 그냥 바로 네비게이트로 홈으로 보내버림
      if (!result.isNeedUpdate) {
        navigate('/');
        return;
      }
      // 만약 True가 나와서 필요하다면 업데이트 및 로그인 유저에대한 데이터를 인벨리데이트 시켜버려서 새로 패치함
      const update = {
        userId,
        level: result.userLevel as string
      };
      levelMutation.mutate(update);
      navigate('/');
    }

    setContentsAtom({});
    setTagsDataAtom({});
    setImagesDataAtom({});
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
