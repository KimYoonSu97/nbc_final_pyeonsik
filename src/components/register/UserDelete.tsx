import React from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import useLoginUserId from 'src/hooks/useLoginUserId';
import useUserMutate from 'src/hooks/useUserMutate';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';
import { FlexBoxCenter } from 'src/styles/styleBox';

const UserDelete = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useLoginUserId();

  const [userLogin, setUserLogin] = useAtom(userAtom);
  const { deleteUserMutate } = useUserMutate();

  const clickWithdraw = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      console.log(userId);
      const { data, error: deleteError } = await supabase.auth.admin.deleteUser(userId);
      if (deleteError) {
        alert('죄송합니다. 고객 센터로 문의 주시기 바랍니다.');
      } else if (!deleteError) {
        alert('탈퇴가 완료되었습니다.');
        deleteUserMutate.mutate(userId);
        navigate('/');
        // signout
        const { error: singOutError } = await supabase.auth.signOut();
        singOutError && alert('로그아웃 부탁드립니다.');
        setUserLogin(null);
        if (location.pathname.split('/')[1] === 'mypage') {
          window.location.reload();
        }
        localStorage.removeItem('sb-wwkfivwrtwucsiwsnisz-auth-token');
        localStorage.removeItem('social');
        queryClient.removeQueries(['loginUser']);
        queryClient.resetQueries(['loginUser']);
      }
    }
  };
  // SQL: grant select on table auth.users to service_role;

  return <S.WithdrawButton onClick={clickWithdraw}>탈퇴하기</S.WithdrawButton>;
};

export default UserDelete;

const S = {
  WithdrawButton: styled(FlexBoxCenter)`
    cursor: pointer;
    width: 350px;
    height: 50px;
    padding: 13px 0px;
    border-radius: 10px;
    background: var(--neutral-300, #d0d5dd);

    color: var(--font-black, var(--Black, #242424));
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  `
};
