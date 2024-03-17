import { Application } from 'pixi.js'

import { createSprite } from '#pixi/createSprite'
import { Tile } from '#pixi/types'
import { PixiConfig } from '#src/lib/constants'

export const getCalculatedGrid = async (app: Application): Promise<Tile[]> => {
  const tilesPos = []
  let tileId = 0

  for (let y = 0; y < app.renderer.height; y += PixiConfig.tileHeight) {
    for (let x = 0; x < app.renderer.width; x += PixiConfig.tileWidth) {
      const col = Math.floor(x / PixiConfig.tileWidth)
      const row = Math.floor(y / PixiConfig.tileHeight)

      tilesPos.push({
        id: tileId++,
        x,
        y,
        col,
        row,
        sprite: await createSprite({
          x,
          y,
          width: PixiConfig.tileWidth,
          height: PixiConfig.tileHeight,
          app,
        }),
      })
    }
  }
  return tilesPos
}
