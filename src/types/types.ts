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
