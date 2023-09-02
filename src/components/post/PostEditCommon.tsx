import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from 'src/api/posts';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import EditorQuill from './write/EditorQuill';
import OrgPostCard from './detail/OrgPostCard';
import { S } from 'src/components/post/write/StyledPostWrite';
import HeaderArea from './write/HeaderArea';

const PostEditCommon = () => {
  const navigate = useNavigate();
  const { id: prams } = useParams<string>();

  const userId: string | undefined = useLoginUserId();
  const postRef = useRef<HTMLInputElement>(null);

  const { updatePostMutate } = usePost(prams!);

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  // read
  const { isLoading, data } = useQuery({ queryKey: ['post', prams], queryFn: () => getPost(prams!) });
  const post = data?.data;
  const orgPost = post?.orgPostId;

  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.body);
  }, [post]);

  // edit
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (body.replace(/[<][^>]*[>]/gi, '').trim() === '') {
      alert('내용을 입력해 주세요.');
      return false;
    }

    const editPost = {
      orgPostId: post.orgPostId?.id,
      id: post.id,
      title,
      body
    };

    updatePostMutate.mutate(editPost);
    navigate(`/detail/${prams}`);
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const clickCancle = () => {
    navigate(-1);
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
      <S.WriteArea>
        <S.WriteForm onSubmit={submitPost}>
          <HeaderArea />
          <S.WritePostArea>
            <S.TitleBox>
              <S.CategoryText>그르르갉</S.CategoryText>
              <S.Contour />
              <S.Title
                ref={postRef}
                type="text"
                name="title"
                placeholder="제목 생략 가능"
                value={title}
                onChange={changeTitle}
                autoFocus
              />
            </S.TitleBox>
            <EditorQuill body={body} setBody={setBody} />
          </S.WritePostArea>
        </S.WriteForm>
      </S.WriteArea>
      {orgPost && <OrgPostCard orgPost={orgPost} />}
      <button onClick={clickCancle}>cancle</button>
    </>
  );
};

export default PostEditCommon;
