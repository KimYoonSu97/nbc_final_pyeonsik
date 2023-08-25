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
  //아래 두t개 원유길이 추가
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
  isfirst?: boolean;
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
  postId: string;
}
// 이 아래는 이미지 태그 관련 프롭스입니다! 위에 포스트에도 살짝 있긴합니다
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

export interface ImageTagProps {
  onTagsAndResultsChange: (tags: Tag[], searchResults: Data[]) => void;
  onImageSelect: (selectedImage: File) => void;
}

export interface SearchProps {
  onSearchResultSelect: (result: Data) => void;
}

export interface ImageUploaderProps {
  onImageSelect: (imageFile: File) => void;
}
//여기까지
