import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconBadgeSmall, IconLogOut, IconMyPostBox, IconProfile } from 'src/components/icons';
import { userAtom } from 'src/globalState/jotai';
import { useAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import supabase from 'src/lib/supabaseClient';
import { toast } from 'react-toastify';
import { FlexBoxCenter } from 'src/styles/styleBox';

const MypageSideBarButtonTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useAtom(userAtom);
  const queryClient = useQueryClient();

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();

    window.location.reload();
    setUserLogin(null);
    navigate('/');

    localStorage.removeItem('sb-wwkfivwrtwucsiwsnisz-auth-token');
    localStorage.removeItem('social');
    queryClient.removeQueries(['loginUser']);
    queryClient.resetQueries(['loginUser']);
    toast('로그아웃 완료!');
  };

  return (
    <S.Container>
      <S.TapButton to={'mypage/profile'} $type={'/mypage/profile'} $location={location.pathname}>
        <S.Icon>
          <IconProfile />
        </S.Icon>
        프로필
      </S.TapButton>
      <S.TapButton to={'mypage/mypost?=mypost'} $type={'/mypage/mypost'} $location={location.pathname}>
        <S.Icon>
          <IconMyPostBox />
        </S.Icon>
        보관함
      </S.TapButton>
      <S.TapButton to={'mypage/achievement'} $type={'/mypage/achievement'} $location={location.pathname}>
        <S.Icon>
          <IconBadgeSmall />
        </S.Icon>
        편식 업적
      </S.TapButton>
      <S.LogoutButton $type={'none'} $location={location.pathname} onClick={signOutHandler}>
        <S.Icon>
          <IconLogOut />
        </S.Icon>
        로그아웃
      </S.LogoutButton>
    </S.Container>
  );
};

export default MypageSideBarButtonTab;

type Props = {
  $location: string;
  $type: string;
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 10px;
  `,

  Icon: styled(FlexBoxCenter)`
    width: 20px;
    height: 20px;
    margin-right: 4px;
    fill: red;
  `,
  LogoutButton: styled.div<Props>`
    cursor: pointer;

    display: flex;
    align-items: center;
    padding: 10px 12px;
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    border-radius: 10px;
    text-decoration: none;
    color: ${(props) => (props.$type === props.$location ? 'black' : 'var(--neutral-500, #667085)')};

    ${(props) =>
      props.$type === props.$location &&
      css`
        background-color: #efefef;
      `}
    &:hover {
      color: var(--font-black, var(--Black, #242424));
      background-color: var(--neutral-100, #f2f4f7);
      svg {
        fill: var(--font-black, var(--Black, #242424));
      }
    }
  `,
  TapButton: styled(Link)<Props>`
    display: flex;
    align-items: center;
    padding: 10px 12px;
    border-radius: 10px;
    text-decoration: none;
    color: ${(props) =>
      props.$type === props.$location ? 'var(--font-black, var(--Black, #242424))' : 'var(--neutral-500, #667085)'};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;

    svg {
      fill: var(--neutral-500, #667085);
    }
    ${(props) =>
      props.$type === props.$location &&
      css`
        background-color: var(--neutral-100, #f2f4f7);
        svg {
          fill: var(--font-black, var(--Black, #242424));
        }
      `}
    &:hover {
      color: var(--font-black, var(--Black, #242424));
      background-color: var(--neutral-100, #f2f4f7);
      svg {
        fill: var(--font-black, var(--Black, #242424));
      }
    }
  `
};
