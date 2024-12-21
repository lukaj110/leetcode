// Test cases

const testCases: {
  input: number[][];
  output: unknown;
}[] = [
  {
    input: [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, -1],
    ],
    output: 2,
  },
  {
    input: [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2],
    ],
    output: 4,
  },
  {
    input: [
      [0, 1],
      [2, 0],
    ],
    output: 0,
  },
];

// Solution

const directions: [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

type Board = {
  number: number;
  visited: boolean;
}[][];

function getUniquePathCount(
  board: Board,
  currentPosition: [number, number],
  remainingTiles: number
): number {
  const [currentRow, currentColumn] = currentPosition;

  const currentTile = board[currentRow]?.[currentColumn];

  if (!currentTile || currentTile.visited) return 0;

  if (currentTile.number === 2) {
    return remainingTiles === 0 ? 1 : 0;
  }

  currentTile.visited = true;

  let pathCount = 0;

  for (const [rowOffset, colOffset] of directions) {
    pathCount += getUniquePathCount(
      board,
      [currentRow + rowOffset, currentColumn + colOffset],
      remainingTiles - 1
    );
  }

  currentTile.visited = false;

  return pathCount;
}

function Solve(input: number[][]): number {
  const board: Board = input.map((row) =>
    row.map((value) => ({
      number: value,
      visited: value === -1,
    }))
  );

  let [startingRow, startingColumn] = [-1, -1];
  let emptyTileCount = 0;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col].number === 1) {
        startingRow = row;
        startingColumn = col;
      } else if (board[row][col].number === 0 || board[row][col].number === 2) {
        emptyTileCount++;
      }
    }
  }

  return getUniquePathCount(
    board,
    [startingRow, startingColumn],
    emptyTileCount
  );
}

// Running tests

testCases.forEach((testCase, index) => {
  const solution = Solve(testCase.input);

  const passed = solution === testCase.output;

  if (passed) console.log(`✅ Test case ${index + 1} passed.`);
  else console.log(`❌ Test case ${index + 1} failed.`);
});

// Performance

const startTime = performance.now();

for (let i = 0; i < 10000; i++) {
  for (const testCase of testCases) {
    Solve(testCase.input);
  }
}

const endTime = performance.now();

console.log(`Execution took: ${endTime - startTime} miliseconds.`);
