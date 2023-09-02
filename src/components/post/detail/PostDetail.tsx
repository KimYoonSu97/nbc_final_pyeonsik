import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
// custom hoooks
import useLoginUserId from 'src/hooks/useLoginUserId';
// api
import { getPost } from 'src/api/posts';
import OrgPostCard from './OrgPostCard';
import BottomFunction from './BottomFunction';
import { S } from '../style/StyledPostDetail';
import TagImage from 'src/components/ImageTag/TagImage';
import Comment from 'src/components/Detail/comments/Comment';

// import styled, { css } from 'styled-components';
import WriterContainer from 'src/components/renderPosts/reactionSource/WriterContainer';
import ContentBox from 'src/components/renderPosts/reactionSource/ContentBox';

interface Props {
  isModal?: boolean;
}

const PostDetail = ({ isModal }: Props) => {
  const { id } = useParams<string>();

  // current user id
  const userId: string | undefined = useLoginUserId();

  // read data
  //트러블 슈팅 1
  // 1_게시글 데이터 패치 시 쿼리키 문제 => 게시글 아이디로 쿼리키 고유화
  const { isLoading, data } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id!)
    // enabled: id ? true : false
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
        {/* 유저정보 컴포넌트 화 했음 */}
        <WriterContainer isModal={isModal} post={post} writer={writer} />
      </S.PostHead>
      <S.ContentsBox>
        {/* 내부 컨텐츠 컴포넌트화 했음 */}
        <ContentBox post={post} />
        {post.orgPostId && <OrgPostCard orgPost={post.orgPostId} />}

        {/* 내부 요소들 컴포넌트 화 */}
        <S.FunctionBox>
          <BottomFunction userId={userId} post={post} />
        </S.FunctionBox>
        <Comment />
      </S.ContentsBox>
    </S.DtailArea>
  );
};

export default PostDetail;
