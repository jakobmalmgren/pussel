import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TileButton from "./TileButton";
import PrimaryBtn from "./primaryBtn";
import type { Tile } from "../types/puzzleTypes";
import { NUM_COLS, NUM_ROWS } from "../config";
import { createShuffledPuzzle, isSolved, moveTile } from "../utils/puzzleUtils";

export default function BoardComponent() {
  // sätter states
  const [puzzle, setPuzzle] = useState<Tile[][]>([]);
  const [solved, setSolved] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  // shufflar brickorna varje gång när appen laddar (de är [] för,)
  useEffect(() => {
    shuffle();
  }, []);

  //shufflar funktion och sätter de olika staten
  function shuffle() {
    const newPuzzle = createShuffledPuzzle(NUM_ROWS, NUM_COLS);
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
                // skickar propsen och sen ser så de stämmer med interfacen i
                // TileButton
                <TileButton
                  key={`${rowIndex}-${columnIndex}`}
                  tile={tile}
                  onClick={() => {
                    const newPuzzle = moveTile(puzzle, rowIndex, columnIndex);
                    if (newPuzzle !== puzzle) {
                      setPuzzle(newPuzzle);
                      setSolved(isSolved(newPuzzle));
                      setMoveCount((prev) => prev + 1);
                    }
                  }}
                />
              ))
            )}
          </section>
        </section>
      )}
      <section className="mt-4">
        <PrimaryBtn onClick={() => shuffle()}></PrimaryBtn>
      </section>
      <p className="mt-3">Antal drag: {moveCount}</p>
      {/* om solved, rendera ut texten */}
      {solved && (
        <h2 className="text-success mt-3">Vad kul! Du löste pusslet!</h2>
      )}
      <h2 className="text-success mt-3">Vad kul! Du löste pusslet!</h2>
    </Container>
  );
}
