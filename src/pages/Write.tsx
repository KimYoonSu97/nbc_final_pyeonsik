import React from 'react';
import PostWriteCommon from 'src/components/post/PostWriteCommon';
import PostWriteRecipe from 'src/components/post/PostWriteRecipe';

const Write = () => {
  // orign post
  const orgPost = {
    id: '63b88458-7625-41f7-bd53-a7662dcf0718',
    created_at: '2023-08-28 03:36:49.512255+00',
    title: '인용할 거에요',
    body: <p>이거슨 어찌될 건가</p>,
    userId: { id: '4b337787-fbdd-4d0d-a2c6-a123169cb966', nickname: '123' }
  };

  return (
    <div>
      {/* <PostWriteCommon orgPostId={orgPost.id} orgUserId={orgPost.userId.id} /> */}
      {/* component 분리 필요 */}
      {/* {orgPost && (
        <div>
          인용 게시글
          <div>{orgPost.title}</div>
          <div>{orgPost.body}</div>
          <div>{orgPost.userId.nickname}</div>
          <div>{orgPost.created_at}</div>
        </div>
      )} */}
      {/*component 분리 필요 */}
      <PostWriteRecipe orgPostId={orgPost.id} orgUserId={orgPost.userId.id} />
    </div>
  );
};

export default Write;
