import React from 'react';
import { useNavigate } from 'react-router';
import { IconAdd, IconLogoSymbolH22, IconWaterMarkH22 } from 'src/components/icons';
import { S } from './StyledHeaderArea';

const HeaderArea = () => {
  const navigate = useNavigate();

  const clickCancle = () => {
    if (window.confirm('작성 중이던 내용이 저장되지 않습니다. 뒤로 가기를 하시겠습니까?')) {
      navigate(-1);
    }
  };

  const clickLogo = () => {
    navigate(`/`);
  };

  return (
    <S.WriteHeader>
      <S.WriteHeaderBox>
        <button type="button" onClick={clickCancle}>
          cancle
        </button>
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
