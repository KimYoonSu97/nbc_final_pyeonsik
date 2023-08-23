import React, { useState } from 'react';
import { styled } from 'styled-components';
import PostCards from '../renderPosts/PostCards';
import { getMyBookMarkById, getMyLikePostById, getMyPostsById } from '../../api/posts';
import { useQueries } from '@tanstack/react-query';
import { Post } from 'src/types/types';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const MyPost = () => {
  const { search } = useLocation();
  const id = 'be029d54-dc65-4332-84dc-10213d299c53';
  const [filterHandler, setFilterHandler] = useState(search);

  const [
    { isLoading: bookmarkLoading, data: bookmark },
    { isLoading: likeLoading, data: like },
    { isLoading: myPostLoading, data: myPost }
  ] = useQueries({
    queries: [
      {
        queryKey: ['MyBookMarkPost'],
        queryFn: () => getMyBookMarkById(id!),
        enabled: filterHandler === '?=bookmark'
      },
      {
        queryKey: ['MyLikePost'],
        queryFn: () => getMyLikePostById(id!),
        enabled: filterHandler === '?=like'
      },
      {
        queryKey: ['MyPost'],
        queryFn: () => getMyPostsById(id!),
        enabled: filterHandler === '?=mypost'
      }
    ]
  });

  if (filterHandler === '?=bookmark') {
    if (bookmarkLoading) {
      return <div>Loading</div>;
    }
  } else if (filterHandler === '?=like') {
    if (likeLoading) {
      return <div>Loading</div>;
    }
  } else {
    if (myPostLoading) {
      return <div>Loading</div>;
    }
  }

  let bookmarkData;
  let likeData;
  if (filterHandler === '?=bookmark') {
    bookmarkData = bookmark!.data!.map((item) => {
      return item.postId;
    });
  } else if (filterHandler === '?=like') {
    likeData = like!.data!.map((item) => {
      return item.postId;
    });
  }

  return (
    <>
      <S.ButtonArea>
        <S.FilterButton
          to="?=bookmark"
          onClick={() => {
            setFilterHandler('?=bookmark');
          }}
        >
          북마크
        </S.FilterButton>
        <S.FilterButton
          to="?=like"
          onClick={() => {
            setFilterHandler('?=like');
          }}
        >
          좋아요
        </S.FilterButton>
        <S.FilterButton
          to="?=mypost"
          onClick={() => {
            setFilterHandler('?=mypost');
          }}
        >
          내가 쓴 글
        </S.FilterButton>
      </S.ButtonArea>
      <S.ContentsArea>
        {(() => {
          switch (filterHandler) {
            case '?=bookmark':
              return <PostCards data={bookmarkData as unknown as Post[]} />;
            case '?=like':
              return <PostCards data={likeData as unknown as Post[]} />;
            case '?=mypost':
              return <PostCards data={myPost?.data as unknown as Post[]} />;
            default:
              return <></>;
          }
        })()}
      </S.ContentsArea>
    </>
  );
};

export default MyPost;

const S = {
  ButtonArea: styled.div`
    display: flex;
    gap: 5px;
    justify-content: flex-end;
    position: fixed;
    top: 137px;
    right: calc((100vw - 1280px) / 2 + 16px + 296px + 62px);
    z-index: 999;
  `,
  ContentsArea: styled.div``,
  FilterButton: styled(Link)`
    padding: 5px 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    text-decoration: none;
    color: black;
  `
};
