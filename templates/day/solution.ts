import path from "path";
import { fileURLToPath } from "url";
import { profile } from '@/utils/profile';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function part1() {
}

async function part2() {
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});