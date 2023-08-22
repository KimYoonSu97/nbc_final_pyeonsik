import React, { forwardRef, Ref } from 'react';
import { InputProps } from 'src/types/types';

const PostWriteInput = (
  { type, name, id = name, title, value, onChange, autoFocus }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input ref={ref} type={type} name={name} value={value} onChange={onChange} autoFocus={autoFocus} />
    </>
  );
};

export default forwardRef(PostWriteInput);
