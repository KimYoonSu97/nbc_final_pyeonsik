import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useLoginUserId from 'src/hooks/useLoginUserId';
import usePost from 'src/hooks/usePost';
import EditorQuill from './EditorQuill';
import { S } from 'src/components/post/style/StyledPostWrite';
import HeaderArea from './HeaderArea';
import TitleArea from './TitleArea';

export interface OrgPostIdProps {
  orgPostId: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const PostWriteCommon = ({ orgPostId, setCategory }: OrgPostIdProps) => {
  const navigate = useNavigate();
  const userId: string | undefined = useLoginUserId();

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

  return (
    <S.WriteArea>
      <S.WriteForm onSubmit={submitPost}>
        <HeaderArea />
        <S.WritePostArea>
          <TitleArea setCategory={setCategory} title={title} setTitle={setTitle} />
          <EditorQuill body={body} setBody={setBody} />
        </S.WritePostArea>
      </S.WriteForm>
    </S.WriteArea>
  );
};

export default PostWriteCommon;
