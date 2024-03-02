import styled from 'styled-components';

export const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  margin-bottom: 16px;
  letter-spacing: -1.5px;
`;
export const Option = styled.p`
  width: 310px;
  border: 1px solid #ced4da;
  background-color: #fff;
  border-radius: 5px;
  padding: 11px 0px 11px 12px;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;
export const ReportButton = styled.button`
  width: 210px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  border-radius: 5px;
  background-color: #ced4da;
  color: #fff;
`;
