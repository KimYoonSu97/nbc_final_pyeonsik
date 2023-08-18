import React from "react";
import { styled } from "styled-components";
import TopBarMenuContainer from "./TopBarMenuContainer";

const Header = () => {
  return (
    <S.Area>
      <S.Container>
        <S.LogoContainer>LOGO</S.LogoContainer>

        <TopBarMenuContainer />
      </S.Container>
    </S.Area>
  );
};

export default Header;

const S = {
  Area: styled.div`
    background-color: royalblue;
  `,
  Container: styled.div`
    width: 1280px;
    height: 56px;
    margin: 0 auto;
    background-color: orange;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    position: relative;
  `,
  LogoContainer: styled.div`
    background-color: black;
    padding: 5px 13px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    position: absolute;
    left: 16px;
  `,
};
