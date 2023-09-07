import styled from 'styled-components';
import { FlexBox, FlexBoxAlignCenter, FlexBoxColumn } from 'src/styles/styleBox';

export const S = {
  ImageContainer: styled.div`
    position: relative;
    margin-bottom: 30px;
  `,
  ProductImageContainer: styled(FlexBoxAlignCenter)`
    width: 790px;
    height: 210px;
    justify-content: flex-start;
  `,
  ProductImage: styled.img`
    width: 200px;
    height: 200px;
    margin-right: 20px;
  `,
  // 렌더링되는 이미지 사이즈도줄임.
  Image: styled.img`
    width: 790px;
    height: 600px;
    border-radius: 10px;
    object-fit: cover;
  `,
  recipeBody: styled.div`
    width: 790px;
    color: var(--font-black, var(--Black, #242424));

    /* body-게시글 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
  `,
  TagContainer: styled.div`
    position: absolute;
  `,
  TagImage: styled.img`
    width: 80px;
    height: 80px;
  `,
  TagIconContainer: styled(FlexBoxColumn)`
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
  `,
  TagDataContainer: styled(FlexBox)`
    margin-top: 10px;
    z-index: 2;
    position: absolute;
    left: -160px;
    width: 356px;
    height: 100px;
    background-color: white;
    padding: 8px;
    box-sizing: border-box;
  `,
  DataContainer: styled(FlexBox)`
    margin-top: 25px;
    margin-left: 20px;
    flex-direction: column;
  `,
  ProdContainer: styled.div`
    width: 246px;
    font-size: 16px;
    height: 50px;
  `,
  ProdBrandContainer: styled.div`
    width: 113px;
    margin-bottom: 5px;
    font-size: 14px;
    height: 20px;
    /* align-items: center; */
    /* justify-content: center; */
  `,
  ProductWrapper: styled(FlexBox)`
    height: 200px;
    position: relative;
    flex-direction: row;
  `,
  ProdDataOverlay: styled(FlexBoxColumn)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
  `
};
