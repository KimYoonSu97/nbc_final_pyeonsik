export interface Post {
  id: number;
  created_at: string;
  orgPostid: string;
  postCategory: String;
  title: string;
  img: string;
  body: string;
  likes: string;
  likesCount: number;
}

export interface RankProps {
  isFirst?: boolean;
}

export interface RenderComponents {
  type: string;
  component: JSX.Element;
}

export interface Likes {
  id: string;
  likes: string;
}
