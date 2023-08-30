import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addLike, deleteLike, getLike } from 'src/api/commentLike';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
interface CommentIdProps {
  commentId: string;
}
interface LikeType {
  id: string;
  commentId: string;
  userId: string;
  postId: string;
}

const CommentLikes: React.FC<CommentIdProps> = ({ commentId }) => {
  const queryClient = useQueryClient();
  const userId = useLoginUserId();

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
      return like.commentId === commentId && like.userId === userId;
    });

    if(!userId){
      alert('로그인 후 이용해 주세요.')
      return;
    }

    if (changeLike) {
      deleteLikeMutation.mutate({ commentId, userId });
    } else {
      addLikeMutation.mutate({ commentId, userId });
    }
  };

  const checkLike = (commentId: string, userId: string | undefined, likeData: any) => {
    let answer = false;
    let array: LikeType[] = [];
    if (likeData) {
      array = [...likeData];
    }

    array.forEach((element) => {
      if (element.commentId === commentId && element.userId === userId) {
        answer = true;
      }
    });
    return answer;
  };

  const getCommentLikesCount = (commentId: string) => {
    const commentLikesCount = likeData?.filter((like) => like.commentId === commentId).length;
    return commentLikesCount || 0;
  };

  return (
    <button onClick={() => toggleLike(commentId)}>
      {checkLike(commentId, userId, likeData) ? <AiFillLike size={'18px'} /> : <AiOutlineLike size={'18px'} />}
      {getCommentLikesCount(commentId)}
      {/* <좋아요컴포넌트 comment.id user.id> 배열을 불러온 useQuery [likeData]=1초 => fetch => http 100번 0초  </좋아용> */}
    </button>
  );
};

export default CommentLikes;
