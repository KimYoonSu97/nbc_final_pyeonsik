import React, { useState } from 'react';
import styled from 'styled-components';
import { Tag } from 'src/types/types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { TagImageProps } from 'src/types/types';
import { ReactComponent as TagIcon } from 'src/components/ImageTag/svg/TagIcon.svg';
const TagImage: React.FC<TagImageProps> = ({ imageUrl, recipeBody, tagsForImage }) => {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [isMouseOverImage, setIsMouseOverImage] = useState(false);
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(null);
  const handleTagClick = (tag: Tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };
  const handleProductMouseEnter = (index: number) => {
    setHoveredProductIndex(index);
  };
  const handleProductMouseLeave = () => {
    setHoveredProductIndex(null);
  };
  return (
    <S.ImageContainer>
      <div onMouseEnter={() => setIsMouseOverImage(true)} onMouseLeave={() => setIsMouseOverImage(false)}>
        <S.Image src={imageUrl} alt={imageUrl} />
        {tagsForImage.map((tag, tagIndex) => (
          <S.TagContainer
            key={tagIndex}
            style={{
              left: tag.x * 2.194,
              top: tag.y * 0.94
            }}
            onClick={() => handleTagClick(tag)}
          >
            {isMouseOverImage && (
              <S.TagIconContainer>
                <TagIcon />
              </S.TagIconContainer>
            )}
            {selectedTag === tag && (
              <S.TagDataContainer>
                <S.TagImage src={tag.img} alt="상품 이미지" />
                <S.DataContainer>
                  <S.ProdBrandContainer>{tag.prodBrand}</S.ProdBrandContainer>
                  <S.ProdContainer>{tag.prodData}</S.ProdContainer>
                </S.DataContainer>
              </S.TagDataContainer>
            )}
          </S.TagContainer>
        ))}
      </div>
      <div style={{ width: '790px' }}>
        <Carousel showThumbs={false} showArrows={true} showStatus={false} centerMode={true} centerSlidePercentage={25}>
          {tagsForImage.map((tag, tagIndex) => (
            <S.ProductWrapper
              key={tagIndex}
              onMouseEnter={() => handleProductMouseEnter(tagIndex)}
              onMouseLeave={handleProductMouseLeave}
            >
              <S.ProductImage src={tag.img} alt="상품 이미지" />
              {hoveredProductIndex === tagIndex && <S.ProdDataOverlay>{tag.prodData}</S.ProdDataOverlay>}
            </S.ProductWrapper>
          ))}
        </Carousel>
      </div>
      {recipeBody && (
        <S.recipeBody
          dangerouslySetInnerHTML={{
            __html: recipeBody.replace(/\n/g, '<br>')
          }}
        />
      )}
    </S.ImageContainer>
  );
};
export default TagImage;
const S = {
  ImageContainer: styled.div`
    position: relative;
    margin-bottom: 30px;
  `,
  ProductImageContainer: styled.div`
    width: 790px;
    height: 210px;
    display: flex;
    align-items: center;
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
  `,
  TagContainer: styled.div`
    position: absolute;
  `,
  TagImage: styled.img`
    width: 80px;
    height: 80px;
  `,
  TagIconContainer: styled.div`
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  TagDataContainer: styled.div`
    margin-top: 10px;
    z-index: 2;
    position: absolute;
    left: -160px;
    width: 356px;
    height: 100px;
    background-color: white;
    display: flex;
    padding: 8px;
    box-sizing: border-box;
  `,
  DataContainer: styled.div`
    margin-top: 25px;
    margin-left: 20px;
    display: flex;
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
    align-items: center;
    justify-content: center;
  `,
  ProductWrapper: styled.div`
    height: 200px;
    position: relative;
    display: flex;
    flex-direction: row;
  `,
  ProdDataOverlay: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  `
};
