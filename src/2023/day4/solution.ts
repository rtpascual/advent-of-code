import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cardCounts: number[] = [];

async function getData() {
  const file = await fs.readFile(path.join(__dirname, "input.txt"));

  const data = file.toString().split("\n");

  return data;
}

async function part1() {
  const cards = await getData();
  let sum = 0;

  for (const card of cards) {
    const numOfWinningNumbers = findNumberOfWinningNumbers(card);
    if (numOfWinningNumbers) {
      sum += numOfWinningNumbers === 1 ? 1 : 1 * 2 ** (numOfWinningNumbers - 1);
    }
  }

  return sum;
}

async function part2() {
  const cards = await getData();

  for (let i = 0; i < 208; i++) {
    cardCounts.push(1);
  }

  for (const [index, card] of cards.entries()) {
    const numOfWinningNumbers = findNumberOfWinningNumbers(card);
    addCopies(index, numOfWinningNumbers);
  }

  const totalCards = cardCounts.reduce((sum, num) => sum + num);

  return totalCards;
}

function getWinningNumbers(card: string) {
  const winningNumbersString = card.split(":")[1].split("|")[0];
  const winningNumbers = winningNumbersString
    .split(" ")
    .filter((n) => n.match(/\d/));

  return winningNumbers;
}

function findNumberOfWinningNumbers(card: string) {
  const winningNumbers = getWinningNumbers(card);
  const cardNumberString = card.split(":")[1].split("|")[1];
  const cardNumbers = cardNumberString.split(" ").filter((n) => n.match(/\d/));

  let total = 0;

  for (const num of cardNumbers) {
    if (winningNumbers.indexOf(num) !== -1) {
      total++;
    }
  }

  return total;
}

function addCopies(currentCardIndex: number, numOfWinningNumbers: number) {
  const max =
    currentCardIndex + numOfWinningNumbers > 207
      ? 207
      : currentCardIndex + numOfWinningNumbers;

  for (let i = currentCardIndex + 1; i <= max; i++) {
    cardCounts[i] += cardCounts[currentCardIndex];
  }
}

console.log(await part1());
console.log(await part2());
