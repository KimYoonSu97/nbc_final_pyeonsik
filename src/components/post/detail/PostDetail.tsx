import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
// custom hoooks
import useLoginUserId from 'src/hooks/useLoginUserId';
import useMutate from 'src/hooks/usePost';
// api
import { getPost } from 'src/api/posts';
import OrgPostCard from './OrgPostCard';
import BottomFunction from './BottomFunction';
import { S } from '../style/StyledPostDetail';
import CreatedAt from 'src/function/CreatedAt';
import TagImage from 'src/components/ImageTag/TagImage';

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  // current user id
  const userId: string | undefined = useLoginUserId();

  // 게시글 삭제, 좋아요, 좋아요 취소, 저장, 저장 취소
  const { deletePostMutate } = useMutate();

  // read data
  const { isLoading, data } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPost(id!)
    // enabled: id ? true : false
  });
  const post = data?.data;
  const writer = post?.userId;

  // delete post
  const clickDelete = (id: string) => {
    deletePostMutate.mutate(id);
    navigate('/');
  };

  const clickEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>error</p>;
  }

  return (
    <S.DtailArea>
      <S.PostHead>
        <S.WriterImgBox>
          <S.WriterImg src={writer.profileImg} />
        </S.WriterImgBox>
        <S.WriterContainer>
          <div>
            <S.WriterInfo>
              <S.WirterLevel>Lv. 수습</S.WirterLevel>
              {writer.nickname}
              <S.WriterSir>님의</S.WriterSir>
              {post.postCategory === 'common' && '그르륵갉'}
              {post.postCategory === 'recipe' && '편식조합'}
            </S.WriterInfo>
            <S.PostDate>
              <CreatedAt createdAt={post.created_at} />
            </S.PostDate>
          </div>
          {userId === writer.id && (
            <S.WriterFunction>
              <S.WriterButton onClick={clickEdit}>수정</S.WriterButton>
              <S.Contour />
              <S.WriterButton onClick={() => clickDelete(post.id)}>삭제</S.WriterButton>
            </S.WriterFunction>
          )}
        </S.WriterContainer>
      </S.PostHead>
      <S.PostTitle>{post.title}</S.PostTitle>
      {post.postCategory === 'common' && <S.PostBodyCommon dangerouslySetInnerHTML={{ __html: post.body }} />}
      {post.postCategory === 'recipe' &&
        post.tagimage.map((tagImageUrl: string, index: string) => (
          <TagImage
            key={index}
            imageUrl={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${tagImageUrl}`}
            recipeBody={post.recipeBody[index]}
            tagsForImage={post.tags[index] || []}
          />
        ))}
      {post.orgPostId && <OrgPostCard orgPost={post.orgPostId} />}
      <BottomFunction userId={userId} post={post} />
    </S.DtailArea>
  );
};

export default PostDetail;
