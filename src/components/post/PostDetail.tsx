import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { PostLike } from 'src/types/types';
import { getPost } from 'src/api/posts';
import { getPostLike } from 'src/api/postLikes';
import useMutate from 'src/hooks/useMutate';
import usePostLikes from 'src/hooks/usePostLikes';
import { Tag } from 'src/types/types';

const PostDetail = () => {
  // user id 윤수님
  const userId = 'be029d54-dc65-4332-84dc-10213d299c53';

  const { id } = useParams<string>();
  const navigate = useNavigate();

  // 게시글 삭제, 좋아요, 좋아요 취소
  const { deleteMutate } = useMutate('posts');
  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes('post_likes');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  // read data
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(id!) });
  const { data: postLikeData } = useQuery({ queryKey: ['post_likes'], queryFn: () => getPostLike(id!) });
  const post = data?.data?.[0];
  const postLike = postLikeData?.data?.find((like) => like.userId === userId);

  // delete post
  const clickDelete = (id: string) => {
    deleteMutate.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

  // 좋아요 기능
  const clickPostLike = (postLike: PostLike) => {
    if (!postLike) {
      const newPostLike = {
        postId: post.id,
        userId
      };
      addPostLikeMutate.mutate(newPostLike);
    } else {
      deletePostLikeMutate.mutate(postLike.id);
    }
  };

  // 태그 클릭 시 해당 선택한 태그의 데이터를 보기 위해 tag와 null로 조건부로 바꿔줌
  const handleTagClick = (tag: Tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }

  return (
    <div>
      <div>{post.title}</div>
      <div>
        {post.tagimage && (
          <div style={{ position: 'relative' }}>
            <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.tagimage}`} alt={`${post.tagimage}`} />
            {post.tags.map((tag: Tag, tagIndex: number) => (
              <div
                key={tagIndex}
                style={{
                  position: 'absolute',
                  left: tag.x + 'px',
                  top: tag.y + 'px',
                  backgroundColor: 'red',
                  width: '30px',
                  height: '30px'
                }}
                onClick={() => handleTagClick(tag)}
              >
                {/* 선택된 태그가 있다면 해당 태그를 열고 안에있는 데이터를 보여줌 */}
                {selectedTag === tag && (
                  <div
                    className="details"
                    style={{
                      backgroundColor: 'skyblue',
                      width: '300px',
                      height: '300px'
                    }}
                  >
                    {tag.prodData}
                    <br />
                    {tag.price}
                    <img src={tag.img} alt="상품 이미지" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>{post.body}</div>
      <button onClick={() => clickDelete(post.id)}>delete</button>
      <button onClick={clickEdit}>edit</button>
      <button onClick={() => clickPostLike(postLike)}>{postLike ? '좋아요 취소' : '좋아요'}</button>
      {/* <PostLikeButton id={id!} /> */}
    </div>
  );
};

export default PostDetail;
