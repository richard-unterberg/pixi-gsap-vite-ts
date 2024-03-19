import { getPixiGrid } from '#pixi/pixiGrid'

interface GetAllNeighborsProps {
  mouseX: number
  mouseY: number
  radius: number
}
/**
 * Calculates the IDs of all the neighboring tiles within a given radius around a specified tile position.
 *
 * @param mouseX - The x-coordinate of the tile position.
 * @param mouseY - The y-coordinate of the tile position.
 * @param radius - The radius within which to find neighboring tiles.
 * @returns An array of IDs representing the neighboring tiles.
 */
export const getNeighbors = ({ mouseX, mouseY, radius }: GetAllNeighborsProps): number[] => {
  const { tileHeight: height, tileWidth: width, colsCount, rowsCount } = getPixiGrid()

  const hitboxWidth = width * radius * 2 * 3
  const hitboxHeight = height * radius * 2 * 3

  const c = Math.floor(mouseX / width)
  const d = Math.floor(mouseY / height)

  // move internal hitbox
  const hitboxX = mouseX - width * radius
  const hitboxY = mouseY - height * radius

  // Calculate the range of neighbors within the hitbox boundaries
  const startCol = Math.max(0, Math.floor(hitboxX / width))
  const endCol = Math.min(colsCount - 1, Math.ceil((hitboxX + hitboxWidth) / width))
  const startRow = Math.max(0, Math.floor(hitboxY / height))
  const endRow = Math.min(rowsCount - 1, Math.ceil((hitboxY + hitboxHeight) / height))

  const neighbors: number[] = []
  for (let col = startCol; col <= endCol; col += 1) {
    for (let row = startRow; row <= endRow; row += 1) {
      const neighborPosition = row * colsCount + col
      const distance = Math.sqrt((c - col) ** 2 + (d - row) ** 2)

      if (distance <= radius) {
        const id = neighborPosition
        neighbors.push(id)
      }
    }
  }

  return neighbors
}

/**
 * Checks mouse pointer is hovering over a rectangle tile.
 *
 * @param mouseX - The x-coordinate of the mouse pointer.
 * @param mouseY - The y-coordinate of the mouse pointer.
 * @returns The id of the tile if the mouse pointer is hovering over it, otherwise null.
 */
export const getTileOnPointer = (mouseX: number, mouseY: number): number | null => {
  const { tiles, tileWidth: width, tileHeight: height } = getPixiGrid()

  for (let i = 0; i < tiles.length; i += 1) {
    const tile = tiles[i]
    const tileLeft = tile.x
    const tileRight = tile.x + width
    const tileTop = tile.y
    const tileBottom = tile.y + height

    if (mouseX >= tileLeft && mouseX <= tileRight && mouseY >= tileTop && mouseY <= tileBottom) {
      return tile.id
    }
  }
  return null
}
