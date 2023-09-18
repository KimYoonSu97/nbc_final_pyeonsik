import React, { ChangeEvent, useState } from 'react';
import { Location, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import styled from 'styled-components';
import supabase from 'src/lib/supabaseClient';
import OAuthLogin from '../components/OAuthLogin';
import { IconLogoSymbolH32, IconWarning, IconWaterMarkH32 } from 'src/components/icons';
import { toast } from 'react-toastify';
import { FlexBox, FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import Register from './Register';

interface User {
  id: string;
  created_at?: string;
  email: string;
  nickname: string;
  profileImg: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginModalCloser = () => {
    navigate(-1);
  };

  const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(com|net)$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [_, setUserLogin] = useAtom(userAtom);

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (data.user) {
      const { data: userLogin, error: userLoginError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      toast('로그인 완료!');
      setUserLogin(userLogin);
      navigate(-1);
    }
    if (error) {
      setErrorMessage('Error logging in: ' + error.message);
    }
  };

  return (
    <>
      <S.FixedBox>
        <S.LoginFormContainer>
          <S.LogoArea>
            <IconLogoSymbolH32 />
            <IconWaterMarkH32 />
          </S.LogoArea>
          <S.About>편의점 음식을 조합 및 공유하는 커뮤니티, 편의점 식신!</S.About>
          <S.InputArea onSubmit={handleLogin}>
            <S.InputBox
              maxLength={30}
              value={email}
              onChange={emailHandler}
              type="text"
              id="email"
              placeholder="이메일을 입력하세요"
            />
            <S.InputBox
              maxLength={15}
              value={password}
              onChange={passwordHandler}
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
            />
            {errorMessage.length !== 0 && (
              <S.ErrorMessage>
                <IconWarning />
                아이디 또는 비밀번호를 확인해 주세요.
              </S.ErrorMessage>
            )}
            {emailPattern.test(email) && password.length >= 6 ? (
              <S.LoginButton $active={true}>로그인</S.LoginButton>
            ) : (
              <S.LoginButton $active={false}>로그인</S.LoginButton>
            )}
            <S.LinkToArea>
              <S.LinkTo to={'/password_reset'}>비밀번호 재설정</S.LinkTo>
              <div>|</div>
              <S.LinkTo to={'/register'}>회원가입</S.LinkTo>
            </S.LinkToArea>
          </S.InputArea>
          <S.SocialArea>
            간편한 소셜 로그인
            <OAuthLogin />
          </S.SocialArea>
        </S.LoginFormContainer>
      </S.FixedBox>
      <S.Background onClick={loginModalCloser} />
    </>
  );
};

export default Login;

interface LoginButtonStateProps {
  $active?: boolean;
}

const S = {
  FixedBox: styled.div`
    position: fixed;
    top: calc((100vh - 516px) / 2);
    right: calc((100vw - 490px) / 2);
    z-index: 99999;
  `,
  Background: styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    right: 0;
    backdrop-filter: blur(10px);
  `,
  LoginFormContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 490px;
    height: 532px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
  `,
  LogoArea: styled.div`
    width: 120px;
    height: 32px;
  `,
  About: styled.div`
    margin: 14px 0 34px;

    color: #6a6a6a;
    text-align: center;

    ${styleFont.bodyMedium}
  `,
  InputArea: styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    width: 294px;
  `,
  InputBox: styled.input`
    width: 294px;
    padding: 11px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: var(--black, #242424);

    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    border: none;
    outline: none;
    border: 1px solid #ced4da;
    box-sizing: border-box;
    &::placeholder {
      color: var(--neutral-400, var(--neutral-400, #98a2b3));
    }
    &:focus {
      border: 1px solid var(--neutral-500, #667085);
    }
    ${styleFont.bodyMedium}
  `,
  LoginButton: styled.button<LoginButtonStateProps>`
    margin-top: 44px;

    width: 294px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    background: ${(props) => {
      if (props.$active) {
        return 'var(--main, #F02826)';
      } else {
        return 'var(--neutral-300, #d0d5dd)';
      }
    }};

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
  `,
  LinkToArea: styled.div`
    display: flex;
    gap: 8px;
    color: #666;

    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  `,
  LinkTo: styled(Link)`
    color: #666;
    text-decoration: none;
  `,
  SocialArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    color: #666;
    margin-top: 50px;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  SocialButtonArea: styled.div`
    display: flex;
    align-items: center;

    gap: 6px;
  `,
  SocialButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    border-radius: 87px;
    border: 1px solid #efefef;
    padding-right: 35px;
  `,
  ErrorMessage: styled(FlexBoxCenter)`
    position: absolute;
    top: 250px;
    left: 98px;

    gap: 4px;

    color: #ff7474;
    ${styleFont.bodySmall}
  `
};
