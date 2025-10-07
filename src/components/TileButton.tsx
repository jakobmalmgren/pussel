import { Button as BsButton } from "react-bootstrap";
import "../styles/TileButton.css";

interface TileButtonProps {
  tile: number | null;
  onClick: () => void;
}

export default function TileButton({ tile, onClick }: TileButtonProps) {
  return (
    <BsButton
      className="tile"
      variant={tile === null ? "light" : "dark"}
      onClick={onClick}
    >
      {tile ?? ""}
    </BsButton>
  );
}
