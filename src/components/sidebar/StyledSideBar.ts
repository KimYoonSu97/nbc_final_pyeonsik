import styled from 'styled-components';
import { RankProps } from 'src/types/types';

export const RealTimeContainer = styled.div`
  margin-left: 1500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const NewReviewContainer = styled.div`
  margin-left: 1500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const PostContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 296px;
  height: 316px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PostCard = styled.div`
  display: flex;
  padding: 10px;
  width: 280px;
  height: 60px;
`;

export const Title = styled.h2`
  font-size: 14px;
  font-style: normal;
  width: 120px;
  margin-top: 12px;
  margin-left: 20px;
  font-weight: 700;
`;

export const Body = styled.p`
  color: #000;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
`;

export const HeadTitle = styled.h1`
  width: 296px;
  height: 26px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Rank = styled.div<RankProps>`
  width: 18px;
  height: 18px;
  margin-top: 14px;
  margin-right: 10px;
  background-color: ${({ isFirst }) => (isFirst ? 'gray' : 'white')};
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  color: ${({ isFirst }) => (isFirst ? '#gray' : 'black')};
`;

export const SideFotter = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 10px;
  width: 182px;
  cursor: pointer;
`;

export const FotterContainer = styled.div`
  margin-top: 30px;
  width: 296px;
  border-top: 1px solid black;
  margin-left: 1500px;
`;
