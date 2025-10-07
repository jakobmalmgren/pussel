import type { Tile, Position } from "../types/puzzleTypes";
import { NUM_COLS, NUM_ROWS } from "../config";

// en funktion som checkar om pusslet är solved

export function isSolved(puzzle: Tile[][]): boolean {
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

// en funktion som checkar om man kan lösa spelet eller ej

export function isSolvable(
  flatTiles: Tile[],
  rows: number,
  cols: number
): boolean {
  const tiles = flatTiles.filter((t) => t !== null) as number[];
  let inversions = 0;

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] > tiles[j]) inversions++;
    }
  }

  const emptyIndex = flatTiles.indexOf(null);
  const emptyRowFromBottom = rows - Math.floor(emptyIndex / cols);

  if (cols % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    if (emptyRowFromBottom % 2 === 0) {
      return inversions % 2 === 1;
    } else {
      return inversions % 2 === 0;
    }
  }
}
// en funktion som shufflar pusslet

export function createShuffledPuzzle(rows: number, cols: number): Tile[][] {
  const total = rows * cols;
  let flatTiles: Tile[];

  do {
    flatTiles = Array.from({ length: total - 1 }, (_, i) => i + 1);
    flatTiles.push(null);

    for (let i = flatTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatTiles[i], flatTiles[j]] = [flatTiles[j], flatTiles[i]];
    }
  } while (!isSolvable(flatTiles, rows, cols)); // du behöver även skicka in detta till isSolvable

  const puzzle: Tile[][] = [];
  for (let r = 0; r < rows; r++) {
    puzzle.push(flatTiles.slice(r * cols, (r + 1) * cols));
  }

  return puzzle;
}

// funktion som går igenom hela pusslet och letar efter rutan med null
// returnerar positionen som rad, kolumn

export function findEmpty(puzzle: Tile[][]): Position {
  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[row].length; col++) {
      if (puzzle[row][col] === null) {
        return { row, col };
      }
    }
  }
  return { row: -1, col: -1 };
}

// funktion som gör att pusselbitarna rör på sig

export function moveTile(puzzle: Tile[][], row: number, col: number): Tile[][] {
  const { row: emptyRow, col: emptyCol } = findEmpty(puzzle);
  let moved = false;

  const newPuzzle = puzzle.map((r) => [...r]);

  if (row === emptyRow) {
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
  } else if (col === emptyCol) {
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
  }

  return moved ? newPuzzle : puzzle;
}
