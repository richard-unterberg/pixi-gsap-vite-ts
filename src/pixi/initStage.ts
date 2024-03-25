import { createGrid } from '#pixi/grid/createGrid'
import { initPointerMoveEvents } from '#pixi/grid/pointer'
import { createTimelines } from '#pixi/grid/timelines'
import { getStore, setStore } from '#pixi/store'
import { createApp } from '#pixi/system/createApp'
import { PixiConfig } from '#src/lib/constants'

export const initStage = async (stage: HTMLDivElement | null) => {
  if (!stage) return
  const { tileHeight, tileWidth } = PixiConfig

  // build stage, grid, text chunks
  const app = await createApp(stage)
  const tiles = await createGrid(app)
  await createTimelines({ tiles, app })

  // set the grid config
  setStore({
    app,
    stage,
    tiles,
    rowsCount: Math.ceil(app.renderer.height / tileHeight),
    colsCount: Math.ceil(app.renderer.width / tileWidth),
    tileHeight,
    tileWidth,
  })

  // trigger pointer events
  initPointerMoveEvents()

  // eslint-disable-next-line no-console
  console.log('grid', getStore())

  const tileCounElement = document.querySelector<HTMLDivElement>('#tileCount')
  if (tileCounElement) {
    tileCounElement.textContent = `currently ${tiles.length} sprites animated`
  }

  return getStore()
}
