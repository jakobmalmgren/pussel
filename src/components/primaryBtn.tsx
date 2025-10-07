import { Button } from "react-bootstrap";
import "../styles/primaryBtn.css";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  onClick: () => void;
  children?: ReactNode;
}

export default function PrimaryBtn({ onClick, children }: PrimaryButtonProps) {
  return (
    <Button onClick={onClick} className="primary-btn">
      {children}
    </Button>
  );
}
