export interface Post {
  id: string;
  created_at: string;
  orgPostId: string;
  postCategory: string;
  title: string;
  img: string;
  body: string;
  product: [];
  bookmark: [];
  userId: string;
  likes: string;
}

export interface NewPost {
  // orgPostId: string;
  // postCategory: string;
  title: string;
  // img: string;
  body: string;
  // userId: string;
}

export interface EditPost {
  id: string;
  title: string;
  body: string;
}

export interface RankProps {
  isFirst?: boolean;
}

export interface UserType {
  uid: string;
  email: string;
  password: string;
  nickname: string;
  profileimg: File | null;
}

export interface UserTypes {
  uid: string | null;
  email: string | null;
  password: string | null;
  nickname: string | null;
  profileimg: File | string | null;
}

export interface RenderComponents {
  type: string;
  component: JSX.Element;
}
