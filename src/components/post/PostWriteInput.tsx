import React, { forwardRef, Ref } from 'react';

interface InputProps {
  type: string;
  name: string;
  id?: string;
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

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
