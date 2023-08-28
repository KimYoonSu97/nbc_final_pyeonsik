import React, { useState } from 'react';
import styled from 'styled-components';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  termsContent: string;
}

const TermsModalComponent: React.FC<TermsModalProps> = ({ isOpen, onClose, termsContent }) => {
  if (!isOpen) return null;

  return (
    <TermsModal>
      <ModalContent>
        {/* 이용약관 내용 */}
        <p>{termsContent}</p>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </TermsModal>
  );
};

const TermsAndConditions: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [terms1ModalOpen, setTerms1ModalOpen] = useState(false);
  const [terms2ModalOpen, setTerms2ModalOpen] = useState(false);
  const [terms1Agreed, setTerms1Agreed] = useState(false);
  const [terms2Agreed, setTerms2Agreed] = useState(false);

  const terms1Content = '이용약관 1 내용을 여기에 작성하세요.';
  const terms2Content = '이용약관 2 내용을 여기에 작성하세요.';

  const toggleAllAgree = () => {
    if (terms1Agreed && terms2Agreed) {
      setTerms1Agreed(false);
      setTerms2Agreed(false);
    } else {
      setTerms1Agreed(true);
      setTerms2Agreed(true);
    }
  };

  const allAgreed = terms1Agreed && terms2Agreed;

  return (
    <div>
      <label>
        <AllAgreeLabel>
          <TermsCheckbox type="checkbox" checked={allAgreed} onChange={toggleAllAgree} />
          전체 동의합니다.
        </AllAgreeLabel>
        <br />
        <TermsCheckbox type="checkbox" checked={terms1Agreed} onChange={() => setTerms1Agreed(!terms1Agreed)} />
        이용약관 1에 동의합니다.
        <button onClick={() => setTerms1ModalOpen(true)}>보기</button>
        <TermsModalComponent
          isOpen={terms1ModalOpen}
          onClose={() => setTerms1ModalOpen(false)}
          termsContent={terms1Content}
        />
      </label>
      <br />
      <label>
        <TermsCheckbox type="checkbox" checked={terms2Agreed} onChange={() => setTerms2Agreed(!terms2Agreed)} />
        이용약관 2에 동의합니다.
        <button onClick={() => setTerms2ModalOpen(true)}>보기</button>
        <TermsModalComponent
          isOpen={terms2ModalOpen}
          onClose={() => setTerms2ModalOpen(false)}
          termsContent={terms2Content}
        />
      </label>
      <br />
    </div>
  );
};

export default TermsAndConditions;

const TermsCheckbox = styled.input`
  /* 체크박스 스타일링 */
  margin-right: 8px;
`;

const ModalButton = styled.button`
  /* 모달 버튼 스타일링 */
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
`;

const TermsModal = styled.div`
  /* 모달 배경 스타일링 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  /* 모달 내용 스타일링 */
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AllAgreeLabel = styled.label`
  /* 모달 내용 스타일링 */
  background-color: white;

  font-weight: bold;
`;
