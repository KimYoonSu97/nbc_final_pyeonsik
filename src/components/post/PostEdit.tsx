import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostWriteInput from './PostWriteInput';
import supabase from 'src/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';

const PostEditForm = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const postRef = useRef<HTMLInputElement>(null);

  // read
  // const { isLoading, data } = useQuery({ queryKey: ['Post'], queryFn: () => getPosts() });

  // if (isLoading) {
  //   return <p>Loading…</p>;
  // }
  // if (data?.error) {
  //   return <p>Error</p>;
  // }
  // if (data?.data.length === 0) {
  //   return <p>none</p>;
  // }

  // const posts = data?.data;
  // const post = posts?.find((post) => post.id === id);

  // setTitle(post.title);
  // setTitle(post.body);

  useEffect(() => {
    const getPost = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', `${id}`);
      if (error) {
        console.log(error);
      }
      if (data) {
        setTitle(data[0].title);
        setBody(data[0].body);
      }
      console.log(data);
    };
    getPost();
  }, []);

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editPost = {
      title,
      body: body
    };

    // supabase
    const addPost = async () => {
      const { data, error } = await supabase.from('posts').update(editPost).eq('id', `${id}`).select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
    };
    addPost();

    navigate(`/detail/${id}`);
  };

  const clickCancle = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div>
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
        <button type="submit">save</button>
      </form>
      <button onClick={clickCancle}>cancle</button>
    </div>
  );
};

export default PostEditForm;
