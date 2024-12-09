import fs from 'fs/promises';

/**
 * Reads input file and returns data as string
 */
export async function getData(filePath: string): Promise<string> {
  const file = await fs.readFile(filePath);
  return file.toString();
}

/**
 * Reads input file and returns data array
 */
export async function getDataArray(filePath: string): Promise<string[]> {
  const file = await fs.readFile(filePath);
  return file.toString().split('\n');
}

/**
 * Reads input file and returns data as a 2d grid
 */
export async function getData2d(filePath: string): Promise<string[][]> {
  const file = await fs.readFile(filePath);
  const rows = file.toString().split('\n');
  const data: string[][] = [];

  for (let i = 0; i < rows.length; i++) {
    data[i] = rows[i].split('');
  }

  return data;
}