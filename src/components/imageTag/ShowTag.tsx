import React, { CSSProperties, useState } from 'react';

import { Tag, TagImageProps } from 'src/types/types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ReactComponent as TagIcon } from 'src/components/imageTag/svg/TagIcon.svg';
import { S } from './StyledShowTag';
import { IconArrow, IconUnArrow } from '../icons';
import { setBrandName } from 'src/function/setBrandName';

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
              left: tag.x * 2.1944 - 20,
              top: tag.y * 2.1944 - 20
            }}
            onClick={() => handleTagClick(tag)}
          >
            <S.TagIconContainer>
              <TagIcon />
            </S.TagIconContainer>
            {selectedTag === tag && (
              <>
                <S.LinkTail />
                <S.TagDataContainer>
                  <S.LinkTailFalse />
                  <S.TagImage src={tag.img} alt="상품 사진" />
                  <S.DataContainer>
                    <S.ProdBrandContainer>{setBrandName(tag.prodBrand!)}</S.ProdBrandContainer>
                    <S.ProdContainer>{tag.prodData}</S.ProdContainer>
                  </S.DataContainer>
                </S.TagDataContainer>
              </>
            )}
          </S.TagContainer>
        ))}
      </div>
      <S.CaroudelContainer>
        <Carousel
          centerMode={true}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          centerSlidePercentage={26.9541779}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <S.ArrowButton type="button" onClick={onClickHandler} title={label} style={{ left: 15 }}>
                <IconUnArrow />
              </S.ArrowButton>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <S.ArrowButton type="button" onClick={onClickHandler} title={label} style={{ right: 15 }}>
                <IconArrow />
              </S.ArrowButton>
            )
          }
        >
          {tagsForImage?.map((tag, tagIndex) => (
            <S.ProductWrapper
              key={tagIndex}
              onMouseEnter={() => handleProductMouseEnter(tagIndex)}
              onMouseLeave={handleProductMouseLeave}
            >
              <S.ProductImage src={tag.img} alt="상품 사진" />
              {hoveredProductIndex === tagIndex && (
                <S.ProdDataOverlay>
                  <S.ProdDataText>{tag.prodData}</S.ProdDataText>
                </S.ProdDataOverlay>
              )}
            </S.ProductWrapper>
          ))}
        </Carousel>
      </S.CaroudelContainer>
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

export const withCustomStatusArrowsAndIndicators = () => {
  const arrowStyles: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer'
  };

  const indicatorStyles: CSSProperties = {
    background: '#fff',
    width: 8,
    height: 8,
    display: 'inline-block',
    margin: '0 8px'
  };

  return (
    <Carousel
      statusFormatter={(current, total) => `Current slide: ${current} / Total: ${total}`}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
            -
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
            +
          </button>
        )
      }
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <li
              style={{ ...indicatorStyles, background: '#000' }}
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            />
          );
        }
        return (
          <li
            style={indicatorStyles}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          />
        );
      }}
    ></Carousel>
  );
};
