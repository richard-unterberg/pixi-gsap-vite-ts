import { triggerAnimateTile } from '#pixi/grid/animation'
import { getStore } from '#pixi/store'
import { PixiConfig } from '#src/lib/constants'

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
// export const getNeighbors = ({ mouseX, mouseY, radius }: GetAllNeighborsProps): number[] => {
//   const { tileHeight, tileWidth, colsCount, rowsCount } = getStore()

//   const hitboxWidth = tileWidth * radius * 2 * 3
//   const hitboxHeight = tileHeight * radius * 2 * 3

//   const c = Math.floor(mouseX / tileWidth)
//   const d = Math.floor(mouseY / tileHeight)

//   // move internal hitbox
//   const hitboxX = mouseX - tileWidth * radius
//   const hitboxY = mouseY - tileHeight * radius

//   // Calculate the range of neighbors within the hitbox boundaries
//   const startCol = Math.max(0, Math.floor(hitboxX / tileWidth))
//   const endCol = Math.min(colsCount - 1, Math.ceil((hitboxX + hitboxWidth) / tileWidth))
//   const startRow = Math.max(0, Math.floor(hitboxY / tileHeight))
//   const endRow = Math.min(rowsCount - 1, Math.ceil((hitboxY + hitboxHeight) / tileHeight))

//   const neighbors: number[] = []
//   for (let col = startCol; col <= endCol; col += 1) {
//     for (let row = startRow; row <= endRow; row += 1) {
//       const neighborPosition = row * colsCount + col
//       const distance = Math.sqrt((c - col) ** 2 + (d - row) ** 2)

//       if (distance <= radius) {
//         const id = neighborPosition
//         neighbors.push(id)
//       }
//     }
//   }

//   return neighbors
// }
export const getNeighbors = ({ mouseX, mouseY, radius }: GetAllNeighborsProps): number[] => {
  const { tileHeight, tileWidth, colsCount, rowsCount } = getStore()

  const hitboxWidth = tileWidth * radius * 2 * 3
  const hitboxHeight = tileHeight * radius * 2 * 3

  const c = Math.floor(mouseX / tileWidth)
  const d = Math.floor(mouseY / tileHeight)

  const hitboxX = mouseX - tileWidth * radius
  const hitboxY = mouseY - tileHeight * radius

  const startCol = Math.max(0, Math.floor(hitboxX / tileWidth))
  const endCol = Math.min(colsCount - 1, Math.ceil((hitboxX + hitboxWidth) / tileWidth))
  const startRow = Math.max(0, Math.floor(hitboxY / tileHeight))
  const endRow = Math.min(rowsCount - 1, Math.ceil((hitboxY + hitboxHeight) / tileHeight))

  const neighbors: number[] = []
  for (let col = startCol; col <= endCol; col++) {
    for (let row = startRow; row <= endRow; row++) {
      const neighborPosition = row * colsCount + col
      const distance = Math.sqrt((c - col) ** 2 + (d - row) ** 2)

      if (distance <= radius) {
        neighbors.push(neighborPosition)
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
  const { tiles, tileWidth, tileHeight } = getStore()
  const tileCount = tiles.length

  for (let i = 0; i < tileCount; i++) {
    const tile = tiles[i]
    const tileLeft = tile.x
    const tileRight = tile.x + tileWidth
    const tileTop = tile.y
    const tileBottom = tile.y + tileHeight

    if (mouseX >= tileLeft && mouseX <= tileRight && mouseY >= tileTop && mouseY <= tileBottom) {
      return tile.id
    }
  }
  return null
}

let previousHoveredTileId: number | null = null
/**
 * Handles the pointer move event.
 *
 * @param boundingRect - The bounding rectangle of the element.
 * @param event - The pointer event.
 */
export const handlePointerMove = (boundingRect: DOMRect, event: PointerEvent) => {
  const mouseX = event.clientX - boundingRect.left
  const mouseY = event.clientY - boundingRect.top
  const { cursorRadius } = PixiConfig

  const currentHoveredTileId = getTileOnPointer(mouseX, mouseY)
  if (currentHoveredTileId === null || currentHoveredTileId === previousHoveredTileId) return

  previousHoveredTileId = currentHoveredTileId

  const neighbours = getNeighbors({
    mouseX,
    mouseY,
    radius: cursorRadius,
  })

  triggerAnimateTile(neighbours)
}

export const initPointerMoveEvents = () => {
  const { stage } = getStore()

  // handle mouse move
  stage.addEventListener('pointermove', event =>
    handlePointerMove(stage.getBoundingClientRect(), event),
  )
}
