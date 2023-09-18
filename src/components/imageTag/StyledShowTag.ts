import styled from 'styled-components';
import { FlexBox, FlexBoxAlignCenter, FlexBoxCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';

export const S = {
  CaroudelContainer: styled.div`
    width: 790px;
    margin: 12px 0px 20px 0px;
  `,

  ImageContainer: styled.div`
    position: relative;
    margin-bottom: 30px;
  `,
  Image: styled.img`
    width: 790px;
    height: 790px;
    border-radius: 10px;
    object-fit: cover;
  `,

  TagContainer: styled.div`
    position: absolute;
    left: -20px;
  `,
  TagIconContainer: styled(FlexBoxCenter)`
    cursor: pointer;

    width: 40px;
    height: 40px;
    padding: 8px;
    border-radius: 100px;

    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  `,
  LinkTail: styled.div`
    margin: 15.9px 0px 0px 13px;
    width: 14px;
    height: 14px;

    transform: rotate(45deg);
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  `,
  LinkTailFalse: styled.div`
    position: absolute;
    margin: -100px 0px 0px 171px;
    width: 14px;
    height: 14px;

    transform: rotate(45deg);
    background: #fff;
  `,
  TagDataContainer: styled(FlexBoxAlignCenter)`
    position: absolute;
    margin: -7.9px 0px 0px -158px;
    width: 356px;
    height: 100px;
    border-radius: 10px;

    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
    z-index: 1;
  `,
  TagImage: styled.img`
    object-fit: contain;
    width: 81.6px;
    height: 81.6px;
    flex-shrink: 0;
    margin-left: 11.2px;
    padding: 5.712px;

    border-radius: 10px;
    border: 1px solid #efefef;
    background: url(<path-to-image>);
  `,
  DataContainer: styled.div`
    margin-top: 13px;
    margin-left: 5.2px;
  `,
  ProdBrandContainer: styled.div`
    margin-bottom: 4px;
    color: var(--neutral-500, #667085);
    ${styleFont.bodyMedium}
  `,
  ProdContainer: styled.div`
    vertical-align: middle;

    width: 246px;
    height: 50px;
    flex-shrink: 0;
    color: var(--font-black, var(--Black, #242424));
    ${styleFont.labelLarge}
  `,

  ProductWrapper: styled(FlexBoxCenter)`
    width: 200px;
    height: 200px;
    padding: 14px;
    border-radius: 10px;
    border: 2px solid #efefef;
    background: #fff;
    overflow: hidden;
  `,
  ProductImage: styled.img`
    object-fit: contain;
  `,
  ProdDataOverlay: styled(FlexBoxCenter)`
    position: absolute;

    width: 200px;
    height: 200px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 2px solid #efefef;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url(<path-to-image>);
  `,
  ProdDataText: styled.div`
    display: flex;
    width: 140px;
    height: 130px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    color: #fff;
    text-align: center;
    ${styleFont.titleMedium}
  `,
  ArrowButton: styled.button`
    width: 52px;
    height: 52px;
    padding: 10px;
    border-radius: 100px;

    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    box-shadow: -4px 0px 10px 0px #ced4da;

    top: calc(50% - 15px);
    z-index: 1;
  `,

  recipeBody: styled.div`
    width: 790px;
    flex-shrink: 0;
    color: var(--font-black, var(--Black, #242424));
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
  `
};
