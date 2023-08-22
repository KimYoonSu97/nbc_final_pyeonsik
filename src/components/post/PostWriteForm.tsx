import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import usePost from 'src/hooks/usePost';
import PostWriteInput from './PostWriteInput';

const PostWriteForm = () => {
  const navigate = useNavigate();
  const { addPostMutation } = usePost();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const postRef = useRef<HTMLInputElement>(null);

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      title,
      body
    };
    addPostMutation.mutate(newPost);
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
