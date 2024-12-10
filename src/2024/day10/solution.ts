import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getData2d } from '../../utils/readInput';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const data = await getData2d(path.join(__dirname, 'input.txt'));
const maxRows = data.length;
const maxCols = data[0].length;
const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

async function part1() {
  const trailheads = getTrailheads();
  let sumScore = 0;

  for (const [r, c] of trailheads) {
    sumScore += calculateScore(r,c);
  }

  return sumScore;
}

async function part2() {
  const trailheads = getTrailheads();
  let sumScore = 0;

  for (const [r, c] of trailheads) {
    sumScore += calculateScore(r,c, true);
  }

  return sumScore;
}

function isValid(r: number, c: number): boolean {
  return r >= 0 && r < maxRows && c >= 0 && c < maxCols;
}

function getTrailheads(): number[][] {
  const trailheads: number[][] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === '0') {
        trailheads.push([i, j]);
      }
    }
  }

  return trailheads;
}

function calculateScore(r: number, c: number, onlyDistinct: boolean = false): number {
  const trailEnds = new Set<string>();
  const trails = new Set<string>();

  function move(cr: number, cc: number, path: number[][]) {
    const currentHeight = Number(data[cr][cc]);
    if (currentHeight === 9) {
      if (onlyDistinct && !trails.has(path.toString())) {
        trails.add(path.toString());
        return;
      }
      if (!trailEnds.has(`${cr},${cc}`)) {
        trailEnds.add(`${cr},${cc}`);
      }
      return;
    }

    for (const [dr,dc] of directions) {
      const nr = cr + dr;
      const nc = cc + dc;
      if (isValid(nr,nc) && data[nr][nc] === `${currentHeight + 1}`) {
        const newPath = [...path, [nr,nc]];
        move(nr,nc, newPath);
      }
    }
  }

  move(r,c, [[r,c]]);

  return onlyDistinct ? trails.size : trailEnds.size;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});