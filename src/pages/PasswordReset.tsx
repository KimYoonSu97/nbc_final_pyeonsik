import React, { useState } from 'react';

import { supabase } from 'src/supabse';
import styled from 'styled-components';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  //   TODO: 기능 정상 작동 안됨.
  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setErrorMessage(error.message);
        console.error('Error sending reset password email:', error.message);
      } else {
        const successMessage = 'Password reset email sent successfully.';
        setSuccessMessage(successMessage);
        console.log(successMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ResetFormContainer>
      <ResetTitle>비밀번호 재설정</ResetTitle>
      <AskMessage>비밀번호 재설정을 위해서 가입하신 이메일을 입력해주세요.</AskMessage>
      <Input type="email" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />

      <SuccessMessage>{successMessage}</SuccessMessage>
      <ErrorMessage>
        {errorMessage && (
          <div>
            <span className="material-symbols-outlined">error</span>
            {errorMessage}
          </div>
        )}
      </ErrorMessage>
      <Button onClick={handleResetPassword}>인증메일 발송</Button>
    </ResetFormContainer>
  );
};

export default PasswordReset;

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
