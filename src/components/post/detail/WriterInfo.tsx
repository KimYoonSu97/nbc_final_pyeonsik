import React from 'react';
import { Post } from 'src/types/types';

const WriterInfo = (post: Post) => {
  const postWriter = post?.userId;

  return (
    <div>
      <img src={postWriter.profileImg} alt='작성자 이미지'/>
      <div>작성자 등급</div>
      <div>{postWriter.nickname}</div>
      <div>{post.created_at}</div>
    </div>
  );
};

export default WriterInfo;
