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
const overlapped = {};
const visitors = {};
transformed.reduce((acc, val) => {
  for (let i = val.left; i < val.left + val.wide; i++) {
    for (let j = val.top; j < val.top + val.tall; j++) {
      acc[`${i},${j}`] = acc[`${i},${j}`] + 1;
      visitors[`${i},${j}`] = [...(visitors[`${i},${j}`] || []), val.id];
      if (acc[`${i},${j}`] > 1) {
        visitors[`${i},${j}`].forEach(e => {
          overlapped[e] = true;
        });
        overlapped[val.id] = true;
      }
    }
  }
  return acc;
}, board);

const notOverlapped = transformed.find(val => !overlapped[val.id]);
console.log(notOverlapped.id);

/* UNNECESSARY, the task was much simpler */

// for (let i = 0; i < rest.length; i++) {
//   const val = rest[i];
//   const neighbours = [];
//   for (let j = val.left - 1; j <= val.left + val.wide; j++) {
//     for (let k = val.top - 1; k <= val.top + val.tall; k++) {
//       const isFirstRow = j === val.left - 1;
//       const isLastRow = j === val.left + val.wide;
//       const isFirstColumn = k === val.top - 1;
//       const isLastColumn = k === val.top + val.tall;

//       const isTopLeftCorner = isFirstRow && isFirstColumn;
//       const isTopRightCorner = isLastRow && isFirstColumn;
//       const isBottomRightCorner = isLastRow && isLastColumn;
//       const isBottomLeftCorner = isFirstRow && isLastColumn;

//       const isClaimField =
//         j > val.left - 1 &&
//         j < val.left + val.wide &&
//         k > val.top - 1 &&
//         k < val.top + val.tall;

//       if (
//         isTopLeftCorner ||
//         isTopRightCorner ||
//         isBottomRightCorner ||
//         isBottomLeftCorner ||
//         isClaimField
//       ) {
//         continue;
//       }

//       neighbours.push(`${j},${k}`);
//     }
//   }
//   console.log(neighbours);
//   const a = neighbours.every(e => data1[e] === 1 || data1[e] === undefined);
//   if (a) {
//     console.log(val.id);
//   }
// }
