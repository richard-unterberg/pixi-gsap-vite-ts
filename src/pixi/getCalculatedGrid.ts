import { Application } from 'pixi.js'

import { createContainer } from '#pixi/createContainer'
import { createSprite } from '#pixi/createSprite'
import { Tile } from '#pixi/types'
import { PixiConfig } from '#src/lib/constants'

export const getCalculatedGrid = async (app: Application): Promise<Tile[]> => {
  const tilesPos: Tile[] = []

  let tileId = 0

  for (let y = 0; y < app.renderer.height; y += PixiConfig.tileHeight) {
    for (let x = 0; x < app.renderer.width; x += PixiConfig.tileWidth) {
      const element = {
        id: tileId++,
        x,
        y,
        sprite: createSprite({
          width: PixiConfig.tileWidth,
          height: PixiConfig.tileHeight,
          app,
        }),
        container: createContainer({
          x,
          y,
          width: PixiConfig.tileWidth,
          height: PixiConfig.tileHeight,
          app,
        }),
      }

      app.stage.addChild(element.container)
      element.container.addChild(element.sprite)
      tilesPos.push(element)
    }
  }
  return tilesPos
}
