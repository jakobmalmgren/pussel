import type { Tile, Position } from "../types/puzzleTypes";
import { NUM_COLS, NUM_ROWS } from "../config";

// en funktion som checkar om pusslet är solved

export function isSolved(puzzle: Tile[][]): boolean {
  let count = 1; // jag börjar med att räkna från 1 (första brickan)

  for (let r = 0; r < NUM_ROWS; r++) {
    // Gå igenom varje rad
    for (let c = 0; c < NUM_COLS; c++) {
      // Gå igenom varje kolumn i raden

      // om man på sista rutan (längst ned till höger)
      if (r === NUM_ROWS - 1 && c === NUM_COLS - 1) {
        if (puzzle[r][c] !== null) return false; // den måste vara null, annars är det fel
      } else {
        // alla andra rutor måste innehålla rätt siffra
        if (puzzle[r][c] !== count) return false;

        count++; // öka för att matcha nästa förväntade siffra
      }
    }
  }

  return true; // om man inte hittade något fel, så är pusslet löst!
}

// en funktion som checkar om man kan lösa spelet eller ej

export function isSolvable(
  flatTiles: Tile[],
  rows: number,
  cols: number
): boolean {
  //  Ta bort null (den tomma brickan) skippar den när jag räknar inversioner
  const tiles = flatTiles.filter((t) => t !== null) as number[];
  console.log("Brickor utan null:", tiles);

  //  Initiera en räknare för inversioner (felplacerade par)
  let inversions = 0;

  // loopa igenom alla brickpar och räkna hur många som är i fel ordning
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] > tiles[j]) {
        inversions++;
        console.log(`Inversion: ${tiles[i]} > ${tiles[j]}`);
      }
    }
  }

  console.log("Totalt antal inversioner:", inversions);

  // hitta indexet där den tomma rutan (null) finns
  const emptyIndex = flatTiles.indexOf(null);
  console.log("Index för null (tom ruta):", emptyIndex);

  // räkna ut vilken rad (räknat nerifrån) som den tomma rutan finns på
  // Math.floor(emptyIndex / cols) ger radindex uppifrån
  // rows, det värdet ger radnummer nerifrån
  const emptyRowFromBottom = rows - Math.floor(emptyIndex / cols);
  console.log("Tom ruta ligger på rad (nerifrån):", emptyRowFromBottom);

  // reglerna för lösbarhet
  if (cols % 2 === 1) {
    // om antal kolumner är udda
    const solvable = inversions % 2 === 0;
    console.log("Udda kolumner – pusslet är lösbart?", solvable);
    return solvable;
  } else {
    // om antal kolumner är jämnt
    if (emptyRowFromBottom % 2 === 0) {
      // tom ruta på jämn rad (nerifrån)
      const solvable = inversions % 2 === 1;
      console.log(
        "Jämna kolumner + tom ruta på jämn rad (nerifrån) – pusslet är lösbart?",
        solvable
      );
      return solvable;
    } else {
      // tom ruta på udda rad (nerifrån)
      const solvable = inversions % 2 === 0;
      console.log(
        "Jämna kolumner + tom ruta på udda rad (nerifrån) – pusslet är lösbart?",
        solvable
      );
      return solvable;
    }
  }
}

// en funktion som shufflar pusslet

export function createShuffledPuzzle(rows: number, cols: number): Tile[][] {
  const total = rows * cols;

  let flatTiles: Tile[];

  // en do-while-loop som upprepar slumpningen tills en lösbar ordning hittas
  do {
    // Skapar en array från 1 till total - 1, eftersom sista rutan ska vara null (tom)

    flatTiles = Array.from({ length: total - 1 }, (_, i) => i + 1);

    // lägger till en tom ruta på slutet , null då
    flatTiles.push(null);

    // Fisher–Yates shuffle. en algoritm jag kollade upp för att slumpa en array på ett rättvist sätt
    for (let i = flatTiles.length - 1; i > 0; i--) {
      // väljer ett slumpmässigt index mellan 0 och i
      const j = Math.floor(Math.random() * (i + 1));

      // byter plats på elementen vid index i och j
      [flatTiles[i], flatTiles[j]] = [flatTiles[j], flatTiles[i]];
    }

    // upprepa slumpningen om pusslet inte är lösbart
  } while (!isSolvable(flatTiles, rows, cols));

  const puzzle: Tile[][] = [];

  // loopar igenom raderna
  for (let r = 0; r < rows; r++) {
    // använder slice för att ta en del av flatTiles som motsvarar en rad
    puzzle.push(flatTiles.slice(r * cols, (r + 1) * cols));
  }

  return puzzle;
}

// funktion som går igenom hela pusslet och letar efter rutan med null
// returnerar positionen som rad, kolumn

export function findEmpty(puzzle: Tile[][]): Position {
  // går igenom varje rad i pusslet
  for (let row = 0; row < puzzle.length; row++) {
    // går igenom varje kolumn i den aktuella raden
    for (let col = 0; col < puzzle[row].length; col++) {
      // kontrollerar om den aktuella rutan är tom (null)
      if (puzzle[row][col] === null) {
        return { row, col };
      }
    }
  }

  // row: -1 och col: -1 används som en sorts felkod
  return { row: -1, col: -1 };
}

// funktion som gör att pusselbitarna rör på sig

export function moveTile(puzzle: Tile[][], row: number, col: number): Tile[][] {
  // Hitta positionen för den tomma rutan (null)
  const { row: emptyRow, col: emptyCol } = findEmpty(puzzle);

  let moved = false;

  // mappar varje rad till en ny array via spread operator
  const newPuzzle = puzzle.map((r) => [...r]);

  // === flytt i samma rad
  if (row === emptyRow) {
    // om klickade kolumnen ligger till vänster om tomrutan
    if (col < emptyCol) {
      // flytta varje ruta från klickad kolumn fram till den tomma..ett steg åt höger
      for (let c = emptyCol; c > col; c--) {
        newPuzzle[row][c] = newPuzzle[row][c - 1];
      }
      // sätter den klickade rutan till null..flytta tomrutan dit
      newPuzzle[row][col] = null;
      moved = true;

      // om klickade kolumnen ligger till höger om tomrutan
    } else if (col > emptyCol) {
      // flytta varje ruta från tomrutan upp till klickad, ett steg åt vänster
      for (let c = emptyCol; c < col; c++) {
        newPuzzle[row][c] = newPuzzle[row][c + 1];
      }
      // sätt den klickade rutan till null
      newPuzzle[row][col] = null;
      moved = true;
    }

    // === flytt i samma kolumn
  } else if (col === emptyCol) {
    // om klickade raden ligger ovanför tomrutan
    if (row < emptyRow) {
      // flytta varje ruta ett steg nedåt, från tomrutan till klickad rad
      for (let r = emptyRow; r > row; r--) {
        newPuzzle[r][col] = newPuzzle[r - 1][col];
      }
      newPuzzle[row][col] = null;
      moved = true;

      // om klickade raden ligger under tomrutan
    } else if (row > emptyRow) {
      // flytta varje ruta ett steg uppåt, från tomrutan till klickad rad
      for (let r = emptyRow; r < row; r++) {
        newPuzzle[r][col] = newPuzzle[r + 1][col];
      }
      newPuzzle[row][col] = null;
      moved = true;
    }
  }

  return moved ? newPuzzle : puzzle;
}
