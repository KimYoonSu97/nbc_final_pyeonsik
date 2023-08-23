import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { CommentType, WriteCommentData, deleteCommentData, getCommentData } from 'src/api/comment';
import { supabase } from 'src/supabse';
import ReComment from './ReComment';

import { CommentWriteWrap, CommentWrap, CommentInner } from './styledComments';
import { addLike, deleteLike, getLike } from 'src/api/commentLike';
import CommentLikes from './CommentLikes';

const Comment = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  const [user, setUser] = useState<any>({ id: 'f3f322f0-2439-4580-b817-c9e0b7757cae', nickname: '가나다라' });
  const [comment, setComment] = useState('');

  console.log(user, 'userididididiid');

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const { data }: any = await supabase.auth.getSession();
  //   console.log('userdatataaa', data.session.user);
  //   if (data) {
  //     setUser(data.session.user);
  //   }
  // };
  interface UsersType {
    nickname: string;
  }
  //포스트 아이디와 같은 댓글 데이터 가져오기
  // const { data: commentData } = useQuery(['comment'], () => getCommentData(postId!));
  const { data: commentData } = useQuery<any>(['detailcomments'], () =>
    getCommentData('1c27cfc8-fbd5-48cd-81e4-dff6148f3456')
  );

  console.log(commentData);

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
      // postId
      userId: 'be029d54-dc65-4332-84dc-10213d299c53',
      postId: '1c27cfc8-fbd5-48cd-81e4-dff6148f3456'
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

  //좋아요 부분 ------------------------------------------------------------------------------------

  return (
    <>
      <CommentWriteWrap>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            WriteCommentButton();
          }}
        >
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
        {commentData?.map((comment: any) => {
          return (
            <CommentInner key={comment.id}>
              <h1>{comment.users.nickname}</h1>
              <h2>{comment.comment}</h2>
              <div>{comment.id}</div>
              <p>{commentWriteDate(comment.created_at)}</p>
              <CommentLikes commentId={comment.id} />
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
