import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { TextAreaInputProps } from 'src/types/types';

const PostWriteBodyInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ name, id = name, title, value, onChange, autoFocus }, ref) => {
    return (
      <S.InputContainer>
        <S.TextAreaElement
          placeholder="어떤 제품으로 만든 레시피인가요?&#13;&#10;사진 추가 후 상품을 검색하고 해당 제품을 태그해 보세요."
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
        />
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
    border: none;

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
