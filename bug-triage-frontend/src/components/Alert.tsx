import "./Alert.css";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  );
};

export default Alert;