import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { getReCommentData, writeReCommentData } from 'src/api/ReComment';
import { supabase } from 'src/supabse';
import { CommentWrap, CommentWriteWrap } from './styledComments';

interface ReCommentProps {
  parentCommentId: string;
}

const ReComment: React.FC<ReCommentProps> = ({ parentCommentId }) => {
  const [reComment, setReComment] = useState('');
  const queryClient = useQueryClient();

  const { data: reCommentData } = useQuery(['reComment'], () => getReCommentData(parentCommentId));
  console.log(reCommentData);

  const WriteReCommentMutation = useMutation(writeReCommentData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reComment']);
    }
  });

  const writeReCommentButton = () => {
    const newReComment = {
      reComment,
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
                <h2>{item.reComment}</h2>
                {/* <div>{item.created_at}</div> */}
              </>
            );
          })}
      </CommentWrap>
    </>
  );
};

export default ReComment;