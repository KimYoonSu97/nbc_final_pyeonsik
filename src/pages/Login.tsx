import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import OAuthLogin from '../components/OAuthLogin';
import supabase from 'src/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { User } from '@supabase/supabase-js';

export const userAtom = atom<User | null>(null);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Atom 생성

  const [_, setUser] = useAtom(userAtom);

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
      setSuccessMessage('로그인 완료!');
      setUser(data.user);

      navigate('/');
    }

    if (error) {
      setErrorMessage('Error logging in: ' + error.message);
    } else {
      // console.log('Registration successful:', data);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == 'PASSWORD_RECOVERY') {
        const newPassword = prompt('What would you like your new password to be?');
        if (newPassword !== null) {
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword
          });
        }
      }
    });
  }, []);

  return (
    <>
      <LoginFormContainer>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <OAuthLogin provider="google" />
          <OAuthLogin provider="kakao" />
          <OAuthLogin provider="github" />
        </div>

        <Label htmlFor="email">이메일</Label>
        <Input value={email} onChange={emailHandler} type="text" id="email" placeholder="이메일을 입력하세요" />

        <Label htmlFor="password">비밀번호</Label>
        <Input
          value={password}
          onChange={passwordHandler}
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
        />
        <SuccessMessage>{successMessage}</SuccessMessage>
        <ErrorMessage>{errorMessage}</ErrorMessage>

        <Button onClick={handleLogin}>로그인</Button>
        <br />
      </LoginFormContainer>
    </>
  );
};

export default Login;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
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
