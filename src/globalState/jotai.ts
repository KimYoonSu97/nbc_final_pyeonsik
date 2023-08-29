import { atom } from 'jotai';
import { Post } from 'src/types/types';
import { atomWithHash } from 'jotai-location';

export const myPagePostAtom = atom<Post[]>([]);

export const userAtom = atom<string>('');

interface Props {
  state: boolean;
  data: null | Post;
}

export const modalOpenAtom = atomWithHash<Props>('modalOpen', { state: false, data: null });
