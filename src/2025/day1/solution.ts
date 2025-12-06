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

    if (dir === 'L') {
      for (let i = 0; i < distNum; i++) {
        current = normalize(current - 1);
        if (current === 0) {
          zeros++;
        }
      }
    } else {
      for (let i = 0; i < distNum; i++) {
        current = normalize(current + 1);
        if (current === 0) {
          zeros++;
        }
      }
    }
  }

  return zeros;
}

function rotate(current: number, direction: string, distance: number): number {
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