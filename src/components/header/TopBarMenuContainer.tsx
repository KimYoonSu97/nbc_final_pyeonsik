import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { loginModalAtom, userAtom } from 'src/globalState/jotai';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';
import baseImage from '../../images/baseprofile.jpeg';
import { Link, useLocation } from 'react-router-dom';
import { getUserData, userLogOut } from 'src/api/userLogin';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { IconBell } from '../icons';

interface User {
  email: string;
  id?: string;
  nickname: string;
  profileImg: string;
}

const TopBarMenuContainer = () => {
  const queryClient = useQueryClient();

  const location = useLocation();
  const path = location.pathname.split('/')[1];

  const [userLogin, setUserLogin] = useAtom(userAtom);

  const userId = useLoginUserId();
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();

  // 욕을 합니다 ***
  const queryKey = userLogin?.id;
  const { data, isLoading, isError } = useQuery(
    ['loginUser'],
    () => {
      if (userId) {
        return getUserData(userId as string);
      } else {
        return getUserData(queryKey as string);
      }
    },
    {
      enabled: userLogin !== null || userId ? true : false,
      staleTime: Infinity
    }
  );

  const loginMutation = useMutation(userLogOut, {
    onSuccess: () => {
      queryClient.removeQueries(['loginUser']);
    }
  });

  // 로그아웃 핸들러
  const signOutHandler = async () => {
    loginMutation.mutate();

    localStorage.removeItem('social');
    setUserLogin(null);
    alert('로그아웃 완료!');
    // handleRefresh();
  };

  //공유하기 기능

  return (
    <S.TopBarMenuContainer>
      <S.QuickButtonArea>
        <S.QuickPostButton>나만의 편식조합 공유하기</S.QuickPostButton>
        <S.QuickPostButton>신제품 리뷰하기</S.QuickPostButton>
        <S.QuickPostButton onClick={() => navigate('/event')}>행사 제품</S.QuickPostButton>
      </S.QuickButtonArea>
      <S.TopBarLogContainer $logged={data ? true : false}>
        {/* 공통 */}
        {/* 로그인 전 */}
        {!data ? (
          <>
            <S.TopBarLogButton
              onClick={() => navigate('/login', { state: { backgroundLocation: location } })}
              $signIn={false}
            >
              로그인
            </S.TopBarLogButton>
            <S.TopBarLogButton onClick={() => navigate('/register')} $signIn={true}>
              회원가입
            </S.TopBarLogButton>
          </>
        ) : (
          <>
            <S.Icon>
              <IconBell />
            </S.Icon>
            <S.Level>Lv. 식신</S.Level>
            {/* <p>Hello, {userData?.nickname}</p> */}
            <S.ProfileImg src={data?.data?.profileImg} alt="프로필 사진"></S.ProfileImg>
            <S.TopBarLogButton onClick={signOutHandler}>로그아웃</S.TopBarLogButton>
          </>
        )}
      </S.TopBarLogContainer>
    </S.TopBarMenuContainer>
  );
};

export default TopBarMenuContainer;

interface Props {
  $signIn?: boolean;
}

const S = {
  TopBarMenuContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    position: absolute;
    right: 16px;
  `,

  TopBarListContainer: styled.ul`
    display: flex;
  `,

  QuickButtonArea: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  QuickPostButton: styled.div`
    display: flex;
    align-items: center;
    border-radius: 100px;
    border: 1px solid var(--neutral-200, #e4e7ec);
    padding: 3px 18px;
    height: 34px;
    color: var(--font-black, var(--black, #242424));
    font-size: 14px;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
  `,

  TopBarMenu: styled.li`
    padding: 5px 13px;
    height: 30px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  TopBarLogContainer: styled.ul<{ $logged: boolean }>`
    display: flex;
    gap: ${(props) => (props.$logged ? '0px' : '12px')};
    align-items: center;
  `,

  TopBarLogButton: styled.li<Props>`
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 5px 15px;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    color: ${(props) => {
      if (props.$signIn) {
        return ' var(--white, #FFF)';
      } else {
        return 'var(--font-black, var(--black, #242424))';
      }
    }};

    background: ${(props) => {
      if (props.$signIn) {
        return 'var(--main, #F02826);';
      } else {
        return 'var(--neutral-200, #e4e7ec)';
      }
    }};
  `,

  Icon: styled.div`
    width: 20px;
    height: 20px;
    background-color: black;
  `,

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
    margin-left: 8px;
  `,

  ProfileImg: styled.img`
    width: 36px;
    height: 36px;
    margin-left: 4px;
    background: #d9d9d9;
    border-radius: 100px;
  `
};
