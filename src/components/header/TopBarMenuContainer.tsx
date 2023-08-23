import { atom, useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'src/lib/supabaseClient';
import { userAtom } from 'src/pages/Login';
import { styled } from 'styled-components';

const TopBarMenuContainer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [nickName, setNickName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  // 로그아웃 핸들러
  const signOutHandler = async () => {
    let { error } = await supabase.auth.signOut();

    setUser(null); // userData 초기화
    setImageUrl('');
    navigate('/');
    alert('로그아웃 완료!');
    console.error(error);
  };
  // 유저 닉네임 적용
  useEffect(() => {
    const setUserName = async () => {
      if (user) {
        const { data, error } = await supabase.from('users').select('nickname').eq('email', user.email).single();

        if (data) {
          setNickName(data.nickname);
        }
      }
    };
    setUserName();
  }, [user]);

  // 유저의 프로필 이미지를 가져온다
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (user && user.email) {
        const { data, error } = await supabase.from('users').select('profileImg').eq('email', user.email).single();
        console.log(user);
        console.log('hi');
        console.log(data);
        if (data) {
          setImageUrl(data.profileImg);
        }
      }
    };

    fetchImageUrl();
  }, []);

  // 현재 유저의 정보 가져오기!
  const checkUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setUser(user);

    // 소셜로그인 시 프로필 적용
    if (user !== null && user.identities?.[0]?.identity_data) {
      const socialData = user.identities[0].identity_data;
      setImageUrl(socialData.avatar_url);
      setNickName(socialData.name);
      setUser(user);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const boolean = false;
  return (
    <S.TopBarMenuContainer>
      <S.QuickButtonArea>
        <S.QuickPostButton>나만의 편식조합 공유하기</S.QuickPostButton>
        <S.QuickPostButton>신제품 리뷰하기</S.QuickPostButton>
        <S.QuickPostButton>행사 제품</S.QuickPostButton>
      </S.QuickButtonArea>
      {/* {boolean && <S.TopBarMenu>마이페이지</S.TopBarMenu>} */}
      <S.TopBarLogContainer $logged={boolean}>
        {/* 로그인 전 후 분기 */}
        {user ? (
          <>
            <S.Icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect width="100%" height="100%" fill="white" />
                <path
                  d="M12.5 14.1667V15C12.5 15.663 12.2366 16.2989 11.7678 16.7678C11.299 17.2366 10.6631 17.5 10 17.5C9.337 17.5 8.70111 17.2366 8.23227 16.7678C7.76343 16.2989 7.50004 15.663 7.50004 15V14.1667M12.5 14.1667H7.50004M12.5 14.1667H15.4917C15.8109 14.1667 15.9709 14.1667 16.1 14.1233C16.2215 14.0822 16.3319 14.0136 16.4225 13.9228C16.5131 13.832 16.5816 13.7216 16.6225 13.6C16.6667 13.47 16.6667 13.31 16.6667 12.9883C16.6667 12.8475 16.6667 12.7775 16.655 12.71C16.6345 12.5838 16.5852 12.464 16.5109 12.36C16.4709 12.3042 16.4209 12.2542 16.3217 12.155L15.9967 11.83C15.9449 11.7781 15.9038 11.7165 15.8757 11.6487C15.8477 11.581 15.8333 11.5083 15.8334 11.435V8.33333C15.8334 7.56729 15.6825 6.80875 15.3893 6.10101C15.0962 5.39328 14.6665 4.75022 14.1248 4.20854C13.5832 3.66687 12.9401 3.23719 12.2324 2.94404C11.5246 2.65088 10.7661 2.5 10 2.5C9.234 2.5 8.47545 2.65088 7.76772 2.94404C7.05999 3.23719 6.41693 3.66687 5.87525 4.20854C5.33358 4.75022 4.9039 5.39328 4.61074 6.10101C4.31759 6.80875 4.16671 7.56729 4.16671 8.33333V11.435C4.16676 11.5083 4.15236 11.581 4.12434 11.6487C4.09631 11.7165 4.05521 11.7781 4.00337 11.83L3.67837 12.155C3.57837 12.255 3.52921 12.3042 3.49004 12.3592C3.41506 12.4633 3.36516 12.5834 3.34421 12.71C3.33337 12.7767 3.33337 12.8475 3.33337 12.9883C3.33337 13.31 3.33337 13.47 3.37671 13.6C3.41782 13.7217 3.48652 13.8323 3.57745 13.9231C3.66838 14.0139 3.77907 14.0824 3.90087 14.1233C4.03004 14.1667 4.18921 14.1667 4.50837 14.1667H7.50004"
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </S.Icon>
            <S.Level>Lv. 식신</S.Level>
            <p>Hello, {nickName}</p>
            <S.ProfileImg src={imageUrl} alt="프로필 사진"></S.ProfileImg>
            <S.TopBarLogButton onClick={signOutHandler}>로그아웃</S.TopBarLogButton>
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

//  // 소셜 로그인 토큰 생성 => jotaiUserData
//  useEffect(() => {
//   if (!socialUser?.identities) {
//     return;
//   } else if (socialUser?.identities[0].provider !== 'email') {
//     const tokenKey = localStorage.getItem('sb-bbakvkybkyfoiijevbec-auth-token');

//     const parsedToken = tokenKey ? JSON.parse(tokenKey) : null;

//     const userId = parsedToken?.user.id;
//     const userName = parsedToken?.user.user_metadata.name;
//     const userEmail = parsedToken?.user.email;

//     const userInsertData = {
//       uid: userId,
//       nickname: userName,
//       profileimg: 'neverdelete/461839d7-4ae5-4981-a29c-7793179d98ac.jpeg',
//       email: userEmail,
//       password: ''
//     };
//     const userDataString = JSON.stringify(userInsertData);
//     localStorage.setItem('jotaiUserData', userDataString);
//     setJotaiUserData(userInsertData);
//   }
// }, [socialUser]);

// // 생성한 토큰 가져와서 새로고침 방지
// useEffect(() => {
//   const storedUserData = localStorage.getItem('jotaiUserData');
//   if (storedUserData) {
//     const parsedUserData = JSON.parse(storedUserData);
//     setJotaiUserData(parsedUserData);
//   }
// }, []);

// // 현재 유저의 정보 가져오기!
// const checkUser = async () => {
//   const {
//     data: { user }
//   } = await supabase.auth.getUser();

//   if (!user?.identities) {
//     return;
//   } else if (
//     user?.identities[0].provider == 'github' ||
//     user?.identities[0].provider == 'google' ||
//     user?.identities[0].provider == 'kakao'
//   ) {
//     setSocialUser(user);
//   }
//   console.log(user);
// };
// useEffect(() => {
//   checkUser();
//   window.addEventListener('hashchange', function () {
//     checkUser();
//   });
// }, []);
