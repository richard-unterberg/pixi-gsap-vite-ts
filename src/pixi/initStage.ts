import { animateGrid, animatePointerMove } from '#pixi/animation'
import { createApp } from '#pixi/createApp'
import { getCalculatedGrid } from '#pixi/getCalculatedGrid'
import { getNeighbors, getTileOnPointer } from '#pixi/getTileOnPointer'
import { getPixiGrid, setPixiGrid } from '#pixi/pixiGrid'
import { PixiConfig } from '#src/lib/constants'

let previousHoveredTileId: number | null = null

export const handleMove = (boundingRect: DOMRect, event: PointerEvent) => {
  // eslint-disable-next-line no-console

  const mouseX = event.clientX - boundingRect.left
  const mouseY = event.clientY - boundingRect.top

  const currentHoveredTileId = getTileOnPointer(mouseX, mouseY)
  if (currentHoveredTileId === null || currentHoveredTileId === previousHoveredTileId) return

  previousHoveredTileId = currentHoveredTileId

  const neighbours = getNeighbors({
    mouseX,
    mouseY,
    radius: 4,
  })

  animatePointerMove(neighbours)
}

export const initStage = async (stage: HTMLDivElement | null) => {
  if (!stage) return

  const app = await createApp(stage)
  const tiles = await getCalculatedGrid(app)

  // Set the grid
  setPixiGrid({
    app,
    stage,
    tiles,
    rowsCount: Math.floor(app.renderer.height / PixiConfig.tileHeight + 1),
    colsCount: Math.floor(app.renderer.width / PixiConfig.tileWidth + 1),
    tileHeight: PixiConfig.tileHeight,
    tileWidth: PixiConfig.tileWidth,
  })
  animateGrid()

  // eslint-disable-next-line no-console
  console.log('grid', getPixiGrid())

  stage.addEventListener('pointermove', event => handleMove(stage.getBoundingClientRect(), event))
  stage.addEventListener('pointerdown', event => handleMove(stage.getBoundingClientRect(), event))
}
