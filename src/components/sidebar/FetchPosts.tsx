import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';

import supabase from 'src/lib/supabaseClient';
import { Post, Likes } from 'src/types/types';

//Jotai를 이용해서 패치해온 데이터를 전역으로 관리
export const postsAtom = atom<Post[]>([]);
export const likesAtom = atom<Likes[]>([]);

const FetchPosts = () => {
  const [, setPosts] = useAtom(postsAtom);
  const [, setLikes] = useAtom(likesAtom);

  //컴포넌트 마운트 시 데이터를 패치해옴
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('postCategory', 'recipe');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [setPosts]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('post_likes').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setLikes(data);
      }
    };

    fetchPosts();
  }, [setLikes]);

  return <></>;
};

export default FetchPosts;
