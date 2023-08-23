import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { myPagePostAtom } from 'src/globalState/jotai';
import MyPostCards from './MyPostCards';
import _ from 'lodash';
import { getMyBookMarkById, getMyLikePostById } from '../../api/posts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/supabse';
import { Post } from 'src/types/types';

interface BookMark {
  userId: string;
}

const MyPost = () => {
  //유저정보 가져와야됨..
  const id = 'be029d54-dc65-4332-84dc-10213d299c53';
  const [post] = useAtom(myPagePostAtom);
  const [filterHandler, setFilterHandler] = useState(3);

  //내가 북마크 한 글만
  // const { isLoading: bookmarkLoading, data: myBookmarkPosts } = useQuery({
  //   queryKey: ['MyBookMarkPost'],
  //   queryFn: () => getMyBookMarkById(id!)
  // });
  // const { isLoading: likeLoading, data: myLikePosts } = useQuery({
  //   queryKey: ['MyLikePost'],
  //   queryFn: () => getMyLikePostById(id!)
  // });
  // if (bookmarkLoading || likeLoading) {
  //   return <p>Loading…</p>;
  // }
  // if (myBookmarkPosts?.error || myLikePosts?.error) {
  //   return <p>Error</p>;
  // }
  // console.log('북마크', myBookmarkPosts);
  // console.log('좋아요', myLikePosts);
  // console.log('북마크', myBookmarkPosts?.data);
  // console.log('좋아요', myLikePosts?.data);
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
          onClick={(e) => {
            setFilterHandler(3);
          }}
        >
          내가 쓴 글
        </S.FilterButton>
      </S.ButtonArea>
      <S.ContentsArea>
        {/* {(() => {
          switch (filterHandler) {
            case 1:
              return <MyPostCards data={myBookmarkPosts!.data as unknown as Post[]} />;
            case 2:
              return <MyPostCards data={myLikePosts!.data as unknown as Post[]} />;
            default:
              return <MyPostCards data={post} />;
          }
        })()} */}
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

// {
// (()=>{

// })()
// filterHandler ? (
//   <>
//     {/* {BookMark.map((item) => {
//       return <MyPostCard key={item.id} data={item} />;
//     })} */}
//   </>
// ) : (
//   <>
//     {post.map((item) => {
//       return <MyPostCard key={item.id} data={item} />;
//     })}
//   </>
// }
// )
