import path from "path";
import { fileURLToPath } from "url";
import { profile } from '@/utils/profile';
import { getDataArray } from "@/utils/readInput";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Machine = {
  a: number[],
  b: number[],
  prize: number[],
}

async function part1() {
  const data = await getDataArray(path.join(__dirname,'input.txt'));
  const machines = getMachines(data);
  let totalCost = 0;

  for (const machine of machines) {
    const [aX, aY] = machine.a;
    const [bX, bY] = machine.b;
    const [prizeX, prizeY] = machine.prize;
    let cost;

    for (let a = 0; a < 100; a++) {
      for (let b = 0; b < 100; b++) {
        if (aX * a + bX * b === prizeX && aY * a + bY * b === prizeY) {
          const curCost = a * 3 + b;
          if (!cost || curCost < cost) {
            cost = curCost;
          }
        }
      }
    }

    totalCost += cost ?? 0;
  }

  return totalCost;
}

async function part2() {
  const data = await getDataArray(path.join(__dirname,'input.txt'));
  const machines = getMachines(data, true);
  let totalCost = 0;

  for (const machine of machines) {
    const [aX, aY] = machine.a;
    const [bX, bY] = machine.b;
    const [prizeX, prizeY] = machine.prize;
    const d = aX * bY - aY * bX;
    const a = (prizeX * bY - bX * prizeY) / d;
    const b = (prizeY * aX - aY * prizeX) / d;
    
    if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0) {
      totalCost += a * 3 + b;
    }
  }

  return totalCost;
}

function getMachines(data: string[], fixError: boolean = false): Machine[] {
  let machines: Machine[] = [];
  const errorNum = 10000000000000;

  for (let i = 0; i < data.length;) {
    const aDelta = data[i].match(/[0-9]+/g)?.map(Number) ?? [];
    const bDelta = data[i + 1].match(/[0-9]+/g)?.map(Number) ?? [];
    const prizeCoords = data[i + 2].match(/[0-9]+/g)?.map((value) => fixError ? Number(value) + errorNum : Number(value)) ?? [];
    machines.push({
      a: aDelta,
      b: bDelta,
      prize: prizeCoords
    });
    i += 4;
  }

  return machines;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});