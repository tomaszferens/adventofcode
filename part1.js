const fs = require("fs");

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n");

const transformed = input
  .map(e => e.split(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).filter(x => x))
  .map(value => {
    const [id, left, top, wide, tall] = value;
    return {
      id: Number(id),
      left: Number(left),
      top: Number(top),
      wide: Number(wide),
      tall: Number(tall)
    };
  });

function generateBoard(row, col) {
  const board = {};

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      board[`${i},${j}`] = 0;
    }
  }

  return board;
}

const maxColumn = Math.max.apply(Math, transformed.map(o => o.left + o.wide));
const maxRow = Math.max.apply(Math, transformed.map(o => o.top + o.tall));

const board = generateBoard(maxRow, maxColumn);
const data = transformed.reduce((acc, val) => {
  for (let i = val.left; i < val.left + val.wide; i++) {
    for (let j = val.top; j < val.top + val.tall; j++) {
      acc[`${i},${j}`] = acc[`${i},${j}`] + 1;
    }
  }
  return acc;
}, board);

const result = Object.values(data).filter(value => value > 1).length;

console.log(result);
