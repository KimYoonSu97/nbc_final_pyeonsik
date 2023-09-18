interface BestComment {
  commentId: { comment: string; created_at: string; id: string; postId: string; userId: string };
  userId: { nickname: string };
}

export const findMostCommonId = (data: BestComment[]): BestComment => {
  const idCountMap = new Map<string, number>();

  data.forEach((comment) => {
    const id = comment.commentId.id;
    const count = idCountMap.get(id) || 0;
    idCountMap.set(id, count + 1);
  });

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
