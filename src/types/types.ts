export interface Post {
  id: number;
  created_at: string;
  orgPostid: string;
  postCategory: String;
  title: string;
  img: string;
  body: string;
  likes: string;
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
