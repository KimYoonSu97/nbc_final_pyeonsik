import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';
import { InputProps } from 'src/types/types';

const PostWriteBodyInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, id = name, title, value, onChange, autoFocus }, ref) => {
    return (
      <S.InputContainer>
        {/* <S.Label htmlFor={id}>{title}</S.Label> */}
        <S.InputElement ref={ref} type={type} name={name} value={value} onChange={onChange} autoFocus={autoFocus} />
      </S.InputContainer>
    );
  }
);

export default PostWriteBodyInput;

const S = {
  InputContainer: styled.div`
    /* display: flex; */
    width: 578px;
    height: 360px;
    /* flex-direction: column; */
    margin-bottom: 1rem;
  `,
  Label: styled.label`
    font-weight: bold;
    margin-bottom: 0.5rem;
  `,
  InputElement: styled.input`
    padding: 0.5rem;
    width: 578px;
    height: 360px;
    border: 1px solid #ccc;
    border-radius: 4px;
  `
};
