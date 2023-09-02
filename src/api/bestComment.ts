interface BestComment {
  commentId: { comment: string; created_at: string; id: string; postId: string; userId: string };
  userId: { nickname: string };
}

export const findMostCommonId = (data: BestComment[]): BestComment => {
  // id를 세기 위한 Map 생성
  const idCountMap = new Map<string, number>();

  // 배열을 순회하면서 id를 카운트
  data.forEach((comment) => {
    const id = comment.commentId.id;
    const count = idCountMap.get(id) || 0;
    idCountMap.set(id, count + 1);
  });

  // 가장 많이 나온 id 찾기
  let mostCommonIds: string[] = [];
  let maxCount = 0;

  for (const [id, count] of idCountMap.entries()) {
    if (count > maxCount) {
      mostCommonIds = [id];
      maxCount = count;
    } else if (count === maxCount) {
      mostCommonIds.push(id);
    }
  }

  const firstDataWithMostCommonId = data.find((comment) => comment.commentId.id === mostCommonIds[0]);

  return firstDataWithMostCommonId!;
};
