import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean; // Changed from 'full: string'
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-200 text-purple-600 hover:bg-purple-300",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center justify-center transition-colors";

export function Button({ variant, text, startIcon, onClick, fullWidth }: ButtonProps) {
  return (
    <button 
      className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : "w-auto"}`} 
      onClick={onClick}
    >
      {/* Only render the icon container if an icon exists */}
      {startIcon && (
        <div className="flex items-center pr-2">
          {startIcon}
        </div>
      )}
      
      <span>{text}</span>
    </button>
  );
}