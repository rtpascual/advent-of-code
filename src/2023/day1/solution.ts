import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function getData() {
    const file = await fs.readFile(path.join(__dirname, 'input.txt'));

    const data = file.toString().split('\n');

    return data;
}

async function part1() {
    const data = await getData();

    let total = 0;

    for (const line of data) {
        const { first, last } = getFirstAndLastNumbers(line);
        total += parseInt(first + last);
    }

    return total;
}

async function part2() {
    const data = await getData();

    let total = 0;

    for (const line of data) {
        const convertedLine = replaceNumberWordsToDigits(line);
        const { first, last } = getFirstAndLastNumbers(convertedLine);
        total += parseInt(first + last);
    }

    return total;
}

function getFirstAndLastNumbers(line: string) {
    let first = "";
    let last = "";

    for (const char of line) {
        if (char.match(/\d/)) {
            if (!first) {
                first = char;
                last = char;
            } else {
                last = char;
            }
        }
    }

    return { first, last };
}

function replaceNumberWordsToDigits(line: string) {
    let result = "";
    let string = "";


    for (const char of line) {
        if (char.match(/\d/)) {
            result += char;
        }
        string += char;

        if (string.match(/one$/) && result[result.length - 1] !== "1") {
            result += "1";
        }
        if (string.match(/two$/) && result[result.length - 1] !== "2") {
            result += "2";
        }
        if (string.match(/three$/) && result[result.length - 1] !== "3") {
            result += "3";
        }
        if (string.match(/four$/) && result[result.length - 1] !== "4") {
            result += "4";
        }
        if (string.match(/five$/) && result[result.length - 1] !== "5") {
            result += "5";
        }
        if (string.match(/six$/) && result[result.length - 1] !== "6") {
            result += "6";
        }
        if (string.match(/seven$/) && result[result.length - 1] !== "7") {
            result += "7";
        }
        if (string.match(/eight$/) && result[result.length - 1] !== "8") {
            result += "8";
        }
        if (string.match(/nine$/) && result[result.length - 1] !== "9") {
            result += "9";
        }
    }

    return result;
}

console.log(await part1());
console.log(await part2());