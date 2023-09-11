import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import React from 'react';
import { myPageHover } from 'src/globalState/jotai';
import styled from 'styled-components';
import MypageSideBarButtonTab from '../sidebar/mypage/MypageSideBarButtonTab';

const MyPageHover = () => {
  const [myPage, setMyPageHover] = useAtom(myPageHover);

  return (
    <>
      {myPage && (
        <AnimatePresence>
          <S.Area>
            <S.Container>
              <MypageSideBarButtonTab />
            </S.Container>
          </S.Area>
          <S.Background
            onMouseOver={() => {
              setMyPageHover(false);
            }}
          />
        </AnimatePresence>
      )}
    </>
  );
};

export default MyPageHover;

const S = {
  Area: styled.div`
    position: fixed;
    z-index: 100;
    right: calc(((100vw - 1280px) / 2) + 16px);
    top: 10px;
    width: 190px;
    height: 246px;
  `,
  Container: styled(motion.div)`
    position: fixed;
    z-index: 100;
    right: calc(((100vw - 1280px) / 2) + 16px);
    top: 54px;

    width: 190px;
    backdrop-filter: blur(25px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    &::after {
      content: '';
      position: absolute;
      top: -10px;
      right: 10px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 10px solid white;
    }
  `,
  Background: styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
  `
};
