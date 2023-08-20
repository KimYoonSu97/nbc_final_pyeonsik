import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from 'src/lib/supabaseClient';

interface Post {
  id: string;
  title: string;
  body: string;
}

const PostDetail = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const getPost = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', `${id}`);
      if (error) {
        console.log(error);
      }
      if (data) {
        setPost(data[0]);
      }
      console.log(data);
    };
    getPost();
  }, []);

  const clickDelete = () => {
    const deletePost = async () => {
      const { error } = await supabase.from('posts').delete().eq('id', `${id}`);
      if (error) {
        console.log(error);
      }
    };
    deletePost();
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div>{post?.title}</div>
      <div>{post?.body}</div>
      <button onClick={clickDelete}>delete</button>
      <button onClick={clickEdit}>edit</button>
    </div>
  );
};

export default PostDetail;
