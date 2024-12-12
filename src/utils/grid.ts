
/**
 * Orthogonal directions for 2d grid.
 * @example
 * orthogonalDirections[0] = [-1, 0] // up
 * orthogonalDirections[1] = [0, 1] // right
 * orthogonalDirections[2] = [1, 0] // down
 * orthogonalDirections[3] = [0, -1], // left
 */
export const orthogonalDirections: number[][] = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

/**
 * All directions (orthogonal and diagonal) for 2d grid.
 */
export const directions: number[][] = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [1, 1], // down-right
  [1, -1], // down-left
  [-1, 1], // up-right
  [-1, -1], // up-left
];

/**
 * 
 * @param r current row
 * @param c current column
 * @param maxRows max number of rows
 * @param maxCols max number of columns
 * @returns a boolean indicating if the current position is within a 2d grid
 */
export function isValid(r: number, c: number, maxRows: number, maxCols: number): boolean {
  return r >= 0 && r < maxRows && c >= 0 && c < maxCols;
}