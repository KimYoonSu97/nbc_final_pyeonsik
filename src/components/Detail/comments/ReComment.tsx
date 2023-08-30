import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { deleteReCommentData, getReCommentData, updateReCommentData, writeReCommentData } from 'src/api/ReComment';
import { ReCommentWrap, CommentWriteWrap, ReCommentToggle } from './styledComments';
import ReCommentLikes from './ReCommentLikes';
import { useParams } from 'react-router';
import useLoginUserId from 'src/hooks/useLoginUserId';
import useMutate from 'src/hooks/useReComment';
import CreatedAt from './CreatedAt';

interface ReCommentProps {
  parentCommentId: string;
}

const ReComment: React.FC<ReCommentProps> = ({ parentCommentId }) => {
  const [reComment, setReComment] = useState('');
  const [isReCommentToggle, setIsReCommentToggle] = useState(false);
  const [isReCommentInputToggle, setIsReCommentInputToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [updateComment, setUpdateComment] = useState('');
  const [updateId, setUpdateId] = useState<string | null>(null);
  const { writeReCommentMutation, deleteReCommentMutation, updateReCommentMutation } = useMutate();
  const { id } = useParams();
  const userId = useLoginUserId();

  const { data: reCommentData } = useQuery(['reComment', parentCommentId], () => getReCommentData(parentCommentId));

  //댓글 삭제 버튼
  const deleteReCommentButton = (id: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteReCommentMutation.mutate(id);
    } else {
      alert('삭제가 취소되었습니다.');
    }
  };

  const writeReCommentButton = () => {
    const newReComment = {
      comment: reComment,
      parent_commentId: parentCommentId,
      postId: id,
      userId
    };
    if (!userId) {
      alert('로그인 후 이용해 주세요.');
      return;
    }
    if(reComment.trim()===''){
      alert('댓글을 작성해 주세요.')
      return;
    }
    writeReCommentMutation.mutate(newReComment);
    setReComment('');
  };

  const updateReCommentButton = (id: string) => {
    const newComment = {
      id,
      comment: updateComment
    };
    updateReCommentMutation.mutate(newComment);
    setUpdateToggle(false);
  };

  const updateOpenButton = (id: string, comment: string) => {
    setUpdateComment(comment);
    setUpdateToggle(true);
    setUpdateId(id);
  };

  const openReComment = () => {
    setIsReCommentToggle(!isReCommentToggle);
  };

  const openReCommentInput = () => {
    setIsReCommentInputToggle(!isReCommentInputToggle);
  };

  const noetime = new Date().getTime()
  console.log(noetime)

  return (
    <>
      <>
        <button onClick={openReCommentInput}>답글</button>
        {reCommentData?.length !== 0 ? (
          <ReCommentToggle onClick={openReComment}>{reCommentData?.length}개의 답글보기</ReCommentToggle>
        ) : (
          ''
        )}
        {isReCommentInputToggle && (
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
        )}

        {isReCommentToggle && (
          <ReCommentWrap>
            {reCommentData?.map((item) => {
              return (
                <div key={item.id} className="reCommentInner">
                  <div className="recommentInfo">
                      <div className="userInfo">
                        <img src={item.users?.profileImg}></img>
                        <h1>{item.users?.nickname}</h1>
                        <CreatedAt createdAt={item.created_at}/>
                      </div>
                    <div>
                      <ReCommentLikes commentId={item.id} />
                    </div>
                  </div>
                  {updateToggle && item.id === updateId ? (
                    <div>
                      <input
                        // ref={updateInputRef}
                        type="text"
                        value={updateComment}
                        onChange={(e) => {
                          setUpdateComment(e.target.value);
                        }}
                      ></input>
                      <button onClick={() => updateReCommentButton(item.id)}>수정</button>
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
                    <h2>{item.comment}</h2>
                  )}
                  {userId && item.userId === userId && (
                    <div>
                      <button onClick={() => updateOpenButton(item.id, item.comment)}>수정</button>
                      <button onClick={() => deleteReCommentButton(item.id)}>삭제</button>
                    </div>
                  )}
                </div>
              );
            })}
          </ReCommentWrap>
        )}
      </>
    </>
  );
};

export default ReComment;
