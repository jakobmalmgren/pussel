// sätter Tile till number eller null (den tomma rutan)

export type Tile = number | null;

export interface Position {
  row: number;
  col: number;
}

export interface TileButtonProps {
  tile: Tile;
  onClick: () => void;
}
