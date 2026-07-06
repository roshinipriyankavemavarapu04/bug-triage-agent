import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "./InputField.css";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    if (type === "email") return <FaEnvelope />;
    if (type === "password") return <FaLock />;
    return <FaUser />;
  };

  return (
    <div className="input-group">
      <label>{label}</label>

      <div className="input-wrapper">

        <span className="left-icon">
          {getIcon()}
        </span>

        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {type === "password" && (
          <span
            className="right-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </span>
        )}

      </div>
    </div>
  );
};

export default InputField;