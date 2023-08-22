import { atom, useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'src/lib/supabaseClient';
import { userAtom } from 'src/pages/Login';
import { styled } from 'styled-components';
import { sosialUserAtom } from '../OAuthLogin';
import { UserTypes } from 'src/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const jotaiUserDataAtom = atom<Omit<UserTypes, 'password'> | null>(null);

const TopBarMenuContainer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [socialUser, setSocialUser] = useAtom(sosialUserAtom);
  // const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [jotaiUserData, setJotaiUserData] = useAtom(jotaiUserDataAtom);

  const queryClient = useQueryClient();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);

  // 로그아웃
  const sigOutService = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 로그아웃 뮤테이션
  const logoutMutation = useMutation(() => sigOutService(), {
    onSuccess: () => {
      setJotaiUserData(null);
      // setUserEmail('');
      localStorage.removeItem('jotaiUserData');
      queryClient.invalidateQueries(['users']);
      // queryClient.invalidateQueries(['users', userEmail]);
    }
  });

  // 로그아웃 핸들러
  const signOutHandler = async () => {
    try {
      setSocialUser(null);
      setUser(null); // userData 초기화
      // setUserEmail('');
      navigate('/');
      // setLoginModal(true);
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  // 소셜 로그인 토큰 생성 => jotaiUserData
  useEffect(() => {
    if (!socialUser?.identities) {
      return;
    } else if (socialUser?.identities[0].provider !== 'email') {
      const tokenKey = localStorage.getItem('sb-bbakvkybkyfoiijevbec-auth-token');
      const parsedToken = tokenKey ? JSON.parse(tokenKey) : null;

      const userId = parsedToken?.user.id;
      const userName = parsedToken?.user.user_metadata.name;
      const userEmail = parsedToken?.user.email;

      const userInsertData = {
        uid: userId,
        nickname: userName,
        profileimg: 'neverdelete/461839d7-4ae5-4981-a29c-7793179d98ac.jpeg',
        email: userEmail,
        password: ''
      };
      const userDataString = JSON.stringify(userInsertData);
      localStorage.setItem('jotaiUserData', userDataString);
      setJotaiUserData(userInsertData);
    }
  }, [socialUser]);

  // 생성한 토큰 가져와서 새로고침 방지
  useEffect(() => {
    const storedUserData = localStorage.getItem('jotaiUserData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setJotaiUserData(parsedUserData);
    }
  }, []);

  // 현재 유저의 정보 가져오기!
  const checkUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.identities) {
      return;
    } else if (user?.identities[0].provider == 'github' || user?.identities[0].provider == 'google') {
      setSocialUser(user);
    }
    console.log(user);
  };
  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', function () {
      checkUser();
    });
  }, []);

  return (
    <S.TopBarMenuContainer>
      <S.TopBarListContainer>
        <S.TopBarMenu>편식 소개</S.TopBarMenu>
        <S.TopBarMenu>제품 요청</S.TopBarMenu>
        <S.TopBarMenu>행사 목록</S.TopBarMenu>
        {user ? <S.TopBarMenu>마이페이지</S.TopBarMenu> : null} {/* 조건부 렌더링 */}
      </S.TopBarListContainer>
      <S.TopBarLogContainer>
        {user ? (
          <>
            <S.Icon onClick={() => navigate('/')}></S.Icon>
            <S.TopBarLogButton onClick={signOutHandler}>로그아웃</S.TopBarLogButton>
            <SuccessMessage>{successMessage}</SuccessMessage>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <SuccessMessage>{user.email} 님 환영합니다</SuccessMessage>
          </>
        ) : (
          <>
            <S.TopBarLogButton onClick={() => navigate('/login')}>로그인</S.TopBarLogButton>
            <S.TopBarLogButton onClick={() => navigate('/register')}>회원가입</S.TopBarLogButton>
            <br />

            <SuccessMessage>{successMessage}</SuccessMessage>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </>
        )}
      </S.TopBarLogContainer>
    </S.TopBarMenuContainer>
  );
};

export default TopBarMenuContainer;
const S = {
  TopBarMenuContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    position: absolute;
    right: 16px;
  `,
  TopBarListContainer: styled.ul`
    display: flex;
  `,
  TopBarMenu: styled.li`
    padding: 5px 13px;
    height: 30px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    background-color: salmon;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TopBarLogContainer: styled.ul`
    display: flex;
    gap: 12px;
  `,
  TopBarLogButton: styled.li`
    background-color: aqua;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 5px 15px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  `,
  Icon: styled.div`
    width: 20px;
    height: 20px;
    background-color: black;
  `
};

const SuccessMessage = styled.div`
  margin-top: 10px;
  color: blue;
  font-size: 14px;
`;
const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;
