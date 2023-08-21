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
