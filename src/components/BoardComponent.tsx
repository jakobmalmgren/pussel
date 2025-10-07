import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TileButton from "./TileButton";
import PrimaryBtn from "./primaryBtn";

// definerar rader och columner

const NUM_ROWS = 5;
const NUM_COLS = 4;

// sätter Tile till number eller null (den tomma rutan)
type Tile = number | null;

// en funktion som shufflar alla brickor och gör en do/while loop
// som gör de tills spelet är lösbart

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
// en funktion som checkar om man kan lösa spelet eller ej

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

// en funktion som checkar om pusslet är solved

function isSolved(puzzle: Tile[][]): boolean {
  let count = 1;
  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      if (r === NUM_ROWS - 1 && c === NUM_COLS - 1) {
        if (puzzle[r][c] !== null) return false;
      } else {
        if (puzzle[r][c] !== count) return false;
        count++;
      }
    }
  }
  return true;
}

export default function BoardComponent() {
  const [puzzle, setPuzzle] = useState<Tile[][]>([]);
  const [solved, setSolved] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  // shufflar brickorna varje gång när appen laddar (de är [] för,)
  useEffect(() => {
    shuffle();
  }, []);

  //shufflar funktion och sätter de olika staten
  function shuffle() {
    const newPuzzle = createShuffledPuzzle();
    setPuzzle(newPuzzle);
    setSolved(false);
    setMoveCount(0);
  }
  // funktion som går igenom hela pusslet och letar efter rutan med null
  // returnerar positionen som rad, kolumn

  function findEmpty(): [number, number] {
    for (let r = 0; r < NUM_ROWS; r++) {
      for (let c = 0; c < NUM_COLS; c++) {
        if (puzzle[r][c] === null) {
          return [r, c];
        }
      }
    }
    return [-1, -1];
  }
  // funktion för att röra brickorna

  function moveTile(row: number, col: number) {
    const [emptyRow, emptyCol] = findEmpty();
    let moved = false;

    if (row === emptyRow) {
      const newPuzzle = puzzle.map((r) => [...r]);
      if (col < emptyCol) {
        for (let c = emptyCol; c > col; c--) {
          newPuzzle[row][c] = newPuzzle[row][c - 1];
        }
        newPuzzle[row][col] = null;
        moved = true;
      } else if (col > emptyCol) {
        for (let c = emptyCol; c < col; c++) {
          newPuzzle[row][c] = newPuzzle[row][c + 1];
        }
        newPuzzle[row][col] = null;
        moved = true;
      }
      if (moved) {
        setPuzzle(newPuzzle);
        setSolved(isSolved(newPuzzle));
        setMoveCount((prev) => prev + 1);
      }
    } else if (col === emptyCol) {
      const newPuzzle = puzzle.map((r) => [...r]);
      if (row < emptyRow) {
        for (let r = emptyRow; r > row; r--) {
          newPuzzle[r][col] = newPuzzle[r - 1][col];
        }
        newPuzzle[row][col] = null;
        moved = true;
      } else if (row > emptyRow) {
        for (let r = emptyRow; r < row; r++) {
          newPuzzle[r][col] = newPuzzle[r + 1][col];
        }
        newPuzzle[row][col] = null;
        moved = true;
      }
      if (moved) {
        setPuzzle(newPuzzle);
        setSolved(isSolved(newPuzzle));
        setMoveCount((prev) => prev + 1);
      }
    }
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
                  onClick={() => moveTile(rowIndex, columnIndex)}
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
        <h2 className="text-success mt-3">Vad kul! Du löste pusslet! 🎉</h2>
      )}
    </Container>
  );
}
