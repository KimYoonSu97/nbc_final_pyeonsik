import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import supabase from 'src/lib/supabaseClient';
import { Link } from 'react-router-dom';
import TermsAndConditions from './TermsAndConditions';

interface Props {
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const SignUpForm = ({ setNextStep, setUserEmail }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    //유효성 검사
    if (!email || !password || !checkPassword) {
      setErrorMessage('빈 값이 있습니다!');
      return;
    }
    if (password !== checkPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다!');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(`error, ${error}`);
      return;
    }
    console.log(data);
    setUserEmail(email);
    setNextStep(true);
    // navigate('/')
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const checkPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };
  

  return (
    <RegisterFormContainer>
      <SuccessMessage>{successMessage}</SuccessMessage>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Label>이메일</Label>
      <Input maxLength={30} type="text" placeholder="이메일을 입력하세요" value={email} onChange={emailHandler} />
      <Label>패스워드</Label>
      <Input
        maxLength={20}
        type="password"
        placeholder="패스워드을 입력하세요"
        value={password}
        onChange={passwordHandler}
      />
      <Label>패스워드 확인</Label>
      <Input
        maxLength={20}
        type="password"
        placeholder="패스워드을 다시 입력하세요"
        value={checkPassword}
        onChange={checkPasswordHandler}
      />
      <TermsAndConditions/>

      <Button onClick={handleSignUp}>가입하기</Button>
      <AskMessage>이미 편식 계정이 있으신가요?</AskMessage>
      <StyledLink to={'/login'}>기존 계정으로 로그인하기</StyledLink>
    </RegisterFormContainer>
  );
};

export default SignUpForm;

const RegisterFormContainer = styled.div`
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

const PreviewImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

const SelectedFileName = styled.div`
  margin-top: 10px;
  color: #666;
  font-size: 14px;
`;

const AskMessage = styled.div`
  margin-top: 10px;
  color: #d9d9d9;
  font-size: 14px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  /* 여기에 스타일을 추가하세요 */
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  /* 추가적인 스타일링을 원하는 대로 적용하세요 */
`;
