import React from 'react';
import { useNavigate } from 'react-router';
import { IconAdd, IconLogoSymbolH22, IconWaterMarkH22, IconBackSpace } from 'src/components/icons';
import { S } from './StyledHeaderArea';
import Confirm from 'src/components/popUp/Confirm';

const HeaderArea = () => {
  const navigate = useNavigate();

  const clickCancle = async () => {
    if (await Confirm('writePage')) {
      navigate(-1);
    }
  };

  const clickLogo = async () => {
    if (await Confirm('writePage')) {
      navigate('/');
    }
  };

  return (
    <S.WriteHeader>
      <S.WriteHeaderBox>
        <S.BackButton type="button" onClick={clickCancle}>
          <IconBackSpace />
          뒤로가기
        </S.BackButton>
        <S.LogoContainer onClick={clickLogo}>
          <IconLogoSymbolH22 />
          <IconWaterMarkH22 />
        </S.LogoContainer>
        <S.AddButton type="submit">
          공유하기
          <S.AddIcon>
            <IconAdd />
          </S.AddIcon>
        </S.AddButton>
      </S.WriteHeaderBox>
    </S.WriteHeader>
  );
};

export default HeaderArea;
