import React from 'react';
import { useState, useRef } from 'react';
import PostWriteInput from './PostWriteInput';
import supabase from 'src/lib/supabaseClient';

const PostWriteForm = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const postRef = useRef<HTMLInputElement>(null);

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost = {
      title,
      body: body
    };

    const addPost = async () => {
      const { data, error } = await supabase.from('posts').insert([newPost]).select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
    };
    addPost();

    setTitle('');
    setBody('');
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
