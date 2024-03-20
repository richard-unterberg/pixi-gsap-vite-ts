import { Application, Sprite, Texture } from 'pixi.js'

export interface CreateSpriteProps {
  x?: number
  y?: number
  width: number
  height: number
  anchor?: number
  app: Application
}

export const createSprite = ({ x = 0, y = 0, width, height, anchor = 0.5 }: CreateSpriteProps) => {
  const sprite = Sprite.from(Texture.WHITE)
  sprite.x = x
  sprite.y = y
  sprite.width = width
  sprite.height = height
  sprite.tint = 0x0284c7
  sprite.anchor.set(anchor)
  return sprite
}
