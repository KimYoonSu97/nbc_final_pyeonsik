import React, { useEffect, useState } from 'react';
import supabase from './lib/supabaseClient';

const Test = () => {
  // const [post, setPost] = useState();
  // const [bodys, setBodys] = useState();
  // const [products, setproducts] = useState();

  // useEffect(() => {
  //   const getPosts = async () => {
  //     let { data: posts, error } = await supabase.from('recipe_posts').select().eq('id', '1');
  //     setPost(posts[0]);
  //   };
  //   const getBodys = async () => {
  //     let { data: bodys, error } = await supabase.from('recipe_bodys').select('*').eq('forignBody', post.forignBody);
  //     console.log('bodys', bodys);
  //   };
  //   const getProducts = async () => {
  //     let { data: products, error } = await supabase.from('recipe_products').select('*');
  //     console.log('products', products);
  //   };

  //   getPosts();
  //   getBodys();
  //   getProducts();
  // }, []);

  return <div>Test</div>;
};

export default Test;
