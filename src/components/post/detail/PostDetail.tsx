import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { getPost } from 'src/api/posts';
import WriterContainer from 'src/components/renderPosts/reactionSource/WriterContainer';
import ContentBox from 'src/components/renderPosts/reactionSource/ContentBox';
import OrgPostCard from './OrgPostCard';
import BottomFunction from './BottomFunction';
import Comment from 'src/components/detail/comments/Comment';
import { S } from './StyledPostDetail';

interface Props {
  isModal?: boolean;
}

const PostDetail = ({ isModal }: Props) => {
  const { id } = useParams<string>();

  const userId: string | undefined = useLoginUserId();

  const { isLoading, data } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id!)
  });
  const post = data?.data;
  const writer = post?.userId;

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (data?.error) {
    return <p>error</p>;
  }

  return (
    <S.DtailArea>
      <S.PostHead>
        <WriterContainer isModal={isModal} post={post} writer={writer} />
      </S.PostHead>
      <S.ContentsBox>
        <ContentBox post={post} />
        {post.hasOrgPost && <OrgPostCard orgPost={post.orgPostId} />}
        <S.FunctionBox>
          <BottomFunction userId={userId} post={post} />
        </S.FunctionBox>
        <Comment />
      </S.ContentsBox>
    </S.DtailArea>
  );
};

export default PostDetail;
