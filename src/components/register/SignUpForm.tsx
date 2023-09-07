import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import supabase from 'src/lib/supabaseClient';
import { Link } from 'react-router-dom';
import TermsAndConditions from './TermsAndConditions';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { styleFont } from 'src/styles/styleFont';
import { FlexBoxAlignCenter, FlexBoxCenter, FlexBoxJustifyCenter } from 'src/styles/styleBox';

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
  const [terms1Agreed, setTerms1Agreed] = useState(false);
  const [terms2Agreed, setTerms2Agreed] = useState(false);

  // 이메일 정규식 표현
  const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(com|net)$/;

  const handleSignUp = async () => {
    //유효성 검사
    if (!email || !password || !checkPassword) {
      toast('빈 값이 있습니다!');
      return;
    }
    // 이메일 검사
    if (!emailPattern.test(email)) {
      toast('올바른 이메일 형식으로 입력해주세요!');
      setEmail('');
      return;
    }
    if (password !== checkPassword) {
      toast('비밀번호가 일치하지 않습니다!');
      setPassword('');
      setCheckPassword('');
      return;
    }

    if (!terms1Agreed || !terms2Agreed) {
      toast('이용약관에 동의해야 합니다.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setUserEmail(email);
    setNextStep(true);
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
    <S.Container>
      <S.Title>회원가입</S.Title>
      <S.InputArea>
        <S.Input maxLength={30} type="text" placeholder="이메일을 입력하세요" value={email} onChange={emailHandler} />
      </S.InputArea>

      <S.InputArea style={{ marginTop: '16px' }}>
        <S.Input
          maxLength={15}
          type="password"
          placeholder="패스워드을 입력하세요"
          value={password}
          onChange={passwordHandler}
        />
      </S.InputArea>
      <S.InputArea>
        <S.Input
          maxLength={15}
          type="password"
          placeholder="패스워드을 다시 입력하세요"
          value={checkPassword}
          onChange={checkPasswordHandler}
        />
      </S.InputArea>
      {/* <ErrorMessage>{errorMessage}</ErrorMessage> */}
      <TermsAndConditions
        terms1Agreed={terms1Agreed}
        setTerms1Agreed={setTerms1Agreed}
        terms2Agreed={terms2Agreed}
        setTerms2Agreed={setTerms2Agreed}
      />
      {!email || !password || !checkPassword || !terms1Agreed || !terms2Agreed ? (
        <S.SubmitDisable>가입하기</S.SubmitDisable>
      ) : (
        <S.Submit onClick={handleSignUp}>가입하기</S.Submit>
      )}

      <S.AskMessage>이미 편식 계정이 있으신가요?</S.AskMessage>
      <S.BackToLogin to={'/login'}>기존 계정으로 로그인하기</S.BackToLogin>
    </S.Container>
  );
};

export default SignUpForm;

const S = {
  Container: styled(FlexBoxAlignCenter)`
    width: 490px;
    /* height: 560px; */
    background: #fff;
    border-radius: 10px;
    border: 1px solid #efefef;
    margin: 0 auto;
    padding: 30px;
    flex-direction: column;
  `,
  Title: styled.div`
    color: var(--font-black, var(--Black, #242424));
    margin-bottom: 30px;
    ${styleFont.titleLarge}
  `,
  InputArea: styled(FlexBoxAlignCenter)`
    width: 294px;
    height: 42px;
    border-radius: 6px;
    border: 1px solid #ced4da;
    background: #fff;
    padding: 12px 11px;
    margin-bottom: 8px;
  `,
  Input: styled.input`
    width: 100%;
    outline: none;
    color: var(--font-black, var(--Black, #242424));
    border: none;
    ${styleFont.bodyMedium}
    &::placeholder {
      color: var(--neutral-400, var(--neutral-400, #98a2b3));
    }
  `,
  SubmitDisable: styled(FlexBoxCenter)`
    cursor: pointer;
    margin-top: 38px;
    display: flex;
    width: 294px;
    height: 42px;
    justify-content: center;
    align-items: center;
    background: var(--neutral-300, #d0d5dd);
    border-radius: 6px;
    color: #fff;
    text-align: center;
    ${styleFont.buttonSmall}
  `,
  Submit: styled(FlexBoxCenter)`
    cursor: pointer;
    margin-top: 38px;
    display: flex;
    width: 294px;
    height: 42px;
    justify-content: center;
    align-items: center;
    background: var(--main, #f02826);
    border-radius: 6px;
    color: #fff;
    text-align: center;
    ${styleFont.buttonSmall}
  `,
  AskMessage: styled.p`
    color: #666;
    margin-top: 8px;
    ${styleFont.bodySmall}
  `,
  BackToLogin: styled(Link)`
    color: #4285f4;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    text-decoration-line: underline;
  `
};

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 490px;
  height: 560px;
  border-radius: 10px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
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
