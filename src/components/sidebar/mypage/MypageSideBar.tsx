import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import MypageSideBarInfo from './MypageSideBarInfo';
import MypageSideBarButtonTab from './MypageSideBarButtonTab';
import { useQuery } from '@tanstack/react-query';
import { getMyPostsById } from 'src/components/api/posts';
import { useAtom } from 'jotai';
import { myPagePostAtom } from 'src/globalState/jotai';

const MypageSideBar = () => {
  //여기서 데이터 패치 해와서 조타이 전역으로 관리하고
  const id = 'be029d54-dc65-4332-84dc-10213d299c53';
  const { isLoading, data } = useQuery({ queryKey: ['MyPost'], queryFn: () => getMyPostsById(id!) });
  const [, setMyPost] = useAtom(myPagePostAtom);

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }

  setMyPost(data!.data);

  return (
    <S.Container>
      <S.ContentsBox>
        <MypageSideBarInfo />
      </S.ContentsBox>
      <S.ContentsBox>
        <MypageSideBarButtonTab />
      </S.ContentsBox>
    </S.Container>
  );
};

export default MypageSideBar;

const S = {
  Container: styled.div`
    position: fixed;
    right: calc(((100vw - 1280px) / 2) + 16px);
  `,
  ContentsBox: styled.div`
    background: white;
    border-radius: 10px;
    margin-bottom: 20px;
  `,

  ProfileArea: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 16px 32px 16px;
  `,
  ProfileImg: styled.div`
    width: 60px;
    height: 60px;
    border-radius: 75px;
    background: #d9d9d9;
  `,
  DetailArea: styled.div``,
  Level: styled.div`
    border-radius: 100px;
    /* width: 58px; */
    height: 20px;
    padding: 0px 9px 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    background: #d9d9d9;
  `,
  NickName: styled.div`
    margin-top: 4px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  `
};
