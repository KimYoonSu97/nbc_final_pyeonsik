interface ConfirmModalTextResult {
  title: string;
  caption: string;
  true: string;
  false: string;
}

const postDelete = {
  title: '정말로 삭제할까요?',
  caption: '삭제하면 게시글 및 댓글이 \n 모두 삭제되어 복구할 수 없어요. \n 그래도 삭제할까요?',
  true: '삭제하기',
  false: '취소하기'
};
const writePage = {
  title: '정말로 페이지를 이동할까요?',
  caption: '페이지를 이동하면 \n 작성 중인 내용이 모두 날라가요. \n 그래도 이동할까요?',
  true: '이동하기',
  false: '취소하기'
};
const userDelete = {
  title: '정말로 탈퇴할까요?',
  caption: '탈퇴하면 그동안 편식에 작성한\n게시글 및 댓글이 모두 삭제되어 복구할 수 없어요.\n그래도 탈퇴할까요?',
  true: '탈퇴하기',
  false: '취소하기'
};

const postWrite = {
  title: '게시글을 공유하시겠어요?',
  caption: '현재까지 입력한 내용이 올라가요!',
  true: '공유하기',
  false: '취소하기'
};

export const confirmModalText = (type: string): ConfirmModalTextResult => {
  let result: ConfirmModalTextResult;
  if (type === 'postDelete') {
    result = postDelete;
  } else if (type === 'writePage') {
    result = writePage;
  } else if (type === 'userDelete') {
    result = userDelete;
  } else if (type === 'postWrite') {
    result = postWrite;
  }
  return result!;
};
