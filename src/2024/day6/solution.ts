import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getData2d } from '../../utils/readInput';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guard = '^';
let gr = 0;
let gc = 0;

const data = await getData2d(path.join(__dirname, 'input.txt'));
const maxRows = data.length;
const maxCols = data[0].length;
const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];
const obstacle = '#';

async function part1() {
  const patrolPath = patrol(data, gr, gc);
  return patrolPath.size;
}

async function part2() {
  const total = getNumObstaclesPlaced(data, gr, gc);
  return total;
}

function isValid(r: number, c: number): boolean {
  return r >= 0 && r < maxRows && c >= 0 && c < maxCols;
}

function patrol(data: string[][], gr: number, gc: number): Set<string> {
  let currentDirection = 0; // up
  let nr = gr + directions[currentDirection][0];
  let nc = gc + directions[currentDirection][1];
  const patrolPath = new Set<string>();
  patrolPath.add(`${gr},${gc}`);

  while (isValid(nr, nc)) {
    if (data[nr][nc] === obstacle) {
      nr -= directions[currentDirection][0];
      nc -= directions[currentDirection][1];
      currentDirection = currentDirection + 1 < directions.length ? currentDirection + 1 : 0;
    } else {
      patrolPath.add(`${nr},${nc}`);
      nr += directions[currentDirection][0];
      nc += directions[currentDirection][1];
    }
  }
  
  return patrolPath;
}

const patrolPath2 = new Set<string>();

function getNumObstaclesPlaced(data: string[][], gr: number, gc: number): number {
  let currentDirection = 0; // up
  let nr = gr + directions[currentDirection][0];
  let nc = gc + directions[currentDirection][1];
  let obstaclesPlaced = 0;
  patrolPath2.add(`${gr},${gc},${currentDirection}`);

  while (isValid(nr, nc)) {
    const cr = nr - directions[currentDirection][0];
    const cc = nc - directions[currentDirection][1];
    const turnDirection = currentDirection + 1 < directions.length ? currentDirection + 1 : 0;
    
    if (checkLoop(cr, cc, turnDirection)) {
      obstaclesPlaced++;
    }
    if (data[nr][nc] === obstacle) {
      nr -= directions[currentDirection][0];
      nc -= directions[currentDirection][1];
      currentDirection = turnDirection;
    } else {
      patrolPath2.add(`${nr},${nc},${currentDirection}`);
      nr += directions[currentDirection][0];
      nc += directions[currentDirection][1];
    }
  }
  
  return obstaclesPlaced;
}

function checkLoop(r: number, c: number, turnDirection: number): boolean {
  let count = 1;
  let nr = r + directions[turnDirection][0] * count;
  let nc = c + directions[turnDirection][1] * count;
  do {
    if (patrolPath2.has(`${nr},${nc},${turnDirection}`)) {
      return true;
    }
    count++;
    nr = r + directions[turnDirection][0] * count;
    nc = c + directions[turnDirection][1] * count;
  } while (isValid(nr, nc));

  return false;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});
