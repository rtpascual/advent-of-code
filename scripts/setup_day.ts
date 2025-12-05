import fsp from 'fs/promises';

const year = new Date().getFullYear();
const dayNumber = process.argv[2];
if (!dayNumber) {
  throw new Error('Usage: npm run setup:day <number>');
}

const dayDir = new URL(
  `../src/${year}/day${dayNumber}`,
  import.meta.url
);

await fsp.mkdir(dayDir, { recursive: true });

const dayTemplateDir = new URL(
  `../templates/day`,
  import.meta.url
);

await fsp.cp(dayTemplateDir, dayDir, { recursive: true });