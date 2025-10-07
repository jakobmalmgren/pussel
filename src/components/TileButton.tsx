import { Button as BsButton } from "react-bootstrap";
import "../styles/TileButton.css";

interface TileButtonProps {
  tile: number | null;
}

export default function TileButton({ tile }: TileButtonProps) {
  return (
    <BsButton className="tile" variant={tile === null ? "light" : "dark"}>
      {tile ?? ""}
    </BsButton>
  );
}
