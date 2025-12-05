import path from "path";
import { fileURLToPath } from "url";
import { profile } from '@/utils/profile';
import { getDataArray } from "@/utils/readInput";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function part1() {
  const rotations = await getDataArray(path.join(__dirname, 'input.txt'));
  let zeros = 0;
  let current = 50;

  for (const rotation of rotations) {
    const dir = rotation.slice(0, 1);
    const distString = rotation.slice(1);

    current = rotate(current, dir, Number(distString));
    console.log(`new current=${current}`);

    if (current === 0) {
      zeros++;
    }
  }

  return zeros;
}

async function part2() {
  const rotations = await getDataArray(path.join(__dirname, 'input2.txt'));
  let zeros = 0;
  let current = 50;

  for (const rotation of rotations) {
    const dir = rotation.slice(0, 1);
    const distString = rotation.slice(1);
    const distNum = Number(distString);

    const numZeros = (current + distNum) % 100;
  }
}

function rotate(current: number, direction: string, distance: number): number {
  console.log(`start of rotate current=${current} direction=${direction} distance=${distance}`);
  if (direction === 'L') {
    current -= distance;
  } else {
    current += distance;
  }

  return normalize(current);
}

function normalize(num: number): number {
  return ((num % 100) + 100) % 100
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});