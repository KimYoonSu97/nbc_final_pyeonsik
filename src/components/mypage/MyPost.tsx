import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { myPagePostAtom } from 'src/globalState/jotai';
import MyPostCard from './MyPostCard';
import _ from 'lodash';
import { getMyBookMarkById } from '../../api/posts';
import { useQuery } from '@tanstack/react-query';

interface BookMark {
  userId: string;
}

const MyPost = () => {
  //유저정보 가져와야됨..
  const id = 'be029d54-dc65-4332-84dc-10213d299c53';
  const [post] = useAtom(myPagePostAtom);
  const [filterHandler, setFilterHandler] = useState(true);
  console.log('내가쓴 글과 북마크 글을 보기위한 컴포넌트를 위한 데이터', post);

  //요런 로직추가해서 미리 분기해놓고 분기한것만 map함수 사용
  const { isLoading, data } = useQuery({ queryKey: ['MyBookMarkPost'], queryFn: () => getMyBookMarkById(id!) });
  // const [, setMyPost] = useAtom(myPagePostAtom);
  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }
  console.log(data!.data);
  // console.log(data!.data);

  //포스트 내부의
  const myPost = post.filter((item) => {
    return item.userId === id;
  });

  return (
    <>
      <S.ButtonArea>
        <S.FilterButton
          onClick={() => {
            setFilterHandler(true);
          }}
        >
          저장 레시피
        </S.FilterButton>
        <S.FilterButton
          onClick={() => {
            setFilterHandler(false);
          }}
        >
          내가 쓴 글
        </S.FilterButton>
      </S.ButtonArea>
      <S.ContentsArea>
        카드 영역
        {filterHandler ? (
          <>
            {/* {BookMark.map((item) => {
              return <MyPostCard key={item.id} data={item} />;
            })} */}
          </>
        ) : (
          <>
            {myPost.map((item) => {
              return <MyPostCard key={item.id} data={item} />;
            })}
          </>
        )}
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
  FilterButton: styled.button`
    padding: 5px 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
  `
};
