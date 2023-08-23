import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { CommentType, WriteCommentData, deleteCommentData, getCommentData } from 'src/api/comment';
import { supabase } from 'src/supabse';
import ReComment from './ReComment';

import { CommentWriteWrap, CommentWrap, CommentInner } from './styledComments';

const Comment = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  const [user, setUser] = useState<any>();
  const [comment, setComment] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data }: any = await supabase.auth.getSession();
    console.log('userdatataaa', data.session.user);
    if (data) {
      setUser(data.session.user);
    }
  };

  //포스트 아이디와 같은 댓글 데이터 가져오기
  const { data: commentData } = useQuery(['comment'], () => getCommentData(postId!));

  //댓글 작성시 바로 렌더링
  const writeMutation = useMutation(WriteCommentData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
    }
  });
  //댓글 삭제시 바로 렌더링
  const deleteMutation = useMutation(deleteCommentData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
    }
  });

  //댓글 작성 버튼
  const WriteCommentButton = async (e: any) => {
    e.preventDefault();
    const newComment = {
      comment,
      postId
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

  return (
    <>
      <CommentWriteWrap>
        <form onSubmit={WriteCommentButton}>
          <p>
            <img></img>
          </p>
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
              <h2>{comment.comment}</h2>
              <p>{commentWriteDate(comment.created_at)}</p>
              <button>답글달기</button>
              <ReComment parentCommentId={comment.id} />
              {user && comment.userId === user.id && (
                <div>
                  <button onClick={() => deleteCommentButton(comment.id)}>삭제하기</button>
                </div>
              )}
            </CommentInner>
          );
        })}
      </CommentWrap>
    </>
  );
};

export default Comment;
