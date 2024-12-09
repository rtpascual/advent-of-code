import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getDataArray } from "../../utils/readInput";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function part1() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));

  const leftList: number[] = [];
  const rightList: number[] = [];
  let totalDistance = 0;

  for (let i = 0; i < data.length; i++) {
    const { left, right } = separateLists(data[i]);
    leftList.push(left);
    rightList.push(right);
  }
  leftList.sort(compareNumbers);
  rightList.sort(compareNumbers);

  for (let i = 0; i < leftList.length; i++) {
    totalDistance += getDistance(leftList[i], rightList[i]);
  }

  return totalDistance;
}

async function part2() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));

  const leftList: number[] = [];
  const rightList: number[] = [];
  let similarityScore = 0;

  for (let i = 0; i < data.length; i++) {
    const { left, right } = separateLists(data[i]);
    leftList.push(left);
    rightList.push(right);
  }

  for (let i = 0; i < leftList.length; i++) {
    similarityScore += getSimilarityScore(leftList[i], rightList);
  }

  return similarityScore;
}

function separateLists(input: string) {
  const result = input.split(/\s+/);
  return {
    left: parseInt(result[0]),
    right: parseInt(result[1]),
  }
}

function getDistance(left: number, right: number) {
  return Math.abs(left - right);
}

function compareNumbers(a: number, b: number) {
  return a - b;
}

function getSimilarityScore(num: number, list: number[]) {
  let numOccurrence = 0;

  for (let i = 0; i < list.length; i++) {
    if (list[i] === num) {
      numOccurrence++;
    }
  }

  return num * numOccurrence;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});