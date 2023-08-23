import React from 'react';
import { atom } from 'jotai';
import { Post } from 'src/types/types';

export const myPagePostAtom = atom<Post[]>([]);

const GlobalState = () => {
  return <></>;
};

export default GlobalState;
