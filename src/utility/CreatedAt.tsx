import React from 'react';

interface CreatedAtProps {
  createdAt: string;
}

const CreatedAt = ({ createdAt }: CreatedAtProps) => {
  let createdAtMilli = new Date(createdAt).getTime();
  let nowTimeStamp = new Date().getTime();
  let timeDifference = Math.floor((nowTimeStamp - createdAtMilli) / 1000 / 60);
  console.log('렌더링')

  const formatTimeDifference = (timeDifference: number) => {
    if (timeDifference < 1) {
      return '방금 전';
    } else if (timeDifference < 60) {
      const minutes = Math.floor(timeDifference);
      return `${minutes}분 전`;
    } else if (timeDifference < 1440) {
      const hours = Math.floor(timeDifference / 60);
      return `${hours}시간 전`;
    } else if (timeDifference < 10080) {
      const days = Math.floor(timeDifference / 60 / 24);
      return `${days}일 전`;
    } else if (timeDifference < 43200) {
      const weeks = Math.floor(timeDifference / 60 / 24 / 7);
      return `${weeks}주 전`;
    } else if (timeDifference < 525600) {
      const months = Math.floor(timeDifference / 60 / 24 / 30);
      return `${months}달 전`;
    } else {
      const years = Math.floor(timeDifference / 60 / 24 / 365);
      return `${years}년 전`;
    }
  };

  return <>{formatTimeDifference(timeDifference)}</>;
};

export default React.memo(CreatedAt);
