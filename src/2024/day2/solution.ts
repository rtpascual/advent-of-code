import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getDataArray } from '../../utils/readInput';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function part1() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));
  let numSafeReports = 0;

  for (let i = 0; i < data.length; i++) {
    const levels = data[i].split(' ').map(level => parseInt(level));
    if (isReportSafe(levels)) {
      numSafeReports++;
    }
  }

  return numSafeReports;
}

async function part2() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));

  let numSafeReports = 0;

  for (let i = 0; i < data.length; i++) {
    const levels = data[i].split(' ').map(level => parseInt(level));
    if (isReportSafe(levels)) {
      numSafeReports++;
    } else {
      for (let j = 0; j < levels.length; j++) {
        let dampened = [...levels];
        dampened.splice(j, 1);
        if (isReportSafe(dampened)) {
          numSafeReports++;
          break;
        }
      }
    }
  }

  return numSafeReports;
}

function isReportSafe(levels: number[]) {
  let increaseDecrease = 0;
  for (let i = 1; i < levels.length; i++) {
    const currentLevel = levels[i];
    const previousLevel = levels[i - 1];
    const difference = Math.abs(currentLevel - previousLevel);

    if (difference < 1 || difference > 3) {
      return false;
    }

    if ((increaseDecrease > 0 && currentLevel < previousLevel) || (increaseDecrease < 0 && currentLevel > previousLevel)) {
      return false;
    }

    if (increaseDecrease === 0) {
      increaseDecrease = previousLevel < currentLevel ? 1 : -1;
    }
  }

  return true;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});