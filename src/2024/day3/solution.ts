import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const data = file.toString().match(/mul\(\d+,\d+\)/g);
  return data;
}

async function getDataWithNewInstructions() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));
  const data = file.toString().match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);
  return data;
}

async function part1() {
  const data = await getData();

  let total = 0;

  if (!data) {
    return total;
  }

  for (let i = 0; i < data.length; i++) {
    total += multiply(data[i]);
  }

  return total;
}

async function part2() {
  const data = await getDataWithNewInstructions();

  let total = 0;
  let enable = true;

  if (!data) {
    return total;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i] === 'do()') {
      enable = true;
    } else if (data[i] === `don't()`) {
      enable = false;
    } else if (enable) {
      total += multiply(data[i]);
    }
  }

  return total;
}

function multiply(expression: string) {
  const numbers = expression.match(/\d+/g);

  return numbers ? Number(numbers[0]) * Number(numbers[1]) : 0;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});