import { useAtom } from 'jotai';
import React, { useState } from 'react';

import styled from 'styled-components';
import { userAtom } from './Login';
import supabase from 'src/lib/supabaseClient';
import { useNavigate } from 'react-router';

const PasswordChange: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [user, setUser] = useAtom(userAtom);

  const handleResetPassword = async () => {
    // 유효성 검사

    // 빈 값이 있을 시
    if (!password || !checkPassword) {
      setErrorMessage('빈 값이 존재합니다.');
      setPassword('');
      setCheckPassword('');
      return;
    }

    if (password !== checkPassword) {
      setErrorMessage('비밀번호가 다릅니다.');
      setPassword('');
      setCheckPassword('');
      return;
    }

    // 현재 로그인된 회원이 있을시 비밀번호 변경
    if (user) {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (!error) {
        alert('비밀번호 재설정 완료!');
        setUser(null);
        supabase.auth.signOut();
        navigate('/login');
        const successMsg = 'Password changed successfully';
        setSuccessMessage(successMsg);
        console.log(successMsg);
      } else {
        alert(error);
        setErrorMessage(error.message);
        console.error('Error changing password:', error.message);
      }
    }
  };

  return (
    <ResetFormContainer>
      <ResetTitle>비밀번호 재설정</ResetTitle>
      <AskMessage>새로운 비밀번호를 입력해주세요.</AskMessage>
      <Input
        type="password"
        placeholder="새로운 비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="새로운 비밀번호 확인"
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
      />

      <SuccessMessage>{successMessage}</SuccessMessage>
      <ErrorMessage>
        {errorMessage && (
          <div>
            <span className="material-symbols-outlined">error</span>
            {errorMessage}
          </div>
        )}
      </ErrorMessage>
      <Button onClick={handleResetPassword}>비밀번호 변경하기</Button>
    </ResetFormContainer>
  );
};

export default PasswordChange;

const ResetFormContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
const ResetTitle = styled.div`
  font-weight: bold; /* 굵게 설정 */
  font-size: 24px; /* 큰 텍스트 크기 */
  text-align: center; /* 가운데 정렬 */
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AskMessage = styled.div`
  margin: 10px;
  color: #767474;
  font-size: 14px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// 성공, 오류 메시지 스타일
const SuccessMessage = styled.div`
  margin-top: 10px;
  color: blue;
  font-size: 14px;
`;
const ErrorMessage = styled.div`
  margin-top: 0px;
  color: red;
  font-size: 14px;
`;
