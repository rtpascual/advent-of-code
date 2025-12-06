import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from "url";
import { profile } from '@/utils/profile';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function part1() {
  const data = await getData(path.join(__dirname, 'input.txt'));
  let total = 0;
  for (const range of data) {
    const [min, max] = range.split('-');
    for (let i = Number(min); i <= Number(max); i++) {
      if (isInvalid(i)) {
        total += i;
      }
    }
  }

  return total;
}

async function part2() {
  const data = await getData(path.join(__dirname, 'input2.txt'));
  let total = 0;
  for (const range of data) {
    const [min, max] = range.split('-');
    for (let i = Number(min); i <= Number(max); i++) {
      total += getInvalidSequence(i);
    }
  }

  return total;
}

async function getData(filePath: string): Promise<string[]> {
  const file = await fs.readFile(filePath);
  return file.toString().split(',');
}

function isInvalid(num: number): boolean {
  const numString = num.toString();
  if (numString.length % 2 !== 0) {
    return false;
  }

  const firstHalf = numString.slice(0, numString.length / 2);
  const secondHalf = numString.slice(numString.length / 2);
  return firstHalf === secondHalf;
}

function getInvalidSequence(num: number): number {
  const numString = String(num);
  const arr: string[] = [];
  let isInvalid: boolean = false;

  for (let i = 0; i < numString.length; i++) {
    const digits = numString.slice(0, i + 1);
    arr.push(digits);
  }

  for (const el of arr) {
    const regex = new RegExp(el, 'g');
    const numRepeat = numString.match(regex)?.length ?? 0;
    const leftover = numString.replaceAll(el, '');

    if (numRepeat >= 2 && leftover.length === 0) {
      isInvalid = true;
      break;
    }
  }

  return isInvalid ? num : 0;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});