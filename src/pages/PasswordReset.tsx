import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import supabase from 'src/lib/supabaseClient';
import styled from 'styled-components';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [password, setPassword] = useState('');

  // TODO: 아무것도 안보내짐..
  // 작성한 이메일로 비밀번호 변경 링크 발송
  const handleResetPassword = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (!error) {
      toast('성공적으로 해당 이메일로 발신하였습니다.');
    }
    console.log(error);
  };

  // 발송된 링크 클릭 후 돌아오면 리셋 이벤트 발생
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        const newPassword = prompt('What would you like your new password to be?');
        if (newPassword === null) {
          toast('비밀번호가 공백입니다.');
          return;
        }
        setPassword(newPassword);
        const { data, error } = await supabase.auth.updateUser({ password: password });

        if (data) toast('Password updated successfully!');
        if (error) toast('There was an error updating your password.');
      }
    });
  }, []);

  return (
    <ResetFormContainer>
      <ResetTitle>비밀번호 재설정</ResetTitle>
      <AskMessage>비밀번호 재설정을 위해서 가입하신 이메일을 입력해 주세요.</AskMessage>
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
      <Button onClick={handleResetPassword}>인증 메일 발송</Button>
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
