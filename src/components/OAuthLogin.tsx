import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { IconGoogle, IconKakao, IconLogoSymbolH32, IconWaterMarkH32 } from 'src/components/icons';
import supabase from 'src/lib/supabaseClient';

type Provider = 'google' | 'kakao' | 'github';

const OAuthLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (provider: Provider) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider
      });
      localStorage.setItem('social', provider);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.SocialButtonArea>
      <S.SocialButton
        onClick={() => {
          handleLogin('google');
        }}
      >
        <IconGoogle />
        구글 로그인
      </S.SocialButton>
      <S.SocialButton
        onClick={() => {
          handleLogin('kakao');
        }}
      >
        <IconKakao />
        카카오 로그인
      </S.SocialButton>
    </S.SocialButtonArea>
  );
};

export default OAuthLogin;

const S = {
  SocialButtonArea: styled.div`
    display: flex;
    align-items: center;

    gap: 6px;
  `,
  SocialButton: styled.button`
    display: flex;
    background: transparent;
    justify-content: center;
    align-items: center;
    height: 42px;
    border-radius: 87px;
    border: 1px solid #efefef;
    padding-right: 35px;
    cursor: pointer;
  `
};
