// components/SubmitButton.tsx
import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, text, className }) => {
  return (
    <button
      className={className || 'submit-button'}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
