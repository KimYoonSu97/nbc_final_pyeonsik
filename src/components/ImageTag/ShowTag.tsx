import React, { useState } from 'react';

import { Tag, TagImageProps } from 'src/types/types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ReactComponent as TagIcon } from 'src/components/ImageTag/svg/TagIcon.svg';
import { S } from './StyledShowTag';

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
        {tagsForImage?.map((tag, tagIndex) => (
          <S.TagContainer
            key={tagIndex}
            style={{
              left: tag.x * 1.6667,
              top: tag.y * 1.6667
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
          {tagsForImage?.map((tag, tagIndex) => (
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
