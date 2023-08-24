// input custom hook
export interface InputProps {
  type: string;
  name: string;
  id?: string;
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

// post
export interface Post {
  id: string;
  created_at: string;
  orgPostId: string;
  postCategory: string;
  title: string;
  img: string;
  body: string;
  product: [];
  userId?: PostUserProfile | string;
}

// 게시글 작성할 때 사용하는 임시 type
export interface NewPost {
  // orgPostId: string;
  postCategory: string;
  title: string;
  // img: string;
  body: string;
  userId: string;
}

export interface EditPost {
  id: string;
  title: string;
  body: string;
}

// post like
export interface PostLike {
  id: string;
  postId: string;
  userId: string;
}

export interface NewPostLike {
  postId: string;
  userId: string;
}

// post bookmark
export interface PostBookmark {
  id: string;
  postId: string;
  userId: string;
}

export interface NewPostBookmark {
  postId: string;
  userId: string;
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

export interface PostUserProfile {
  nickname: string;
  profileImg: string;
}

export interface RenderComponents {
  type: string;
  component: JSX.Element;
}
