import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageTag, PostBookmark, PostLike } from 'src/types/types';
// custom hoooks
import useLoginUserId from 'src/hooks/useLoginUserId';
import useMutate from 'src/hooks/usePost';
import usePostLikes from 'src/hooks/usePostLikes';
import usePostBookmark from 'src/hooks/usePostBookmark';
// api
import { getPost } from 'src/api/posts';
import { getPostLike } from 'src/api/postLikes';
import { Tag } from 'src/types/types';

const PostDetail = () => {
  // user id
  const userId: string | undefined = useLoginUserId();

  const { id } = useParams<string>();
  const navigate = useNavigate();

  // 게시글 삭제, 좋아요, 좋아요 취소
  const { deletePostMutate } = useMutate();
  const { addPostLikeMutate, deletePostLikeMutate } = usePostLikes();
  const { addPostBookmarkMutate, deletePostBookmarkMutate } = usePostBookmark();
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  // read data
  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPost(id!) });
  const { data: postLikeData } = useQuery({ queryKey: ['post_likes'], queryFn: () => getPostLike(id!) });
  const { data: postBookmarkData } = useQuery({ queryKey: ['post_bookmark'], queryFn: () => getPostLike(id!) });
  const post = data?.data?.[0];
  const postLike = postLikeData?.data?.find((like) => like.userId === userId);
  const postBookmark = postBookmarkData?.data?.find((bookmark) => bookmark.userId === userId);

  // delete post
  const clickDelete = (id: string) => {
    deletePostMutate.mutate(id);
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
        userId: userId as unknown as string
      };
      addPostLikeMutate.mutate(newPostLike);
    } else {
      deletePostLikeMutate.mutate(postLike.id);
    }
  };

  const clickPostBookmark = (postBookmark: PostBookmark) => {
    if (!postBookmark) {
      const newPostBookmark = {
        postId: post.id,
        userId
      };
      addPostBookmarkMutate.mutate(newPostBookmark);
    } else {
      deletePostBookmarkMutate.mutate(postBookmark.id);
    }
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
  const handleTagClick = (tag: Tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  console.log('post', post);
  console.log('post', post.imageUrl);

  return (
    <div>
      <div>{post.title}</div>
      {/* component 분리 예정 */}
      {post.postCategory === 'common' ? (
        <pre dangerouslySetInnerHTML={{ __html: post.body }} />
      ) : (
        <div>{post.body}</div>
      )}
      {/* 우선확인을 위해 추가해두었습니다 나중에 컴포넌트로 분리해놓을게요! */}
      <div>
        {post.tagimage && (
          <div style={{ position: 'relative' }}>
            {post.tagimage.map((imageUrl: string, imageIndex: number) => {
              const tagsForImage = post.tags.filter((tag: ImageTag) => tag.selectedimg);

              return (
                <div key={imageIndex} style={{ position: 'relative' }}>
                  <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${imageUrl}`} alt={imageUrl} />
                  {tagsForImage.map((tag: ImageTag, tagIndex: number) => (
                    <div
                      key={tagIndex}
                      style={{
                        position: 'absolute',
                        left: tag.x + 'px',
                        top: tag.y + 'px',
                        backgroundColor: 'red',
                        width: '30px',
                        height: '30px',
                        display: `tags/${tag.selectedimg}` === imageUrl ? 'block' : 'none'
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
                            padding: '10px',
                            position: 'absolute',
                            zIndex: 1
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
              );
            })}
          </div>
        )}
      </div>
      <button onClick={() => clickDelete(post.id)}>delete</button>
      <button onClick={clickEdit}>edit</button>
      <button onClick={() => clickPostLike(postLike)}>{postLike ? '좋아요 취소' : '좋아요'}</button>
      <button onClick={() => clickPostBookmark(postBookmark)}>{postBookmark ? '북마크 취소' : '북마크'}</button>
      <button>인용하기</button>
    </div>
  );
};

export default PostDetail;
