import { atom } from 'jotai';
import { Post } from 'src/types/types';

export const myPageTabAtom = atom<string>('1');
export const myPagePostAtom = atom<Post[]>([]);
