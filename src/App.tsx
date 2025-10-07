import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TileButton from "./components/TileButton";
import PrimaryBtn from "./components/primaryBtn";

const NUM_ROWS = 5;
const NUM_COLS = 4;

type Tile = number | null;

function createShuffledPuzzle(): Tile[][] {
  const total = NUM_ROWS * NUM_COLS;
  //  deklarerar en variabel som kommer att hålla en enradig lista med brickor.
  let flatTiles: Tile[];

  do {
    flatTiles = Array.from({ length: total - 1 }, (_, i) => i + 1);
    flatTiles.push(null);

    for (let i = flatTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatTiles[i], flatTiles[j]] = [flatTiles[j], flatTiles[i]];
    }
  } while (!isSolvable(flatTiles));

  const puzzle: Tile[][] = [];
  for (let r = 0; r < NUM_ROWS; r++) {
    puzzle.push(flatTiles.slice(r * NUM_COLS, (r + 1) * NUM_COLS));
  }

  return puzzle;
}

function isSolvable(flatTiles: Tile[]): boolean {
  const tiles = flatTiles.filter((t) => t !== null) as number[];
  let inversions = 0;

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] > tiles[j]) inversions++;
    }
  }

  const emptyIndex = flatTiles.indexOf(null);
  const emptyRowFromBottom = NUM_ROWS - Math.floor(emptyIndex / NUM_COLS);

  if (NUM_COLS % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    if (emptyRowFromBottom % 2 === 0) {
      return inversions % 2 === 1;
    } else {
      return inversions % 2 === 0;
    }
  }
}

export default function App() {
  const [puzzle, setPuzzle] = useState<Tile[][]>([]);
  const [solved, setSolved] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    shuffle();
  }, []);

  function shuffle() {
    const newPuzzle = createShuffledPuzzle();
    setPuzzle(newPuzzle);
    setSolved(false);
    setMoveCount(0);
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", flexDirection: "column" }}
    >
      <h1 className="mb-4">N-pussel</h1>

      {puzzle.length === 0 ? (
        <p>Laddar pusslet...</p>
      ) : (
        <section
          className="d-inline-block border border-dark rounded p-3 bg-light"
          style={{
            maxWidth: "90vw",
          }}
        >
          <section
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {puzzle.map((row, rowIndex) =>
              row.map((tile, columnIndex) => (
                <TileButton key={`${rowIndex}-${columnIndex}`} tile={tile} />
              ))
            )}
          </section>
        </section>
      )}

      <section className="mt-4">
        <PrimaryBtn onClick={() => shuffle()}></PrimaryBtn>
      </section>

      <p className="mt-3">Antal drag: {moveCount}</p>

      {solved && (
        <h2 className="text-success mt-3">Vad kul! Du löste pusslet! 🎉</h2>
      )}
    </Container>
  );
}
