import React from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import useLoginUserId from 'src/hooks/useLoginUserId';
import supabase from 'src/lib/supabaseClient';
import { styled } from 'styled-components';
import { FlexBoxColumn } from 'src/styles/styleBox';
import { deleteUser } from 'src/api/userLogin';
import Confirm from '../popUp/Confirm';

const UserDelete = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useLoginUserId();

  const [_, setUserLogin] = useAtom(userAtom);

  const clickWithdraw = async () => {
    if (await Confirm('userDelete')) {
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
      await deleteUser(userId);

      // logout
      const { error: singOutError } = await supabase.auth.signOut();
      if (deleteError || singOutError) {
        alert('죄송합니다. 고객 센터로 문의 주시기 바랍니다.');
        return;
      }
      setUserLogin(null);
      navigate('/');

      localStorage.removeItem('social');
      queryClient.removeQueries(['loginUser']);
      queryClient.resetQueries(['loginUser']);
    }
  };

  return <S.WithdrawButton onClick={clickWithdraw}>탈퇴하기</S.WithdrawButton>;
};

export default UserDelete;

const S = {
  WithdrawButton: styled(FlexBoxColumn)`
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
