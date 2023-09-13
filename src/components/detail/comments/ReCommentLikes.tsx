import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { getLikeByReCommentId } from 'src/api/ReCommentLike';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import supabase from 'src/lib/supabaseClient';
import { IconLiked, IconUnLiked } from 'src/components/icons';
import { useLocation } from 'react-router';
import { EMAIL_CHECK } from 'src/utility/guide';
import { styleFont } from 'src/styles/styleFont';
import { toast } from 'react-toastify';
import { ProgressCircle } from 'src/utility/ProgressCircle';

interface Props {
  commentId: string;
}

const ReCommentLikes = ({ commentId }: Props) => {
  const [isLike, setIsLike] = useState<boolean>();
  const location = useLocation();
  const navigate = useNavigate();
  const userId: string = useLoginUserId();
  const { id: postId } = useParams();
  const [likeNum, setLikeNum] = useState<number>(0);

  // //좋아요 데이터 받기
  const { data: likeData, isLoading } = useQuery(
    ['reLikes', commentId],
    () => getLikeByReCommentId(commentId, userId),
    {
      // enabled: userId ? true : false,
      refetchOnWindowFocus: false
    }
  );

  // 가져온 데이터에서 내아이디가 있으면 빨강아이콘 나오도록 설정
  useEffect(() => {
    setLikeNum(likeData?.likeNum as number);
    if (likeData?.myLike === 1) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [likeData]);

  // // 내 좋아요 상태에 따라 다른....작동...
  const clickButton = async () => {
    if (!userId) {
      toast(EMAIL_CHECK);
      navigate('/login', { state: { backgroundLocation: location } });
      return;
    }
    if (isLike) {
      await supabase.from('replay_comment_likes').delete().eq('commentId', commentId).eq('userId', userId);

      setLikeNum(likeNum! - 1);
      setIsLike(!isLike);
    } else {
      const response = await supabase.from('replay_comment_likes').insert({ commentId, userId, postId }).select();
      setLikeNum(likeNum! + 1);
      setIsLike(!isLike);
    }
  };

  if (isLoading) {
    return <S.LikeNum><ProgressCircle/></S.LikeNum>;
  }

  if (isLike === undefined) {
    return <S.LikeNum><ProgressCircle/></S.LikeNum>;
  }

  return (
    <>
      <S.LikeButton onClick={clickButton}>{isLike ? <IconLiked /> : <IconUnLiked />}</S.LikeButton>
      <S.LikeNum>{likeNum ? likeNum : '0'}개</S.LikeNum>
    </>
  );
};

const S = {
  LikeButton: styled.div`
    cursor: pointer;
  `,

  LikeNum: styled.div`
    color: var(--neutral-500, #667085);
    text-align: right;

    ${styleFont.bodyMedium}
  `
};
export default ReCommentLikes;
