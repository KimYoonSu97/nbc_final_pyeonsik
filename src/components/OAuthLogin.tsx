import { atom, useAtom } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router';
import { userAtom } from 'src/globalState/jotai';
import supabase from 'src/lib/supabaseClient';

type Provider = 'google' | 'kakao' | 'github';

interface OAuthLoginProps {
  provider: Provider;
}

const OAuthLogin = ({ provider }: OAuthLoginProps) => {
  const navigate = useNavigate();

  const [, setUserLogin] = useAtom(userAtom);

  const handleLogin = async () => {
    try {
      const response = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: { redirectTo: '/' }
      });

      localStorage.setItem('social', provider);

      // const response = await supabase.auth.signInWithOAuth
      // console.log(response);
      // console.log(data);
      // const { data, error: sessionError } = await supabase.auth.getSession();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div onClick={handleLogin}>{provider === 'google' ? '구글 로그인' : '카카오 로그인'}</div>
    </>
  );
};

export default OAuthLogin;

// <button
//   style={
//     {
//       // backgroundImage: `url('${applyImageLogo(provider)}')`, // 함수 호출 추가
//       // backgroundSize: 'cover', // 이미지가 버튼을 가득 채우도록 설정
//       // width: '50px', // 버튼의 너비
//       // height: '50px', // 버튼의 높이
//       // border: 'none', // 테두리 제거
//       // color: 'white', // 텍스트 색상
//       // fontSize: '16px', // 폰트 크기
//       // cursor: 'pointer', // 커서 스타일 변경
//       // margin: '5px'
//     }
//   }

// </button>
// >

// const getUserDataForHeader = async (id: string) => {
//   const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
//   if (error) {
//   }
//   setUserData(data as User);
// };

// // 소셜로그인
// const socialLogin = async (social: string) => {
//   const user = await supabase.auth.getUser();
//   const { data, error } = await supabase.from('users').select('*').eq('id', user.data.user?.id).single();
//   if (data) {
//     setUserData(data as User);
//   } else {
//     const socialData = user.data.user?.identities?.filter((v) => v.provider === social);
//     if (socialData !== undefined && socialData[0].identity_data && user.data.user) {
//       const data = socialData[0].identity_data;

//       const newSocialUser: User = {
//         email: data.email,
//         nickname: data.name || data.user_name, // goggle, kakao: name  / github : user_name
//         profileImg: data.avatar_url
//       };
//       const { data: userData, error } = await supabase.from('users').insert(newSocialUser).select('*');
//       setUserData(newSocialUser as User);
//     }
//   }
// };

// const applyImageLogo = (provider: string) => {
//   switch (provider) {
//     case 'google':
//       return 'google.png';
//     case 'kakao':
//       return 'kakao.jpg';
//     case 'github':
//       return 'github.png';
//   }
// };
