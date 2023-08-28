import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { WriteCommentData, deleteCommentData, getCommentData } from 'src/api/comment';
import ReComment from './ReComment';

import { CommentWriteWrap, CommentWrap, CommentInner } from './styledComments';
import CommentLikes from './CommentLikes';
import useLoginUserId from 'src/hooks/useLoginUserId';

interface CommentDataType {
  id: string;
  created_at: string;
  userId: string;
  postId: string;
  comment: string;
  users: {
    profileImg: string;
    nickname: string;
  };
}

const Comment = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<string>();
  console.log(id);

  const userId = useLoginUserId();
  const [comment, setComment] = useState('');

  //포스트 아이디와 같은 댓글 데이터 가져오기
  const { data: commentData } = useQuery(['detailcomments'], () => getCommentData(id!));

  //댓글 작성시 바로 렌더링
  const writeMutation = useMutation(WriteCommentData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailcomments']);
    }
  });
  //댓글 삭제시 바로 렌더링
  const deleteMutation = useMutation(deleteCommentData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailcomments']);
    }
  });

  //댓글 작성 버튼
  const WriteCommentButton = () => {
    const newComment = {
      comment,
      userId,
      postId: id
    };
    writeMutation.mutate(newComment);
    setComment('');
  };

  //댓글 삭제 버튼
  const deleteCommentButton = (id: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    } else {
      alert('삭제가 취소되었습니다.');
    }
  };

  //작성 날짜 월일로 변환
  const commentWriteDate = (date: string) => {
    const writeDate = new Date(date);
    const month = writeDate.getMonth() + 1;
    const day = writeDate.getDate();
    return `${month}월 ${day}일`;
  };

  console.log('여기있어! commentData', commentData);

  return (
    <>
      <CommentWriteWrap>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            WriteCommentButton();
          }}
        >
          <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="댓글을 남겨보세요!"></input>
          <button>
            <img src="/images/commentWriteImg2.png" alt="댓글작성버튼"></img>
          </button>
        </form>
      </CommentWriteWrap>
      <CommentWrap>
        {commentData?.map((comment) => {
          return (
            <CommentInner key={comment.id}>
              <div className="commentInfo">
                {userId && (
                  <div>
                    <img src={comment.users.profileImg}></img>
                    <h1>{comment.users.nickname}</h1>
                    <span>{commentWriteDate(comment.created_at)}</span>
                  </div>
                )}
                <div>
                  {userId && comment.userId === userId && (
                    <div>
                      <button onClick={() => deleteCommentButton(comment.id)}>삭제하기</button>
                    </div>
                  )}
                  <CommentLikes commentId={comment.id} />
                </div>
              </div>
              <h2>{comment.comment}</h2>

              <ReComment parentCommentId={comment.id} />
            </CommentInner>
          );
        })}
      </CommentWrap>
    </>
  );
};

export default Comment;
