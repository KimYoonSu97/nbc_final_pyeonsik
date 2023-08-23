import React, { useState } from 'react';
import { styled } from 'styled-components';
import MyPostCards from './MyPostCards';
import { getMyBookMarkById, getMyLikePostById, getMyPostsById } from '../../api/posts';
import { useQueries } from '@tanstack/react-query';
import { Post } from 'src/types/types';

const MyPost = () => {
  //유저정보 가져와야됨..
  const id = 'be029d54-dc65-4332-84dc-10213d299c53';
  const [filterHandler, setFilterHandler] = useState(3);

  const [
    { isLoading: bookmarkLoading, data: bookmark },
    { isLoading: likeLoading, data: like },
    { isLoading: myPostLoading, data: myPost }
  ] = useQueries({
    queries: [
      {
        queryKey: ['MyBookMarkPost'],
        queryFn: () => getMyBookMarkById(id!),
        enabled: filterHandler === 1
      },
      {
        queryKey: ['MyLikePost'],
        queryFn: () => getMyLikePostById(id!),
        enabled: filterHandler === 2
      },
      {
        queryKey: ['MyPost'],
        queryFn: () => getMyPostsById(id!),
        enabled: filterHandler === 3
      }
    ]
  });

  if (filterHandler === 1) {
    if (bookmarkLoading) {
      return <div>Loading</div>;
    }
  } else if (filterHandler === 2) {
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
  if (filterHandler === 1) {
    bookmarkData = bookmark!.data!.map((item) => {
      return item.postId;
    });
  } else if (filterHandler === 2) {
    likeData = like!.data!.map((item) => {
      return item.postId;
    });
  }

  return (
    <>
      <S.ButtonArea>
        <S.FilterButton
          onClick={() => {
            setFilterHandler(1);
          }}
        >
          북마크
        </S.FilterButton>
        <S.FilterButton
          onClick={() => {
            setFilterHandler(2);
          }}
        >
          좋아요
        </S.FilterButton>
        <S.FilterButton
          onClick={() => {
            setFilterHandler(3);
          }}
        >
          내가 쓴 글
        </S.FilterButton>
      </S.ButtonArea>
      <S.ContentsArea>
        {(() => {
          switch (filterHandler) {
            case 1:
              return <MyPostCards data={bookmarkData as unknown as Post[]} />;
            case 2:
              return <MyPostCards data={likeData as unknown as Post[]} />;
            case 3:
              return <MyPostCards data={myPost?.data as unknown as Post[]} />;
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
  FilterButton: styled.div`
    padding: 5px 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
  `
};
