import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from 'src/api/posts';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import EditorQuill from './write/EditorQuill';
import OrgPostCard from './detail/OrgPostCard';
import { S } from 'src/components/post/write/StyledPostWrite';
import HeaderArea from './write/HeaderArea';
import TitleArea from './write/TitleArea';

const PostEditCommon = () => {
  const navigate = useNavigate();
  const { id: prams } = useParams<string>();
  const userId: string | undefined = useLoginUserId();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const { updatePostMutate } = usePost(prams!);

  const { isLoading, data } = useQuery({ queryKey: ['post', prams], queryFn: () => getPost(prams!) });
  const post = data?.data;
  const category = post?.postCategory as string;
  const orgPost = post?.orgPostId;

  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.body);
  }, [post]);

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '' || body.replace(/[<][^>]*[>]/gi, '').trim() === '') {
      alert('제목과 내용을 입력해 주세요.');
      return false;
    }

    // type 문제 해결 필요
    if (category === 'common') {
      const editPost = {
        orgPostId: post.orgPostId?.id,
        id: post.id,
        title,
        body
      };
      updatePostMutate.mutate(editPost);
    } else if (category === 'recipe') {
    }

    navigate(`/detail/${prams}`);
  };

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (userId && post.userId?.id && userId !== post.userId.id) {
    alert('접근할 수 없습니다.');
    return <Navigate to="/" />;
  }

  return (
    <>
      <S.WriteForm onSubmit={submitPost}>
        <HeaderArea />
        <S.WritePostArea>
          <TitleArea category={category} title={title} setTitle={setTitle} />
          {category === 'common' && <EditorQuill body={body} setBody={setBody} />}
        </S.WritePostArea>
      </S.WriteForm>
      {category === 'common' && post.hasOrgPost && <OrgPostCard orgPost={orgPost} />}
    </>
  );
};

export default PostEditCommon;
