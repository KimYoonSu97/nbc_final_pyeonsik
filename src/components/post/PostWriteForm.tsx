import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import useMutate from 'src/hooks/useMutate';
import PostWriteInput from './PostWriteInput';

const PostWriteForm = () => {
  // user id 윤수님
  const userId = 'be029d54-dc65-4332-84dc-10213d299c53';

  const navigate = useNavigate();
  const { addMutate } = useMutate('posts');

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const postRef = useRef<HTMLInputElement>(null);

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      userId,
      title,
      body
    };
    addMutate.mutate(newPost);
    navigate(`/`);
  };

  return (
    <form onSubmit={submitPost}>
      <PostWriteInput
        ref={postRef}
        type="text"
        name="title"
        title="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        autoFocus
      />
      <PostWriteInput
        type="text"
        name="body"
        title="body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <button type="submit">add</button>
    </form>
  );
};

export default PostWriteForm;
