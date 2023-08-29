import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { OrgPostIdProbs } from 'src/types/types';
import useLoginUserId from 'src/hooks/useLoginUserId';
import useMutate from 'src/hooks/usePost';
import EditorQuill from './EditorQuill';
import styled from 'styled-components';
import { ReactComponent as IconAdd } from 'src/components/post/svg/IconAdd.svg';
import { ReactComponent as IconSelect } from 'src/components/post/svg/IconSelect.svg';

const PostWriteCommon = ({ orgPostId, orgUserId }: OrgPostIdProbs) => {
  const navigate = useNavigate();
  const userId: string | undefined = useLoginUserId();
  const postRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { addPostMutate } = useMutate();

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      postCategory: 'common',
      orgPostId,
      orgUserId,
      title,
      body,
      userId
    };
    addPostMutate.mutate(newPost);
    navigate(`/`);
  };

  return (
    <S.WrtieArea>
      <form onSubmit={submitPost}>
        <S.WriteHeader>
          <div onClick={() => navigate(`/`)}>로고 영역</div>
          <S.AddButton type="submit">
            <S.AddText>공유하기</S.AddText>
            <S.AddIcon>
              <IconAdd />
            </S.AddIcon>
          </S.AddButton>
        </S.WriteHeader>
        <S.TitleBox>
          <S.CategoryText>그르르갉 </S.CategoryText>
          <S.Contour />
          <S.Title
            ref={postRef}
            type="text"
            name="title"
            placeholder="제목 생략 가능"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
          />
          <S.SelectCategory>
            <S.SelectIcon>
              <IconSelect />
            </S.SelectIcon>
            <S.SelectText>편식조합</S.SelectText>
          </S.SelectCategory>
        </S.TitleBox>
        <EditorQuill body={body} setBody={setBody} />
      </form>
    </S.WrtieArea>
  );
};

export default PostWriteCommon;

export const S = {
  WrtieArea: styled.div`
    background-color: #f6f7f9;

    width: 1280px;
    height: 1080px;
  `,

  WriteHeader: styled.header`
    background-color: #fff;

    padding: 11px 16px;
    gap: 1082px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  AddButton: styled.button`
    background: #d9d9d9;

    width: 110px;
    height: 34px;
    padding: 5px 15px;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  `,

  AddText: styled.div`
    color: #000;

    /* button-medium */
    font-style: normal;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px; /* 150% */
  `,

  AddIcon: styled.div`
    width: 20px;
    height: 20px;
  `,

  TitleBox: styled.div`
    background: #fff;

    width: 950px;
    margin-top: 28px;
    padding: 9px 20px;
    gap: 20px;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  CategoryText: styled.div`
    color: #000;

    /* title-small */
    font-style: normal;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `,

  Contour: styled.div`
    background: #f6f7f9;

    width: 2px;
    height: 18px;
    border-radius: 100px;
    flex-shrink: 0;
  `,

  Title: styled.input`
    color: #000;

    width: 723px;
    flex-shrink: 0;

    /* body-large */
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 150% */
  `,

  SelectCategory: styled.div`
    gap: 8px;

    display: flex;
    align-items: flex-start;
  `,

  SelectIcon: styled.div`
    width: 20px;
    height: 20px;
  `,

  SelectText: styled.div`
    color: var(--neutral-400, #98a2b3);

    /* title-small */
    font-style: normal;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `
};
