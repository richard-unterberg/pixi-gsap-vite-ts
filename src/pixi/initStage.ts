import { animateGrid } from '#pixi/animateGrid'
import { createApp } from '#pixi/createApp'
import { getCalculatedGrid } from '#pixi/getCalculatedGrid'

export const initStage = async (stage: HTMLDivElement | null) => {
  if (!stage) return

  const pixiApp = await createApp(stage)
  const grid = await getCalculatedGrid(pixiApp)

  // eslint-disable-next-line no-console
  console.log('grid', grid)

  animateGrid(grid, pixiApp)
}
