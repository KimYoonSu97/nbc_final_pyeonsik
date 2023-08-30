import { styled } from 'styled-components';

export const CommentWriteWrap = styled.div`
  margin-bottom: 30px;
  form {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    position: relative;
    left: 0;
    top: 0;
    p {
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 49%;
      background-color: #efefef;
    }
    input {
      display: block;
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 10px;
      background-color: #efefef;
      outline: none;
    }
    ::placeholder {
      color: #8c8c8c;
    }
    button {
      position: absolute;
      right: 5px;
      top: 50%;
      margin-top: -13px;
      cursor: pointer;
      img {
        position: relative;
        right: 0;
        top: 0;
      }
    }
  }
`;

export const CommentWrap = styled.div``;

export const CommentInner = styled.div`
  margin: 12px 0px;
  .commentInfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      display: flex;
      align-items: center;
      gap: 5px;
    }
    img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    span{
      font-size: 13px;
      letter-spacing: -.5px;
      color: #777;
    }
    button{
      background: none;
    }
  }
  h1{
    
  }
  h2 {
    border: solid 1px #eee;
    padding: 10px 14px;
    background-color: #fff;
    border-radius: 6px;
    margin-left: 40px;
  }
  .fnButton{
    display: flex;
    justify-content: end;
    margin-left: 40px;
    button{
      position: relative; right: 0; top: 0;
      background: none;
      color: #98A2B3;
      &:first-child:after{
        display: block;
        content: "";
        width: 1px;
        height: 11px;
        position: absolute; right: -1px; top: 4px;
        background-color: #98A2B3;
      }
    }
  }
`;
export const ReCommentToggle = styled.button`
  background: none;
`

export const ReCommentWrap = styled.div`
  margin-left: 50px;
  .reCommentInner{
    margin-bottom: 15px;
  }
  .recommentInfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      display: flex;
      align-items: center;
      gap: 5px;
    }
    img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    h1{
      font-size: 14px;
    }
    span{
      font-size: 12px;
      letter-spacing: -.5px;
      color: #777;
    }
    button{
      background: none;
    }
  }
`
export const ReCommentWriteWrap = styled.div`
`

