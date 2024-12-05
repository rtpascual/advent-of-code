import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const rows = file.toString().split('\n');
  const data: string[][] = [];

  for (let i = 0; i < rows.length; i++) {
    data[i] = rows[i].split('');
  }
  return data;
}

const data = await getData();
const maxRows = data.length;
const maxCols = data[0].length;
const directions = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
  [1, 1], // down-right
  [1, -1], // down-left
  [-1, 1], // up-right
  [-1, -1], // up-left
];

async function part1() {
  let count = 0;
  const word = 'XMAS'

  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < maxCols; c++) {
      if (data[r][c] === word[0]) {
        for (const [dr, dc] of directions) {
          if (checkDirection(word, r, c, dr, dc)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

async function part2() {
  let count = 0;

  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < maxCols; c++) {
      if (data[r][c] === 'A' && checkMS(r,c)) {
        count++;
      }
    }
  }

  return count;
}

function checkMS(r: number, c: number): boolean {
  const forwardDiag = [
    [-1, 1],
    [1, -1],
  ];
  const backDiag = [
    [-1, -1],
    [1, 1],
  ];

  let forwardM = false;
  let forwardS = false;
  let backM = false;
  let backS = false;

  for (const [dr, dc] of forwardDiag) {
    const nr = r + dr;
    const nc = c + dc;
    if (isValid(nr,nc)) {
      if (data[nr][nc] === 'M') {
        forwardM = true;
      }
      if (data[nr][nc] === 'S') {
        forwardS = true;
      }
    }
  }

  for (const [dr, dc] of backDiag) {
    const nr = r + dr;
    const nc = c + dc;
    if (isValid(nr,nc)) {
      if (data[nr][nc] === 'M') {
        backM = true;
      }
      if (data[nr][nc] === 'S') {
        backS = true;
      }
    }
  }

  return forwardM && forwardS && backM && backS;
}

function checkDirection(word: string, r: number, c: number, dr: number, dc: number): boolean {
  for (let i = 0; i < word.length; i++) {
    const nr = r + dr * i;
    const nc = c + dc * i;
    if (!isValid(nr,nc) || data[nr][nc] !== word[i]) {
      return false;
    }
  }
  return true;
}

function isValid(r: number, c: number): boolean {
  return r >= 0 && r < maxRows && c >= 0 && c < maxCols;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});