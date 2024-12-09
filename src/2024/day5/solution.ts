import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getDataArray } from '../../utils/readInput';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface PageOrderingRules {
  [key: string]: {
    before: string[];
    after: string[],
  }
}

async function part1() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));
  const splitIndex = data.indexOf('');
  const rules = data.slice(0, splitIndex);
  const updates = data.slice(splitIndex + 1, data.length);
  let total = 0;
  const pageOrderingRules = buildRules(rules);

  for (let i = 0; i < updates.length; i++) {
    if (isUpdateCorrect(pageOrderingRules, updates[i])) {
      const updateArray = updates[i].split(',');
      total += getMiddleNumber(updateArray);
    }
  }

  return total;
}

async function part2() {
  const data = await getDataArray(path.join(__dirname, 'input.txt'));
  const splitIndex = data.indexOf('');
  const rules = data.slice(0, splitIndex);
  const updates = data.slice(splitIndex + 1, data.length);
  let total = 0;
  const pageOrderingRules = buildRules(rules);

  for (let i = 0; i < updates.length; i++) {
    if (!isUpdateCorrect(pageOrderingRules, updates[i])) {
      total += fixUpdateThenGetMiddleNum(pageOrderingRules, updates[i]);
    }
  }

  return total;
}

function buildRules(rules: string[]): PageOrderingRules {
  const pageOrderingRules: PageOrderingRules = {};
  for (let i = 0; i < rules.length; i++) {
    const [firstNum, lastNum] = rules[i].split('|');

    if (pageOrderingRules[firstNum]) {
      pageOrderingRules[firstNum].after.push(lastNum);
    } else {
      pageOrderingRules[firstNum] = {
        before: [],
        after: [lastNum]
      }
    }

    if (pageOrderingRules[lastNum]) {
      pageOrderingRules[lastNum].before.push(firstNum);
    } else {
      pageOrderingRules[lastNum] = {
        before: [firstNum],
        after: []
      }
    }
  }

  return pageOrderingRules;
}

function isUpdateCorrect(pageOrderingRules: PageOrderingRules, update: string): boolean {
  const updateArray = update.split(',');

  for (let i = 0; i < updateArray.length; i++) {
    for (let j = 0; j < updateArray.length; j++) {
      if (i < j && pageOrderingRules[updateArray[i]].before.includes(updateArray[j])) {
          return false;
      }
      if (i > j && pageOrderingRules[updateArray[i]].after.includes(updateArray[j])) {
          return false;
      }
    }
  }

  return true;
}

function fixUpdateThenGetMiddleNum(pageOrderingRules: PageOrderingRules, update: string): number {
  const updateArray = update.split(',');

  for (let i = 0; i < updateArray.length;) {
    const beforeNums = pageOrderingRules[updateArray[i]]?.before ?? [];
    let lastIndex = 0;

    for (let j = 0; j < beforeNums.length; j++) {
      const beforeNumIndex = updateArray.indexOf(beforeNums[j]);
      if (lastIndex < beforeNumIndex) {
        lastIndex = beforeNumIndex;
      }
    }

    if (i < lastIndex) {
      [updateArray[i], updateArray[lastIndex]] = [updateArray[lastIndex], updateArray[i]];
    } else {
      i++;
    }
  }

  return getMiddleNumber(updateArray);
}

function getMiddleNumber(updateArray: string[]): number {
  const middleIndex = Math.floor(updateArray.length / 2);
  return Number(updateArray[middleIndex]);
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});