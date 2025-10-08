import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Container, Row, Col } from "react-bootstrap";
import TileButton from "./TileButton";
import PrimaryBtn from "./primaryBtn";
import type { Tile } from "../types/puzzleTypes";
import { NUM_COLS, NUM_ROWS } from "../config";
import { createShuffledPuzzle, isSolved, moveTile } from "../utils/puzzleUtils";
import "../styles/BoardComponent.css";

export default function BoardComponent() {
  const [puzzle, setPuzzle] = useState<Tile[][]>([]);
  const [solved, setSolved] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    shuffle();
  }, []);

  function shuffle() {
    const newPuzzle = createShuffledPuzzle(NUM_ROWS, NUM_COLS);
    setPuzzle(newPuzzle);
    setSolved(false);
    setMoveCount(0);
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center board-container"
    >
      <div className="text-center w-100">
        <h1 className="mb-4">N-pussel</h1>

        {puzzle.length === 0 ? (
          <p>Laddar pusslet...</p>
        ) : (
          <Row className="justify-content-center align-items-start g-4 puzzle-layout">
            <Col xs={12}>
              <section
                className={`border border-dark rounded p-3 bg-light puzzle-container ${
                  solved ? "blurred" : ""
                }`}
              >
                <section
                  className="puzzle-grid"
                  style={{
                    gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
                  }}
                >
                  {puzzle.map((row, rowIndex) =>
                    row.map((tile, columnIndex) => (
                      <TileButton
                        key={`${rowIndex}-${columnIndex}`}
                        tile={tile}
                        onClick={() => {
                          if (solved) return;
                          const newPuzzle = moveTile(
                            puzzle,
                            rowIndex,
                            columnIndex
                          );
                          if (newPuzzle !== puzzle) {
                            setPuzzle(newPuzzle);
                            const nowSolved = isSolved(newPuzzle);
                            setSolved(nowSolved);
                            setMoveCount((prev) => prev + 1);
                          }
                        }}
                      />
                    ))
                  )}
                </section>
              </section>
            </Col>

            <Col xs={12}>
              <PrimaryBtn onClick={() => shuffle()}>SLUMPA OM</PrimaryBtn>
              <p className="mt-3">Antal drag: {moveCount}</p>
            </Col>
          </Row>
        )}

        {solved && (
          <>
            <Confetti />
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
              <div
                className="text-center bg-white p-4 rounded shadow"
                style={{ width: "400px", maxWidth: "90vw" }}
              >
                <h2 className="text-success mb-3">
                  Vad kul! Du löste pusslet!
                </h2>
                <PrimaryBtn onClick={() => shuffle()}>SPELA IGEN</PrimaryBtn>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
