import { initPointerMoveEvents } from '#pixi/grid/animation/pointer'
import { animateGrid } from '#pixi/grid/animation/tile'
import { createGrid } from '#pixi/grid/createGrid'
import { getPixiGrid, setPixiGrid } from '#pixi/grid/pixiGrid'
import { createApp } from '#pixi/system/createApp'
import { PixiConfig } from '#src/lib/constants'

export const initStage = async (stage: HTMLDivElement | null) => {
  if (!stage) return

  // build stage and grid
  const app = await createApp(stage)
  const tiles = await createGrid(app)

  // set the grid config
  setPixiGrid({
    app,
    stage,
    tiles,
    rowsCount: Math.ceil(app.renderer.height / PixiConfig.tileHeight),
    colsCount: Math.ceil(app.renderer.width / PixiConfig.tileWidth),
    tileHeight: PixiConfig.tileHeight,
    tileWidth: PixiConfig.tileWidth,
  })

  // trigger idle animations
  animateGrid()

  // trigger pointer events
  initPointerMoveEvents()

  // eslint-disable-next-line no-console
  console.log('grid', getPixiGrid())
}
