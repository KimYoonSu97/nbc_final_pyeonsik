import React, { forwardRef, Ref } from 'react';
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
    width: 578px;
    height: 360px;
    margin-bottom: 1rem;
  `,
  Label: styled.label`
    font-weight: bold;
  `,
  InputElement: styled.input`
    width: 578px;
    height: 360px;
    border: 1px solid #ccc;
    border-radius: 4px;
  `,
  TextAreaElement: styled.textarea`
    width: 578px;
    height: 360px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
  `
};
