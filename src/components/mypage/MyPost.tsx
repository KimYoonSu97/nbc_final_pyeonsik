import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { getMyBookMarkById, getMyLikePostById, getMyPostsById } from '../../api/posts';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { Post } from 'src/types/types';
import { css, styled } from 'styled-components';
import PostCards from '../renderPosts/PostCards';

const MyPost = () => {
  const id = useLoginUserId();
  const { search } = useLocation();
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
        enabled: filterHandler === '?=bookmark' && id ? true : false
      },
      {
        queryKey: ['MyLikePost'],
        queryFn: () => getMyLikePostById(id!),
        enabled: filterHandler === '?=like' && id ? true : false
      },
      {
        queryKey: ['MyPost'],
        queryFn: () => getMyPostsById(id!),
        enabled: filterHandler === '?=mypost' && id ? true : false
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
          $type={'?=bookmark'}
          $location={search}
          onClick={() => {
            setFilterHandler('?=bookmark');
          }}
        >
          북마크
        </S.FilterButton>
        <S.FilterButton
          to="?=like"
          $type={'?=like'}
          $location={search}
          onClick={() => {
            setFilterHandler('?=like');
          }}
        >
          좋아요
        </S.FilterButton>
        <S.FilterButton
          to="?=mypost"
          $type={'?=mypost'}
          $location={search}
          onClick={() => {
            setFilterHandler('');
          }}
        >
          내가 쓴 글
        </S.FilterButton>
      </S.ButtonArea>
      <S.ContentsArea>
        {(() => {
          switch (filterHandler) {
            case '?=bookmark':
              return <PostCards posts={bookmarkData as unknown as Post[]} />;
            case '?=like':
              return <PostCards posts={likeData as unknown as Post[]} />;
            case '?=mypost':
              return <PostCards posts={myPost?.data as unknown as Post[]} />;
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
  FilterButton: styled(Link)<{ $type: string; $location: string }>`
    padding: 5px 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-size: 12px;

    line-height: 16px; /* 133.333% */
    text-decoration: none;
    color: black;
    border-radius: 100px;

    ${(props) => {
      if (props.$type === props.$location) {
        return css`
          color: #000;
          font-weight: 700;
          background-color: white;
        `;
      }
    }}
  `
};
