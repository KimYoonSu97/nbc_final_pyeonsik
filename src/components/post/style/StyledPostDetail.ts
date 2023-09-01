import styled from 'styled-components';

export const S = {
  DtailArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* 김윤수가 추가함 삭제해야됨 */
    background-color: palegreen;
  `,

  PostHead: styled.div`
    background-color: transparent;

    width: 890px;
    height: 42px;
    margin-bottom: 23px;

    display: flex;
    position: relative;
  `,

  WriterContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  WriterImgBox: styled.div`
    width: 42px;
    height: 42px;
    margin-right: 8px;

    border-radius: 100px;
    overflow: hidden;
  `,

  WriterImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    transform: translateZ(0);
    backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
  `,

  WriterInfo: styled.div`
    font-style: normal;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    display: inline-flex;
    align-items: flex-start;
    margin-bottom: 6px;
    gap: 4px;
  `,

  WirterLevel: styled.div`
    background: #fff;
    height: 20px;
    padding: 0px 13px;
    border-radius: 100px;
    border: 1px solid var(--neutral-300, #d0d5dd);

    color: var(--font-black, var(--black, #242424));
    font-size: 12px;
    font-weight: 700;
    line-height: 16px; /* 133.333% */

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  WriterSir: styled.div`
    color: var(--neutral-500, #667085);
  `,

  PostDate: styled.div`
    color: var(--neutral-500, #667085);
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  `,

  WriterFunction: styled.div`
    width: 90px;
    height: 26px;
    margin: 8px 0px;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
  `,

  Contour: styled.div`
    background: var(--neutral-300, #d0d5dd);

    width: 1px;
    height: 12px;
    border-radius: 100px;
    margin: 0px 4.5px;
  `,

  WriterButton: styled.button`
    background-color: transparent;

    width: 40px;
    height: 26px;
    padding: 3px 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--neutral-500, #667085);
    text-align: center;
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
  `,

  PostTitle: styled.div`
    width: 790px;
    margin: 24px 0px 12px 0px;

    display: flex;
    align-items: center;

    color: var(--black, #242424);
    font-style: normal;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px; /* 127.273% */
  `,

  PostBodyCommon: styled.pre`
    width: 790px;
    margin: 10px 0px 10px 0px;

    font-family: 'inherit';
  `
};
