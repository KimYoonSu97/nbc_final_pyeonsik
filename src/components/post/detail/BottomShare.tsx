import React from 'react';
import { S } from './StyledBottomFunction';
import { IconLinkCopy, IconLinkFacebook, IconLinkKakao, IconLinkTwitter, IconUnLink } from 'src/components/icons';
import { useLocation } from 'react-router';

const BottomShare = () => {
  const { pathname } = useLocation();

  const shareUrl = 'nbc-final-pyeonsik-897l29vm7-kimyoonsu97.vercel.app/' + pathname;

  const clickFacebook = () => {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
  };

  const clickTwitter = () => {
    const shareText = '편식';
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`);
  };

  const clickKakao = () => {};

  const clickCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${shareUrl}`);
      alert('주소가 복사되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.FunctionLink>
      <IconUnLink />
      <S.LinkBubble className="dropDownLink">
        <S.LinkTail />
        <S.LinkTailFalse />
        <S.LinkBox>
          <S.LlinkButton className="linkFacebook" onClick={clickFacebook}>
            <IconLinkFacebook />
          </S.LlinkButton>
          <S.LlinkButton className="linkTwitter" onClick={clickTwitter}>
            <IconLinkTwitter />
          </S.LlinkButton>
          <S.LlinkButton className="linkKakao" onClick={clickKakao}>
            <IconLinkKakao />
          </S.LlinkButton>
          <S.LlinkButton onClick={clickCopyLink}>
            <IconLinkCopy />
          </S.LlinkButton>
        </S.LinkBox>
      </S.LinkBubble>
    </S.FunctionLink>
  );
};

export default BottomShare;
