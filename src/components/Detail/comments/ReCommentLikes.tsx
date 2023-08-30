import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addLike, deleteLike, getLike } from 'src/api/ReCommentLike';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import useLoginUserId from 'src/hooks/useLoginUserId';
interface CommentIdProps {
  commentId: string;
}

const ReCommentLikes: React.FC<CommentIdProps> = ({ commentId }) => {
  const queryClient = useQueryClient();
  const userId = useLoginUserId();

  const { data: relikeData } = useQuery(['relikes'], getLike);

  //클릭시 좋아요 데이터에 추가
  const addLikeMutation = useMutation(addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['relikes']);
    }
  });
  //좋아요된 댓글 클릭시 데이터 삭제
  const deleteLikeMutation = useMutation(deleteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['relikes']);
    }
  });

  const toggleLike = (commentId: string) => {
    const changeLike = relikeData?.find((like) => {
      return like.commentId === commentId && like.userId === userId;
    });

    if(!userId){
      alert('로그인 후 이용해 주세요.')
      return;
    }

    if (changeLike) {
      deleteLikeMutation.mutate({ commentId, userId: userId });
    } else {
      addLikeMutation.mutate({ commentId, userId: userId });
    }
  };

  const checkLike = (commentId: string, userId: string, likeData: any) => {
    let answer = false;
    let array: any = [];
    if (likeData) {
      array = [...likeData];
    }

    array.forEach((element: any) => {
      if (element.commentId === commentId && element.userId === userId) {
        answer = true;
      }
    });
    return answer;
  };

  const getCommentLikesCount = (commentId: string) => {
    const commentLikesCount = relikeData?.filter((like: any) => like.commentId === commentId).length;
    return commentLikesCount || 0;
  };

  return (
    <button onClick={() => toggleLike(commentId)}>
      {checkLike(commentId, userId, relikeData) ? <AiFillLike size={'18px'} /> : <AiOutlineLike size={'18px'} />}
      {getCommentLikesCount(commentId)}
      {/* <좋아요컴포넌트 comment.id user.id> 배열을 불러온 useQuery [likeData]=1초 => fetch => http 100번 0초  </좋아용> */}
    </button>
  );
};

export default ReCommentLikes;
