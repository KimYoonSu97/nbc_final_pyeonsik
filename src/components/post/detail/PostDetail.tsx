import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { getPost } from 'src/api/posts';
import WriterContainer from 'src/components/renderPosts/reactionSource/WriterContainer';
import ContentBox from 'src/components/renderPosts/reactionSource/ContentBox';
import OrgPostCard from './OrgPostCard';
import BottomFunction from './BottomFunction';
import Comment from 'src/components/Detail/comments/Comment';
import { S } from '../style/StyledPostDetail';

interface Props {
  isModal?: boolean;
}

const PostDetail = ({ isModal }: Props) => {
  const { id } = useParams<string>();

  const userId: string | undefined = useLoginUserId();

  // 트러블 슈팅 1
  // 1_게시글 데이터 패치 시 쿼리키 문제 => 게시글 아이디로 쿼리키 고유화
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
        {/* 유저정보*/}
        <WriterContainer isModal={isModal} post={post} writer={writer} />
      </S.PostHead>
      <S.ContentsBox>
        {/* 내부 컨텐츠 */}
        <ContentBox post={post} />
        {post.orgPostId && <OrgPostCard orgPost={post.orgPostId} />}
        {/* 내부 요소 */}
        <S.FunctionBox>
          <BottomFunction userId={userId} post={post} />
        </S.FunctionBox>
        <Comment />
      </S.ContentsBox>
    </S.DtailArea>
  );
};

export default PostDetail;
