import { Application, Sprite, Texture } from 'pixi.js'

import { R } from '#src/utils'

export interface CreateSpriteProps {
  x: number
  y: number
  width: number
  height: number
  origin?: number
  app: Application
}

export const createSprite = async ({
  x,
  y,
  width,
  height,
  origin = 0.5,
  app,
}: CreateSpriteProps) => {
  const sprite = Sprite.from(Texture.WHITE)
  sprite.x = x
  sprite.y = y
  sprite.width = width
  sprite.height = height
  sprite.alpha = 0
  sprite.tint = R(0, 0.2) * 0x0284c7
  sprite.anchor.set(origin)
  app.stage.addChild(sprite)
  return sprite
}
