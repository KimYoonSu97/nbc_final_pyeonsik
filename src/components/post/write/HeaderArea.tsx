import React from 'react';
import { useNavigate } from 'react-router';
import { IconAdd, IconLogoSymbolH22, IconWaterMarkH22 } from 'src/components/icons';
import { S } from './StyledHeaderArea';

const HeaderArea = () => {
  const navigate = useNavigate();

  const clickLogo = () => {
    navigate(`/`);
  };

  return (
    <S.WriteHeader>
      <S.WriteHeaderBox>
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
