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

// 게시글 작성할 때 사용하는 임시 type
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

export interface RenderComponents {
  type: string;
  component: JSX.Element;
}
