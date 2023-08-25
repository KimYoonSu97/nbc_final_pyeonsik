import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import styled from 'styled-components';
import supabase from 'src/lib/supabaseClient';
import OAuthLogin from '../components/OAuthLogin';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Atom 생성
  const [_, setUserLogin] = useAtom(userAtom);

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (data.user) {
      alert('로그인 완료!');
      setUserLogin('login');
      navigate('/');
    }

    if (error) {
      setErrorMessage('Error logging in: ' + error.message);
    } else {
      // console.log('Registration successful:', data);
    }
  };

  return (
    <>
      <LoginFormContainer>
        {/* 로고 영역 */}
        <img src=""></img>
        <About>뻔하지 않고 Fun한, 편의점 음식을 조합하여 먹고 공유하자!</About>
        <Input value={email} onChange={emailHandler} type="text" id="email" placeholder="이메일을 입력하세요" />
        <Input
          value={password}
          onChange={passwordHandler}
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
        />

        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button onClick={handleLogin}>로그인</Button>
        <RowContainer>
          <StyledLink to={'/password_reset'}>비밀번호 재설정</StyledLink>
          <div>|</div>
          <StyledLink to={'/register'}>회원가입</StyledLink>
        </RowContainer>
        <ColumnContainer>
          <SocialLabel>간편한 소셜 로그인</SocialLabel>
          <SocialContainer>
            <OAuthLogin provider="google" />
            <OAuthLogin provider="kakao" />
            <OAuthLogin provider="github" />
          </SocialContainer>
        </ColumnContainer>
      </LoginFormContainer>
    </>
  );
};

export default Login;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const About = styled.div`
  color: gray;
  margin: 25px 0px;
`;

const SocialLabel = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
  margin-top: 50px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: center; /* 요소들을 수평 가운데로 정렬 */
  align-items: center; /* 요소들을 수직 가운데로 정렬 */
  flex-direction: row; /* 요소들을 세로 방향으로 배치 */
`;

const ColumnContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center; /* 추가 */
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  /* 여기에 스타일을 추가하세요 */
  text-decoration: none;
  color: #999999;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  margin: 15px;
  /* 추가적인 스타일링을 원하는 대로 적용하세요 */
`;
