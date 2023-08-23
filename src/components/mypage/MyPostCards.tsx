import React from 'react';
import { Post } from 'src/types/types';

interface Props {
  data: Post[];
}

const MyPostCards = ({ data }: Props) => {
  return (
    <>
      {data?.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </>
  );
};

export default MyPostCards;
