import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getDataArray } from '../../utils/readInput';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function part1() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));
  let stones = new Map<string, number>();

  for (const stone of data[0].split(' ')) {
    stones.set(stone, 1);
  }

  for (let i = 0; i < 25; i++) {
    stones = blink(stones);
  }

  return [...stones].reduce((acc, [, count]) => acc + count, 0);
}

async function part2() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));
  let stones = new Map<string, number>();

  for (const stone of data[0].split(' ')) {
    stones.set(stone, 1);
  }

  for (let i = 0; i < 75; i++) {
    stones = blink(stones);
  }

  return [...stones].reduce((acc, [, count]) => acc + count, 0);
}

function add(stones: Map<string, number>, stone: string, count: number) {
  stones.set(stone, (stones.get(stone) ?? 0) + count);
}

function blink(stones: Map<string, number>): Map<string, number> {
  const next = new Map<string, number>();

  for (const [stone, count] of stones) {
    if (stone === '0') {
      add(next, '1', count);
    } else if (stone.length % 2 === 0) {
      const left = Number(stone.slice(0, stone.length / 2));
      const right = Number(stone.slice(stone.length / 2));
      add(next, `${left}`, count);
      add(next, `${right}`, count);
    } else {
      add(next, `${Number(stone) * 2024}`, count);
    }
  }
  
  return next;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});