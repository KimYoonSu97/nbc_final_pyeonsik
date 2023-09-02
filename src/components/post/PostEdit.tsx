// import React, { useEffect, useState } from 'react';
// import { Navigate, useNavigate, useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getPost } from 'src/api/posts';
// import useLoginUserId from 'src/hooks/useLoginUserId';
// import usePost from 'src/hooks/usePost';
// import EditorQuill from './write/EditorQuill';
// import OrgPostCard from './detail/OrgPostCard';
// import { S } from 'src/components/post/write/StyledPostWrite';
// import HeaderArea from './write/HeaderArea';
// import TitleArea from './write/TitleArea';
// // recipe
// import supabase from 'src/lib/supabaseClient';
// import { useAtom } from 'jotai';
// import { Tag } from 'src/types/types';
// import { contentsAtom, tagsDataAtom, imagesAtom } from '../ImageTag/AddImageTagComponent';
// import AddImageTagComponent from '../ImageTag/AddImageTagComponent';

// const PostEdit = () => {
//   const navigate = useNavigate();
//   const { id: prams } = useParams<string>();
//   const userId: string | undefined = useLoginUserId();

//   // common
//   const [title, setTitle] = useState<string>('');
//   const [body, setBody] = useState<string | string[] | undefined>();
//   // recipe
//   const [, setInputData] = useState<string[]>([]);
//   const [, setTagsData] = useState<Tag[][]>([]);
//   const [allSelectedImages, setAllSelectedImages] = useState<File[]>([]);
//   const [tagData, setTagData] = useState<Tag[][]>([]);
//   // const [isEditMode, setIsEditMode] = useState<boolean>(true);

//   const [allContents, setContentsAtom] = useAtom(contentsAtom);
//   const [allTags, setTagsDataAtom] = useAtom(tagsDataAtom);
//   const [selectedImages, setImagesDataAtom] = useAtom(imagesAtom);

//   // common
//   const { updatePostMutate } = usePost(prams!);
//   // recipe
//   const { tagUpdatePostMutate } = usePost(prams!);

//   // read
//   const { isLoading, data } = useQuery({ queryKey: ['post', prams], queryFn: () => getPost(prams!) });
//   const post = data?.data;
//   const category = post?.postCategory as string;
//   const orgPost = post?.orgPostId;

//   useEffect(() => {
//     setTitle(post?.title);
//     if (category === 'common') {
//       setBody(post?.body);
//     } else if (category === 'recipe') {
//       setBody(post?.recipeBody);
//     }
//     setAllSelectedImages(post?.tagimage);
//     setTagData(post?.tags);
//     setTagsData(post?.tags);
//     setInputData(post?.recipeBody);
//   }, [post]);

//   // edit
//   const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // common
//     if (category === 'common' && body.replace(/[<][^>]*[>]/gi, '').trim() === '') {
//       alert('내용을 입력해 주세요.');
//       return false;
//     }

//     const updatedImageUrls = [];

//     // 파일 업로드 및 URL 가져오기
//     for (const selectedImage of Object.values(selectedImages)) {
//       if (selectedImage instanceof File) {
//         const { data, error } = await supabase.storage
//           .from('photos')
//           .upload(`tags/${selectedImage.name}`, selectedImage);
//         if (error) {
//           console.error('Error uploading image to Supabase storage:', error);
//           alert('이미지 업로드 중 에러가 발생했습니다!');
//           return;
//         }
//         updatedImageUrls.push(data.path);
//       } else {
//         updatedImageUrls.push(selectedImage);
//       }
//     }

//     // type 문제 해결 필요
//     if (category === 'common') {
//       const editPost = {
//         // orgPostId: post.orgPostId?.id,
//         id: post.id,
//         title,
//         body
//       };
//       updatePostMutate.mutate(editPost);
//     } else if (category === 'recipe') {
//       const editPost = {
//         id: post.id,
//         title,
//         recipeBody: Object.values(allContents),
//         tags: Object.values(allTags),
//         tagimage: updatedImageUrls
//       };
//       tagUpdatePostMutate.mutate(editPost);
//     }

//     setContentsAtom({});
//     setTagsDataAtom({});
//     setImagesDataAtom({});

//     navigate(`/detail/${prams}`);
//   };

//   const clickCancle = () => {
//     navigate(-1);
//   };

//   if (isLoading) {
//     return <p>Loading…</p>;
//   }
//   if (data?.error) {
//     return <p>Error</p>;
//   }
//   if (userId && post.userId?.id && userId !== post.userId.id) {
//     alert('접근할 수 없습니다.');
//     return <Navigate to="/" />;
//   }

//   return (
//     <>
//       <S.WriteForm onSubmit={submitPost}>
//         <HeaderArea />
//         <S.WritePostArea>
//           <TitleArea category={category} title={title} setTitle={setTitle} />
//           {category === 'recipe' && orgPost && <OrgPostCard orgPost={orgPost} />}
//           {category === 'common' && <EditorQuill body={body} setBody={setBody} />}
//         </S.WritePostArea>
//         {category === 'recipe' && (
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <div style={{ width: '950px' }}>
//               {/* <AddImageTagComponent imageData={allSelectedImages} tagData={tagData} body={body} isEditMode={true} /> */}
//             </div>
//           </div>
//         )}
//       </S.WriteForm>
//       {category === 'common' && orgPost && <OrgPostCard orgPost={orgPost} />}
//       <button onClick={clickCancle}>cancle</button>
//     </>
//   );
// };

// export default PostEdit;

export const test = () => {
  return <></>;
};
