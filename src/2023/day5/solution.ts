import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { profile } from "../../utils/profile";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));

  const data = file.toString();

  const seedString = data.replace(/\n/g, "").match(/seeds: ([\d\s]+)/)![1];
  const seeds = convertStringToNumArray(seedString);

  const maps = data
    .split(/\n+[a-z\-]+ map:\n/)
    .slice(1)
    .map((x) => x.split(/\n/).map((y) => convertStringToNumArray(y)));

  return {
    seeds,
    maps,
  };
}

async function part1() {
  const { seeds, maps } = await getData();

  let locations = [];

  for (const seed of seeds) {
    let currentNumber = seed;

    for (const map of maps) {
      for (const set of map) {
        if (currentNumber >= set[1] && currentNumber < set[1] + set[2]) {
          currentNumber = set[0] + (currentNumber - set[1]);
          break;
        }
      }
    }

    locations.push(currentNumber);
  }

  return Math.min(...locations);
}

function convertStringToNumArray(str: string) {
  const numArray = str.split(" ").map((x) => +x);

  return numArray;
}

profile("part 1", async () => {
  console.log(await part1());
});
