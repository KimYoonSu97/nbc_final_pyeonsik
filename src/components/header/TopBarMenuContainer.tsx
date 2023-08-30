import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { loginModalAtom, userAtom } from 'src/globalState/jotai';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';
import baseImage from '../../images/baseprofile.jpeg';
import { Link, useLocation } from 'react-router-dom';
import { getUserData } from 'src/api/userLogin';
import useLoginUserId from 'src/hooks/useLoginUserId';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IconBell } from '../icons';

interface User {
  id: string;
  created_at?: string;
  email: string;
  nickname: string;
  profileImg: string;
}

const TopBarMenuContainer = () => {
  const location = useLocation();
  const [userLogin, setUserLogin] = useAtom(userAtom);
  const userId = useLoginUserId();
  const navigate = useNavigate();

  // 욕을 합니다 ***

  // 로그인 한 유저의 정보를 가져오는 쿼리
  // 아이디가 있어야함...
  const queryKey = userLogin?.id;
  const { data, isLoading, isError } = useQuery(
    ['loginUser'],
    () => {
      if (userId) {
        return getUserData(userId as string);
      } else {
        return getUserData(queryKey as string);
      }
    },
    {
      enabled: userLogin !== null || userId ? true : false,
      staleTime: Infinity
    }
  );

  //소셜로그인 검사함수
  const checkOrSetOAuthUser = async () => {
    const { data: checkLogin, error: checkLoginError } = await supabase.auth.getSession();
    if (checkLoginError) {
      return;
    }
    // 아이디값을 기준으로 조회해봄
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', checkLogin.session?.user.id)
      .maybeSingle();
    // 값이 있나요?
    if (data !== null) {
      setUserLogin(data);
    } else {
      // 값이 없나요?
      const social = localStorage.getItem('social');
      const socialData = checkLogin.session?.user.identities?.filter((item) => {
        if (item.provider === social) {
          return item.identity_data;
        }
      })[0].identity_data;
      console.log(socialData);
      const newUser = {
        email: socialData?.email,
        profileImg: socialData?.avatar_url,
        nickname: socialData?.full_name
      };
      const { data: loginUser, error: loginUserError } = await supabase.from('users').insert(newUser).select().single();
      if (error) {
        return;
      }
      setUserLogin(loginUser);
    }
  };

  //소셜로그인
  useEffect(() => {
    if (localStorage.getItem('social') && !data) {
      checkOrSetOAuthUser();
      console.log('헤더 이펙트 실행 했니?');
    }
    console.log('헤더 이펙트 실행');
  }, [localStorage.getItem('social')]);

  return (
    <S.TopBarMenuContainer>
      <S.QuickButtonArea>
        <S.QuickPostButton>나만의 편식조합 공유하기</S.QuickPostButton>
        <S.QuickPostButton>신제품 리뷰하기</S.QuickPostButton>
        <S.QuickPostButton onClick={() => navigate('/event')}>행사 제품</S.QuickPostButton>
      </S.QuickButtonArea>
      <S.TopBarLogContainer $logged={data ? true : false}>
        {/* 공통 */}
        {/* 로그인 전 */}
        {!data ? (
          <>
            <S.TopBarLogButton
              onClick={() => navigate('/login', { state: { backgroundLocation: location } })}
              $signIn={false}
            >
              로그인
            </S.TopBarLogButton>
            <S.TopBarLogButton onClick={() => navigate('/register')} $signIn={true}>
              회원가입
            </S.TopBarLogButton>
          </>
        ) : (
          // 로그인 후
          <>
            <S.Icon>
              <IconBell />
            </S.Icon>
            <S.Level>Lv. 식신</S.Level>
            {/* <p>Hello, {userData?.nickname}</p> */}

            <S.ProfileImg
              $url={data?.data?.profileImg}
              onClick={() => {
                navigate('/mypage/profile');
              }}
            />
          </>
        )}
      </S.TopBarLogContainer>
    </S.TopBarMenuContainer>
  );
};

export default TopBarMenuContainer;

interface Props {
  $signIn?: boolean;
}
interface ImageProps {
  $url?: string;
}

const S = {
  TopBarMenuContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    position: absolute;
    right: 16px;
  `,

  TopBarListContainer: styled.ul`
    display: flex;
  `,

  QuickButtonArea: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  QuickPostButton: styled.div`
    display: flex;
    align-items: center;
    border-radius: 100px;
    border: 1px solid var(--neutral-200, #e4e7ec);
    padding: 3px 18px;
    height: 34px;
    color: var(--font-black, var(--black, #242424));
    font-size: 14px;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
  `,

  TopBarMenu: styled.li`
    padding: 5px 13px;
    height: 30px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  TopBarLogContainer: styled.ul<{ $logged: boolean }>`
    display: flex;
    gap: ${(props) => (props.$logged ? '0px' : '12px')};
    align-items: center;
  `,

  TopBarLogButton: styled.li<Props>`
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 5px 15px;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    color: ${(props) => {
      if (props.$signIn) {
        return ' var(--white, #FFF)';
      } else {
        return 'var(--font-black, var(--black, #242424))';
      }
    }};

    background: ${(props) => {
      if (props.$signIn) {
        return 'var(--main, #F02826);';
      } else {
        return 'var(--neutral-200, #e4e7ec)';
      }
    }};
  `,

  Icon: styled.div`
    width: 20px;
    height: 20px;
    background-color: black;
  `,

  Level: styled.div`
    border-radius: 100px;
    /* width: 58px; */
    height: 20px;
    padding: 0px 9px 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    background: #d9d9d9;
    margin-left: 8px;
  `,
  ProfileImgArea: styled.div`
    position: fixed;
  `,
  ProfileTapMenu: styled.div`
    top: 0;
    right: calc((100vw - 1280px) / 2 + 16px);
    position: fixed;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  `,
  ProfileImg: styled.div<ImageProps>`
    position: relative;
    z-index: 9999;
    background-image: ${(props) => {
      return `url(${props.$url})`;
    }};
    background-size: contain;
    background-position: center;
    width: 36px;
    height: 36px;
    margin-left: 4px;

    border-radius: 100px;
  `
};
