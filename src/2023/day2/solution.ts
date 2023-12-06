import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { profile } from "../../utils/profile";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));

  const data = file.toString().split("\n");

  return data;
}

async function part1() {
  const data = await getData();
  let sum = 0;

  for (const game of data) {
    const gameId = parseGameId(game);
    if (validateGame(game)) {
      sum += gameId;
    }
  }

  return sum;
}

async function part2() {
  const data = await getData();
  let sum = 0;

  for (const game of data) {
    const { minRed, minGreen, minBlue } = getFewestColors(game);
    sum += minRed * minGreen * minBlue;
  }

  return sum;
}

function parseGameId(game: string): number {
  const gameString = game.split(":")[0];
  const gameId = gameString.split(" ")[1];

  return parseInt(gameId);
}

function validateGame(game: string): boolean {
  const subsetString = game.split(":")[1];

  const redMax = 12;
  const greenMax = 13;
  const blueMax = 14;
  let num = 0;

  let substring = "";

  for (const char of subsetString) {
    substring += char;
    if (substring.match(/\d$/)) {
      const number = substring.split(" ").at(-1);
      if (number) {
        num = parseInt(number);
      }
    }
    if (substring.match(/red$/) && num > redMax) {
      return false;
    }
    if (substring.match(/green$/) && num > greenMax) {
      return false;
    }
    if (substring.match(/blue$/) && num > blueMax) {
      return false;
    }
  }

  return true;
}

function getFewestColors(game: string) {
  const subsetString = game.split(":")[1];

  let minRed = 0;
  let minGreen = 0;
  let minBlue = 0;
  let num = 0;

  let substring = "";

  for (const char of subsetString) {
    substring += char;
    if (substring.match(/\d$/)) {
      const number = substring.split(" ").at(-1);
      if (number) {
        num = parseInt(number);
      }
    }
    if (substring.match(/red$/)) {
      if (minRed === 0) {
        minRed = num;
      } else {
        minRed = num > minRed ? num : minRed;
      }
    }
    if (substring.match(/green$/)) {
      if (minGreen === 0) {
        minGreen = num;
      } else {
        minGreen = num > minGreen ? num : minGreen;
      }
    }
    if (substring.match(/blue$/)) {
      if (minBlue === 0) {
        minBlue = num;
      } else {
        minBlue = num > minBlue ? num : minBlue;
      }
    }
  }

  return { minRed, minGreen, minBlue };
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});
