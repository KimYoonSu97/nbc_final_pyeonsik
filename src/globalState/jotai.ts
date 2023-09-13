import { Location } from 'react-router';
import { atom } from 'jotai';
import { atomWithHash } from 'jotai-location';
import { Post, Product } from 'src/types/types';

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

export const searchBar = atom<boolean>(false);

export const searchKeyWord = atom<{ postData: Post[] | null; productData: Product[] | null; searchKey: string }>({
  postData: null,
  productData: null,
  searchKey: ''
});

export const myPageHover = atom<boolean>(false);

export const userSettingEmail = atom<string>('');

export const userSignUp = atom<boolean>(false);
