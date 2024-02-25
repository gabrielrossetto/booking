import { PrimaryButton as PrimaryButtonType } from "../../types/primarybutton";

const PrimaryButton = ({ text, onClick, className }: PrimaryButtonType) => {
  return (
    <button
      onClick={onClick}
      className={`w-40 h-12 text-white transition duration-300 border rounded-lg bg-primary border-primary hover:bg-primary-dark ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;