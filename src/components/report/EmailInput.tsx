import React from 'react';
import styled from 'styled-components';

interface PropsType {
  email: string;
  onBlur: () => void;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const EmailInput = ({ email, onBlur, onChange }: PropsType) => {
  return (
    <S.InputWrap>
      <h3>이메일</h3>
      <input
        className="emailInput"
        value={email}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이메일을 적어주세요."
      />
    </S.InputWrap>
  );
};

export default EmailInput;

const S = {
  InputWrap: styled.div`
    margin-bottom: 50px;
    h3 {
      display: inline-block;
      position: relative;
      right: 0px;
      top: 0px;
      &::after {
        display: block;
        content: '*필수';
        position: absolute;
        right: -50px;
        top: 5px;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        color: #98a2b3;
      }
    }
  `
};
