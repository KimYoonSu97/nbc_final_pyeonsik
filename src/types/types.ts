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
  userId?: PostUserProfile | string;
  likes: string;
  likesCount: number;
  //아래 두개 원유길이 추가
  tags: { x: number; y: number; prodData: string; img: string; price: string }[];
  tagimage: string;
}

// 게시글 작성할 때 사용하는 임시 type
export interface NewPost {
  // orgPostId: string;
  // postCategory: string;
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

export interface PostLike {
  id: string;
  postId: string;
  userId: string;
}

export interface NewPostLike {
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

export interface Likes {
  id: string;
  likes: string;
}
// 이 아래가 내가 가져온 타입선언
export interface Tag {
  x: number;
  y: number;
  prodData: string;
  img: string;
  price: string;
}

export interface ImageData {
  url: string[];
  tags: Tag[];
}

export interface Data {
  prodName: string;
  prodImg: string;
  prodBrand: string;
  prodCategory: string;
  price: string;
}

// export interface Post {
//   id: string;
//   tags: { x: number; y: number; text: string; img: string; price: string }[];
//   url: string;
// }

// export interface Result {
//   img: string;
//   title: string;
//   price: string;
// }

export interface ImageTagProps {
  onTagsAndResultsChange: (tags: Tag[], searchResults: Data[]) => void;
  onImageSelect: (selectedImage: File) => void;
}
