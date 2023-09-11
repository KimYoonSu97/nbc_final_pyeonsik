import React from 'react';

interface TagModalProps {
  isOpen: boolean;
}

const TagModal: React.FC<TagModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <p>버튼을 누르고 원하는 위치에 클릭해 주세요.</p>
      </div>
    </div>
  );
};

export default TagModal;
