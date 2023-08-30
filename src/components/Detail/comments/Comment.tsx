import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { WriteCommentData, deleteCommentData, getCommentData, updateCommentData } from 'src/api/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReComment from './ReComment';
import { CommentWriteWrap, CommentWrap, CommentInner } from './styledComments';
import CommentLikes from './CommentLikes';
import useLoginUserId from 'src/hooks/useLoginUserId';
import useMutate from 'src/hooks/useComment';
import CreatedAt from './CreatedAt';

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
  const [comment, setComment] = useState('');
  const [updateToggle, setUpdateToggle] = useState(false);
  const [updateComment, setUpdateComment] = useState('');
  const [updateId, setUpdateId] = useState<string | null>(null);
  const { writeCommentMutation, deleteCommentMutation, updateCommentMutation } = useMutate();
  const updateInputRef = useRef<HTMLInputElement>(null);

  const { id } = useParams<string>();
  const userId = useLoginUserId();

  useEffect(() => {
    if (updateInputRef.current && updateToggle) {
      updateInputRef.current.focus();
      return;
    }
  }, []);

  //포스트 아이디와 같은 댓글 데이터 가져오기

  const { data: commentData } = useQuery(['detailcomments'], () => getCommentData(id!));

  //댓글 작성 버튼
  const WriteCommentButton = () => {
    const newComment = {
      comment,
      userId,
      postId: id
    };
    if (!userId) {
      alert('로그인 후 이용해 주세요.');
      return;
    }
    if(comment.trim() === ''){
      alert('댓글을 작성해 주세요.')
      return;
    }

    writeCommentMutation.mutate(newComment);
    setComment('');
  };

  //댓글 삭제 버튼
  const deleteCommentButton = (id: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate(id);
    } else {
      alert('삭제가 취소되었습니다.');
    }
  };

  const updateCommentButton = (id: string) => {
    const newComment = {
      id,
      comment: updateComment
    };
    updateCommentMutation.mutate(newComment);
    setUpdateToggle(false);
  };

  const updateOpenButton = (id: string, comment: string) => {
    setUpdateComment(comment);
    setUpdateToggle(true);
    setUpdateId(id);
  };

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
                <div>
                  <div>
                    <img src={comment.users?.profileImg}></img>
                    <h1>{comment.users?.nickname}</h1>
                  </div>
                  <CreatedAt createdAt={comment.created_at} />
                </div>
                <div>
                  <CommentLikes commentId={comment.id} />
                </div>
              </div>
              {updateToggle && comment.id === updateId ? (
                <div>
                  <input
                    ref={updateInputRef}
                    type="text"
                    value={updateComment}
                    onChange={(e) => {
                      setUpdateComment(e.target.value);
                    }}
                  ></input>
                  <button onClick={() => updateCommentButton(comment.id)}>수정</button>
                  <button
                    onClick={() => {
                      setUpdateToggle(false);
                      setUpdateId(null);
                    }}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <h2>{comment.comment}</h2>
              )}
              {userId && comment.userId === userId && (
                <div className="fnButton">
                  <button onClick={() => updateOpenButton(comment.id, comment.comment)}>수정</button>
                  <button onClick={() => deleteCommentButton(comment.id)}>삭제</button>
                </div>
              )}

              <ReComment parentCommentId={comment.id} />
            </CommentInner>
          );
        })}
      </CommentWrap>
    </>
  );
};

export default Comment;
