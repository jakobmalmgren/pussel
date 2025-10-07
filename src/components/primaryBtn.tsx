import { Button } from "react-bootstrap";
import "../styles/primaryBtn.css";

interface PrimaryButtonProps {
  onClick: () => void;
}

export default function PrimaryBtn({ onClick }: PrimaryButtonProps) {
  return (
    <Button onClick={onClick} className="primary-btn">
      SLUMPA OM
    </Button>
  );
}
