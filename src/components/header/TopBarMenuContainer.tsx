import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';
import baseImage from '../../images/baseprofile.jpeg';
import { Link } from 'react-router-dom';

interface User {
  email: string;
  id: string;
  nickname: string;
  profileImg: string;
}

const TopBarMenuContainer = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();
  const [_, setUserLogin] = useAtom(userAtom);
  const social = localStorage.getItem('social');

  useEffect(() => {
    const token = localStorage.getItem('sb-wwkfivwrtwucsiwsnisz-auth-token');
    if (token && !social) {
      const { user } = JSON.parse(token);
      getUserDataForHeader(user.id);
    }
    // 소셜 로그인
    else if (token && social) {
      socialLogin();
    } else {
      setUserData(null);
    }
  }, []);
  // 새로고침
  const handleRefresh = () => {
    window.location.href = window.location.pathname;
  };

  // window.addEventListener('hashchange' =>브라우저의 URL 해시(예: # 뒤의 일부)가 변경될 때 발생!
  // 의존성 배열을 빈 배열([])을 전달했기 때문에, 컴포넌트가 처음 렌더링될 때 한 번만 실행되며, 이후에는 의존성 변경 없이는 다시 실행되지 않음
  useEffect(() => {
    window.addEventListener('hashchange', function () {
      handleRefresh();
    });
  }, []);

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
    localStorage.setItem('social', '');
    setUserLogin('logout');
    alert('로그아웃 완료!');
    handleRefresh();
  };

  // 소셜로그인
  const socialLogin = async () => {
    const user = await supabase.auth.getUser();

    // 저장된 정보에 따른 소셜로그인 데이터 가져오기
    // social === "google" | "github" | "kakao"
    const socialData = user.data.user?.identities?.filter((v) => v.provider === social);

    if (socialData !== undefined && socialData[0].identity_data && user.data.user) {
      const data = socialData[0].identity_data;

      const myUser: User = {
        email: data.email,
        id: user.data.user.id,
        nickname: data.user_name,
        profileImg: data.avatar_url
      };
      setUserData(myUser as User);
    }
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
        {/* 공통 */}
        <S.TopBarLogButton onClick={() => navigate('/register')}>회원가입</S.TopBarLogButton>
        {/* 로그인 전 */}
        {!userData ? (
          <>
            <S.TopBarLogButton onClick={() => navigate('/login')}>로그인</S.TopBarLogButton>

            <br />
          </>
        ) : (
          <>
            {/* 로그인 후 */}
            {userData ? (
              <>
                <p>Hello, {userData.nickname}</p>
                <S.ProfileImg src={userData.profileImg || baseImage}></S.ProfileImg>
                <Link to={'/password_change'}>PW변경</Link>
                <S.TopBarLogButton onClick={signOutHandler}>로그아웃</S.TopBarLogButton>
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
