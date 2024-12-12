import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getData2d } from '../../utils/readInput';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Details = {
  area: number,
  perimeter: number,
  corners: number,
}

const garden = await getData2d(path.join(__dirname, 'input.txt'));
const maxRows = garden.length;
const maxCols = garden[0].length;
const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

async function part1() {
  let alreadyVisited = new Set<string>();
  let sum = 0;

  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < maxCols; c++) {
      if (!alreadyVisited.has(`${r},${c}`)) {
        let details: Details = {
          area: 0,
          perimeter: 0,
          corners: 0,
        };
        let visited = new Set<string>();
        findRegion(r,c,details,visited);
        alreadyVisited = new Set([...alreadyVisited, ...visited]);
        sum += details.area * details.perimeter;
      }
    }
  }

  return sum;
}

async function part2() {
  let alreadyVisited = new Set<string>();
  let sum = 0;

  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < maxCols; c++) {
      if (!alreadyVisited.has(`${r},${c}`)) {
        let details: Details = {
          area: 0,
          perimeter: 0,
          corners: 0,
        };
        let visited = new Set<string>();
        findRegion(r,c,details,visited,true);
        alreadyVisited = new Set([...alreadyVisited, ...visited]);
        sum += details.area * details.corners;
      }
    }
  }

  return sum;
}

function findRegion(r: number, c: number, details: Details, visited: Set<string>, countCorners: boolean = false): void {
  if (visited.has(`${r},${c}`)) {
    return;
  }
  visited.add(`${r},${c}`);

  details.area++;
  if (countCorners) {
    details.corners += calculateCornersForPlot(r,c);
  } else {
    details.perimeter += calculatePerimeterForPlot(r,c);
  }

  for (const [dr,dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (isValid(nr,nc) && garden[nr][nc] === garden[r][c]) {
      findRegion(nr,nc,details,visited,countCorners);
    }
  }
}

function calculatePerimeterForPlot(r: number, c: number): number {
  let numTouchingSamePlant = 0;

  for (const [dr,dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (isValid(nr,nc) && garden[nr][nc] === garden[r][c]) {
      numTouchingSamePlant++;
    }
  }

  return 4 - numTouchingSamePlant;
}

function calculateCornersForPlot(r: number, c: number): number {
  const plant = garden[r][c];
  let result = 0;

  for (let i = 0; i < directions.length; i++) {
    const [dr,dc] = directions[i];
    const otherD = directions[i + 1] ?? directions[0];
    const ar = r + dr;
    const ac = c + dc;
    const br = r + otherD[0];
    const bc = c + otherD[1];
    const diagR = r + dr + otherD[0];
    const diagC = c + dc + otherD[1];

    const aMatches = isValid(ar,ac) && garden[ar][ac] === plant;
    const bMatches = isValid(br,bc) && garden[br][bc] === plant;
    const diagMatches = isValid(diagR,diagC) && garden[diagR][diagC] === plant;

    if (!aMatches && !bMatches) {
      result++;
    } else if (aMatches && bMatches && !diagMatches) {
      result++
    }
  }

  return result;
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