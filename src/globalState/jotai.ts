import { Location } from 'react-router';
import { atom } from 'jotai';
import { atomWithHash } from 'jotai-location';
import { Post } from 'src/types/types';

export const myPagePostAtom = atom<Post[]>([]);

interface User {
  id: string;
  created_at?: string;
  email: string;
  nickname: string;
  profileImg: string;
  level: string;
}

export const userAtom = atom<User | null>(null);

interface Props {
  state: boolean;
  data: null | Post;
}

export const modalOpenAtom = atomWithHash<Props>('modalOpen', { state: false, data: null });

interface LoginModalProps {
  state: boolean;
  location?: Location | null;
}

export const loginModalAtom = atom<LoginModalProps>({ state: false, location: null });

export const writeCategorySelect = atom<string>('');
