import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from 'src/api/posts';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import EditorQuill from './write/EditorQuill';
import OrgPostCard from './detail/OrgPostCard';
import { S } from 'src/components/post/style/StyledPostWrite';
import { IconAdd } from '../icons';

const PostEditCommon = () => {
  const navigate = useNavigate();
  const { id: prams } = useParams<string>();

  const userId: string | undefined = useLoginUserId();
  const postRef = useRef<HTMLInputElement>(null);

  const { updatePostMutate } = usePost();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  // read
  const { isLoading, data } = useQuery({ queryKey: ['post'], queryFn: () => getPost(prams!) });
  const post = data?.data;
  const orgPost = post?.orgPostId;

  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.body);
  }, [post]);

  document.addEventListener(
    'keydown',
    function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    },
    true
  );

  // edit
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editPost = {
      orgPostId: post.orgPostId?.id,
      id: post.id,
      title,
      body
    };

    updatePostMutate.mutate(editPost);
    navigate(`/detail/${prams}`);
  };

  const clickLogo = () => {
    navigate(`/`);
  };
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
  if (userId && post.userId?.id && userId !== post.userId.id) {
    alert('접근할 수 없습니다.');
    return <Navigate to="/" />;
  }

  return (
    <>
      <S.WriteArea>
        <S.WriteForm onSubmit={submitPost}>
          <S.WriteHeader>
            <div onClick={clickLogo}>로고 영역</div>
            <S.AddButton type="submit">
              <S.AddText>공유하기</S.AddText>
              <S.AddIcon>
                <IconAdd />
              </S.AddIcon>
            </S.AddButton>
          </S.WriteHeader>
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
          <S.EditorArea>
            <EditorQuill body={body} setBody={setBody} />
          </S.EditorArea>
        </S.WriteForm>
      </S.WriteArea>
      {orgPost && <OrgPostCard orgPost={orgPost} />}
      <button onClick={clickCancle}>cancle</button>
    </>
  );
};

export default PostEditCommon;
