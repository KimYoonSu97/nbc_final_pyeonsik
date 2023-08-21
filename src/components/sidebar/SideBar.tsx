import React from 'react';
import NewReview from './NewReview';
import RealTimeCombo from './RealTimeCombo';
import FetchPosts from './FetchPosts';
import Fotter from './Fotter';

const SideBar = () => {
  return (
    <>
      <FetchPosts />
      <RealTimeCombo />
      <NewReview />
      <Fotter />
    </>
  );
};

export default SideBar;
