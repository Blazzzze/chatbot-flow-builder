import React from 'react';

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => (
  <div style={{ position: 'fixed', top: 10, right: 10 }}>
    <button
      style={{
        padding: '8px 16px',
        border: '1px solid #005',
        borderRadius: 4,
        background: 'white',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      Save Changes
    </button>
  </div>
);

export default SaveButton;