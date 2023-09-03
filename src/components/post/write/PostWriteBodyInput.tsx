import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { TextAreaInputProps } from 'src/types/types';

const PostWriteBodyInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ name, id = name, title, value, onChange, autoFocus }, ref) => {
    return (
      <S.InputContainer>
        {/* <S.Label htmlFor={id}>{title}</S.Label> */}
        <S.TextAreaElement ref={ref} name={name} value={value} onChange={onChange} autoFocus={autoFocus} />
      </S.InputContainer>
    );
  }
);

export default PostWriteBodyInput;

const S = {
  InputContainer: styled.div`
    /* width: 100%; */
    /* min-height: 360px; */
    /* margin-bottom: 1rem; */
  `,
  Label: styled.label`
    font-weight: bold;
  `,
  TextAreaElement: styled.textarea`
    /* max-width: 578px; */
    width: 464px;
    border-radius: 10px;

    min-height: 360px;
    border: 1px solid #ccc;

    resize: none;
    padding: 24px 22px;
    /* background-color: royalblue; */

    color: var(--font-black, var(--Black, #242424));

    /* body-large */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */

    outline: none;
    /* bor */
  `
};
