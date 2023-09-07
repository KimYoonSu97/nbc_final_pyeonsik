import React, { useRef } from 'react';
import { IconSelect } from 'src/components/icons';
import { S } from './StyledTitleArea';
import { useParams } from 'react-router';

export interface TitleAreaProps {
  category: string;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleArea = ({ category, setCategory, title, setTitle }: TitleAreaProps) => {
  const parms = useParams();
  const postRef = useRef<HTMLInputElement>(null);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const clickCategory = () => {
    setCategory && (category !== 'common' ? setCategory('common') : setCategory('recipe'));
  };

  return (
    <S.TitleBox>
      <S.CategoryText>{category === 'common' ? '그르르갉' : '편식조합'}</S.CategoryText>
      <S.Contour />
      <S.Title
        ref={postRef}
        type="text"
        name="title"
        placeholder="제목을 입력해 주세요."
        value={title || ''}
        onChange={changeTitle}
        autoFocus
      />
      {!parms.id && (
        <S.SelectCategory>
          <S.SelectIcon>
            <IconSelect />
          </S.SelectIcon>
          <S.SelectText type="button" onClick={clickCategory}>
            {category !== 'common' ? '그르르갉' : '편식조합'}
          </S.SelectText>
        </S.SelectCategory>
      )}
    </S.TitleBox>
  );
};

export default TitleArea;
