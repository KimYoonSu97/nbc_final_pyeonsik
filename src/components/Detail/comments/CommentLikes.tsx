import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addLike, deleteLike, getLike } from 'src/api/CommentLike';
interface CommentIdProps {
  commentId: string;
}
const CommentLikes: React.FC<CommentIdProps> = ({ commentId }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>({ id: 'f3f322f0-2439-4580-b817-c9e0b7757cae', nickname: '가나다라' });

  //좋아요 데이터 받기
  const { data: likeData } = useQuery(['likes'], getLike);

  //클릭시 좋아요 데이터에 추가
  const addLikeMutation = useMutation(addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likes']);
    }
  });
  //좋아요된 댓글 클릭시 데이터 삭제
  const deleteLikeMutation = useMutation(deleteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likes']);
    }
  });

  const toggleLike = (commentId: string) => {
    const changeLike = likeData?.find((like) => {
      return like.commentId === commentId && like.userId === user.id;
    });

    if (changeLike) {
      deleteLikeMutation.mutate({ commentId, userId: user.id });
    } else {
      addLikeMutation.mutate({ commentId, userId: user.id });
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
    const commentLikesCount = likeData?.filter((like: any) => like.commentId === commentId).length;
    return commentLikesCount || 0;
  };
  
  return (
    <button onClick={() => toggleLike(commentId)}>
      {checkLike(commentId, user.id, likeData) ? '♥' : '♡'}
      {getCommentLikesCount(commentId)}
      {/* <좋아요컴포넌트 comment.id user.id> 배열을 불러온 useQuery [likeData]=1초 => fetch => http 100번 0초  </좋아용> */}
    </button>
  );
};

export default CommentLikes;
