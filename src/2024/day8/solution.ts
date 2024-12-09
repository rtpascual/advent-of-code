import path from 'path';
import { profile } from '../../utils/profile';
import { getData2d } from '../../utils/readInput';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function part1() {
  const data = await getData2d(path.join(__dirname, 'input.txt'));
  return calculateAntinodes(data);
}

async function part2() {
  const data = await getData2d(path.join(__dirname, 'input.txt'));
  return calculateAntinodes(data, true);
}

function getAntennas(data: string[][], maxRows: number, maxCols: number): Map<string, number[][]> {
  const antennas = new Map<string, number[][]>();

  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < maxCols; c++) {
      if (data[r][c] !== '.') {
        const frequency = data[r][c];
        const antennaCoords = antennas.get(frequency);

        if (antennaCoords) {
          antennaCoords.push([r,c]);
          antennas.set(frequency, antennaCoords);
        } else {
          antennas.set(frequency, [[r,c]]);
        }
      }
    }
  }

  return antennas;
}

function isValid(r: number, c: number, maxRows: number, maxCols: number): boolean {
  return r >= 0 && r < maxRows && c >= 0 && c < maxCols;
}

function calculateAntinodes(data: string[][], includeResonance: boolean = false): number {
  const maxRows = data.length;
  const maxCols = data[0].length;
  const antennas = getAntennas(data, maxRows, maxCols);
  const antinodes = new Set<string>();

  antennas.forEach((coords) => {
    for (let i = 0; i < coords.length; i++) {
      for (let j = 0; j < coords.length; j++) {
        if (i === j) {
          continue;
        }
        const [r1, c1] = coords[i];
        const [r2, c2] = coords[j];
        const [dr, dc] = [r2 - r1, c2 - c1];

        for (const dir of [-1, 1]) {
          let r = includeResonance ? r1 + dir * dr : r1 - dr;
          let c = includeResonance ? c1 + dir * dc : c1 - dc;
  
          while (isValid(r, c, maxRows, maxCols)) {
            antinodes.add(`${r},${c}`);
            if (!includeResonance) {
              break;
            }
            r += dir * dr;
            c += dir * dc;
          }
        }
      }
    }
  });

  return antinodes.size;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});