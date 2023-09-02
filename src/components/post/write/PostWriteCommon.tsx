import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import EditorQuill from './EditorQuill';
import { S } from 'src/components/post/style/StyledPostWrite';
import { IconAdd, IconLogoSymbolH22, IconSelect, IconWaterMarkH22 } from 'src/components/icons';

export interface OrgPostIdProps {
  orgPostId: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const PostWriteCommon = ({ orgPostId, setCategory }: OrgPostIdProps) => {
  const navigate = useNavigate();
  const userId: string | undefined = useLoginUserId();
  const postRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { addPostMutate } = usePost();

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (body.replace(/[<][^>]*[>]/gi, '').trim() === '') {
      alert('내용을 입력해 주세요.');
      return false;
    }

    const newPost = {
      postCategory: 'common',
      orgPostId,
      title,
      body,
      userId
    };

    addPostMutate.mutate(newPost);
    navigate(`/`);
  };

  const clickLogo = () => {
    navigate(`/`);
  };
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const clickCategory = () => {
    setCategory('recipe');
  };

  return (
    <S.WriteArea>
      <S.WriteForm onSubmit={submitPost}>
        <S.WriteHeader>
          <S.WriteHeaderBox>
            <S.LogoContainer onClick={clickLogo}>
              <IconLogoSymbolH22 />
              <IconWaterMarkH22 />
            </S.LogoContainer>
            <S.AddButton type="submit">
              공유하기
              <S.AddIcon>
                <IconAdd />
              </S.AddIcon>
            </S.AddButton>
          </S.WriteHeaderBox>
        </S.WriteHeader>
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
            <S.SelectCategory>
              <S.SelectIcon>
                <IconSelect />
              </S.SelectIcon>
              <S.SelectText type="button" onClick={clickCategory}>
                편식조합
              </S.SelectText>
            </S.SelectCategory>
          </S.TitleBox>
          <EditorQuill body={body} setBody={setBody} />
        </S.WritePostArea>
      </S.WriteForm>
    </S.WriteArea>
  );
};

export default PostWriteCommon;
