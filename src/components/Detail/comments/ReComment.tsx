import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { getReCommentData, writeReCommentData } from 'src/api/ReComment';
import { supabase } from 'src/supabse';
import { CommentWrap, CommentWriteWrap } from './styledComments';
import ReCommentLikes from './ReCommentLikes';

interface ReCommentProps {
  parentCommentId: string;
}

const ReComment: React.FC<ReCommentProps> = ({ parentCommentId }) => {
  const [reComment, setReComment] = useState('');
  const queryClient = useQueryClient();


  const { data: reCommentData } = useQuery(['reComment'], () => getReCommentData(parentCommentId));

  const WriteReCommentMutation = useMutation(writeReCommentData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reComment']);
    }
  });

  const writeReCommentButton = () => {
    const newReComment = {
      comment:reComment,
      parent_commentId: parentCommentId
    };
    WriteReCommentMutation.mutate(newReComment);
  };
  return (
    <>
      <CommentWriteWrap>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            writeReCommentButton();
          }}
        >
          <input
            value={reComment}
            onChange={(e) => {
              setReComment(e.target.value);
            }}
          ></input>
          <button>
            <img src="/images/commentWriteImg2.png" alt="답글작성버튼"></img>
          </button>
        </form>
      </CommentWriteWrap>
      <CommentWrap>
        {reCommentData
          ?.filter((item) => {
            return item.parent_commentId === parentCommentId;
          })
          .map((item) => {
            return (
              <>
              <h1>{item.id}</h1>
                <h2>{item.comment}</h2>
                {/* <div>{item.created_at}</div> */}
                <ReCommentLikes commentId={item.id}/>
              </>
            );
          })}
      </CommentWrap>
    </>
  );
};

export default ReComment;
