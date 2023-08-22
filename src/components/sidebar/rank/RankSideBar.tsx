import React from 'react';
import RealTimeCombo from './RealTimeCombo';
import NewReview from './NewReview';
import FetchPosts from '../FetchPosts';
import styled from 'styled-components';

const RankSideBar = () => {
  return (
    <S.Container>
      <FetchPosts />
      <RealTimeCombo />
      <NewReview />
    </S.Container>
  );
};

export default RankSideBar;

const S = {
  Container: styled.div`
    position: fixed;
    right: calc(((100vw - 1280px) / 2) + 16px);
  `
};
