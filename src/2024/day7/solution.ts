import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getData } from '../../utils/readInput';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function part1() {
  const data = await getData(path.join(__dirname, 'input.txt'));
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    const { testValue, numbers } = getValues(data[i]);
    const operatorPermutations = generateOperatorPermutations(numbers.length - 1);

    for (const ops of operatorPermutations) {
      if (evaluate(numbers, ops) === testValue) {
        total += testValue;
        break;
      }
    }
  }

  return total;
}

async function part2() {
  const data = await getData(path.join(__dirname, 'input.txt'));
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    const { testValue, numbers } = getValues(data[i]);
    const operatorPermutations = generateOperatorPermutations(numbers.length - 1, true);

    for (const ops of operatorPermutations) {
      if (evaluate(numbers, ops) === testValue) {
        total += testValue;
        break;
      }
    }
  }

  return total;
}

function getValues(equation: string) {
  const [ testValueString , numberString ] = equation.split(':');
  const testValue = Number(testValueString);
  const numbers = numberString.trim().split(' ').map(Number);

  return {
    testValue,
    numbers
  }
}

function generateOperatorPermutations(length: number, allowConcatenation: boolean = false): string[][] {
  const operators = ['+', '*'];
  const result: string[][] = [];

  if (allowConcatenation) {
    operators.push('||');
  }

  function generate(current: string[]) {
    if (current.length === length) {
      result.push([...current]);
      return;
    }
    for (const op of operators) {
      current.push(op);
      generate(current);
      current.pop();
    }
  }

  generate([]);

  return result;
}

function evaluate(numbers: number[], operators: string[]): number {
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result += numbers[i + 1];
    } else if (operators[i] === '*') {
      result *= numbers[i + 1];
    } else if (operators[i] === '||') {
      result = Number(`${result}${numbers[i + 1]}`);
    }
  }

  return result;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});