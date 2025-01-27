import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  isHovered,
  setIsHovered,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="btn btn-primary"
      style={{
        backgroundColor: isHovered
          ? "rgba(32, 43, 163, 0.9)"
          : "rgba(32, 18, 74, 0.84)",
      }}
      aria-label={label}
    >
      {label}
    </button>
  );
};
