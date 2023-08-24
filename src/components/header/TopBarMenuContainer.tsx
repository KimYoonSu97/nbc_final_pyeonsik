import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';

interface User {
  email: string;
  id: string;
  nickname: string;
  profileImg: string;
}

const TopBarMenuContainer = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useAtom(userAtom);

  useEffect(() => {
    const token = localStorage.getItem('sb-wwkfivwrtwucsiwsnisz-auth-token');
    if (token) {
      const { user } = JSON.parse(token);
      getUserDataForHeader(user.id);
    } else {
      setUserData(null);
    }
  }, [userLogin]);

  const getUserDataForHeader = async (id: string) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    if (error) {
    }
    setUserData(data as User);
  };

  // 로그아웃 핸들러
  const signOutHandler = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
      return;
    }
    setUserLogin('logout');
    alert('로그아웃 완료!');
    navigate('/');
  };

  return (
    <S.TopBarMenuContainer>
      <S.QuickButtonArea>
        <S.QuickPostButton>나만의 편식조합 공유하기</S.QuickPostButton>
        <S.QuickPostButton>신제품 리뷰하기</S.QuickPostButton>
        <S.QuickPostButton>행사 제품</S.QuickPostButton>
      </S.QuickButtonArea>
      {userData && <S.TopBarMenu>마이페이지</S.TopBarMenu>}
      <S.TopBarLogContainer $logged={userData ? true : false}>
        {/* 로그인 전 후 분기 */}
        {!userData ? (
          <>
            <S.TopBarLogButton onClick={() => navigate('/login')}>로그인</S.TopBarLogButton>
            <S.TopBarLogButton onClick={() => navigate('/register')}>회원가입</S.TopBarLogButton>
            <br />
          </>
        ) : (
          <>
            {userData ? (
              <>
                <S.TopBarLogButton onClick={() => navigate('/login')}>로그인</S.TopBarLogButton>
                <S.TopBarLogButton onClick={() => navigate('/register')}>회원가입</S.TopBarLogButton>
                <br />
              </>
            ) : (
              <>{/* Empty fragment when user is logged in */}</>
            )}
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
    background-color: #f5f5f5;
    padding: 3px 18px;
    height: 34px;
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

  TopBarLogButton: styled.li`
    border: 1px solid #d9d9d9;
    background: #fff;
    border-radius: 4px;

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
