import path from "path";
import { fileURLToPath } from "url";
import { profile } from '../../utils/profile';
import { getData } from '../../utils/readInput';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type DiskMap = (number | null)[];

async function part1() {
  const data = await getData(path.join(__dirname, 'input.txt'));
  const diskMap = translateDiskMap(data);
  const compactedDisk = compactDisk(diskMap);

  return calculateChecksum(compactedDisk);
}

async function part2() {
  const data = await getData(path.join(__dirname, 'input.txt'));
  const diskMap = translateDiskMap(data);
  const compactedDisk = compactDiskMoveWholeFiles(diskMap);

  return calculateChecksum(compactedDisk);
}

function translateDiskMap(diskMap: string): DiskMap {
  let result: DiskMap = [];
  let id = 0;

  for (let i = 0; i < diskMap.length; i++) {
    const num = Number(diskMap[i]);
    if (i % 2 === 0) {
      // file
      for (let j = 0; j < num; j++) {
        result.push(id);
      }
      id++;
    } else {
      // free space
      for (let j = 0; j < num; j++) {
        result.push(null);
      }
    }
  }

  return result;
}

function compactDisk(diskMap: DiskMap): DiskMap {
  let lastIndex = diskMap.length;

  for (let i = 0; i < diskMap.length; i++) {
    if (i === lastIndex) {
      break;
    }

    if (diskMap[i] !== null) {
      continue;
    }

    for (let j = diskMap.length - 1; j > i; j--) {
      lastIndex = j;
      if (diskMap[j] !== null) {
        [diskMap[i],diskMap[j]] = [diskMap[j],diskMap[i]];
        break;
      }
    }
  }

  return diskMap;
}

function compactDiskMoveWholeFiles(diskMap: DiskMap): DiskMap {
  const lastFileValue = diskMap[diskMap.length - 1];
  let fileId = lastFileValue === null ? 0 : lastFileValue;

  do {
    const lastFileIndex = diskMap.lastIndexOf(fileId);
    const firstFileIndex = diskMap.indexOf(fileId);
    for (let i = 0; i < firstFileIndex; i++) {
      if (diskMap[i] === null) {
        const lastGapIndex = getLastIndexOfGap(diskMap, i);

        if (lastFileIndex - firstFileIndex <= lastGapIndex - i) {
          const num = lastFileIndex - firstFileIndex;

          for (let j = 0; j <= num; j++) {
            [diskMap[i + j], diskMap[firstFileIndex + j]] = [diskMap[firstFileIndex + j], diskMap[i + j]];
          }

          continue;
        }
        i = lastGapIndex;
      }
    }
    fileId--;
  } while (fileId > 0)

  return diskMap;
}

function calculateChecksum(compactDisk: DiskMap): number {
  let checksum = 0;
  for (let i = 0; i < compactDisk.length; i++) {
    const value = compactDisk[i];
    if (value !== null) {
      checksum += i * value;
    }
  }

  return checksum;
}

function getLastIndexOfGap(diskMap: DiskMap, index: number): number {
  let lastIndex = index;
  for (let i = index + 1; i < diskMap.length; i++) {
    if (diskMap[i] !== null) {
      break;
    }
    lastIndex = i;
  }

  return lastIndex;
}

profile("part 1", async () => {
  console.log(await part1());
});

profile("part 2", async () => {
  console.log(await part2());
});