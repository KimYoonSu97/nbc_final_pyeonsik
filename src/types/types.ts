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

export interface RenderComponents {
  type: string;
  component: JSX.Element;
}
