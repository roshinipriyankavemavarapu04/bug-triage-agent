import "./Button.css";
import Spinner from "./Spinner";

interface ButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button = ({
  title,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      className="primary-btn"
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? <Spinner /> : title}
    </button>
  );
};

export default Button;