import path from "path";
import { fileURLToPath } from "url";
import { profile } from '@/utils/profile';
import { getDataArray } from "@/utils/readInput";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Robot = {
  x: number,
  y: number,
  vx: number,
  vy: number,
}

const width = 101;
const height = 103;

async function part1() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));
  let robots = getRobots(data);
  const waitTime = 100;
  const quadrants: number[] = [0,0,0,0,0];

  for (let i = 0; i < waitTime; i++) {
    moveRobots(robots);
  }

  for (const robot of robots) {
    calculateQuadrants(robot, quadrants);
  }

  return quadrants[1] * quadrants[2] * quadrants[3] * quadrants[4];
}

async function part2() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));
  let robots = getRobots(data);

  for (let i = 0; i < 10000; i++) {
    if (isRobotsInUniqueLocation(robots)) {
      console.log(i);
      toGrid(robots);
      return i;
    }
    moveRobots(robots);
  }
}

function isRobotsInUniqueLocation(robots: Robot[]): boolean {
  const positions = new Set<string>(robots.map(robot => `${robot.x},${robot.y}`));
  
  return positions.size === robots.length;
}

function toGrid(robots: Robot[]): void {
  const grid = Array.from({ length: height }, () => Array.from({ length: width }, () => ' '));

  for (const robot of robots) {
    grid[robot.y][robot.x] = '#';
  }

  for (const row of grid) {
    console.log(row.join());
  }
}

function getRobots(data: string[]): Robot[] {
  const robots: Robot[] = []

  for (let i = 0; i < data.length; i++) {
    const [x, y, vx, vy] = data[i].match(/-?\d+/g)?.map(Number) ?? [0,0,0,0];
    robots.push({x, y, vx, vy});
  }

  return robots;
}

function moveRobots(robots: Robot[]): void {
  for (const robot of robots) {
    robot.x = (robot.x + robot.vx + width) % width;
    robot.y = (robot.y + robot.vy + height) % height;
  }
}

function calculateQuadrants(robot: Robot, quadrants: number[]): void {
  const middleX = Math.floor(width / 2);
  const middleY = Math.floor(height / 2);

  if (robot.x === middleX || robot.y === middleY) {
    quadrants[0]++; 
  } else if (robot.x < middleX && robot.y < middleY) {
    quadrants[1]++;
  } else if (robot.x > middleX && robot.y < middleY) {
    quadrants[2]++;
  } else if (robot.x < middleX && robot.y > middleY) {
    quadrants[3]++;
  } else {
    quadrants[4]++;
  }
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});