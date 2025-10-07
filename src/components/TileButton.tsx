import { Button as BsButton } from "react-bootstrap";
import "../styles/TileButton.css";
import type { TileButtonProps } from "../types/puzzleTypes";

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
