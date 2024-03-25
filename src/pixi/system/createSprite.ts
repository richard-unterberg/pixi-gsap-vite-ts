import { Sprite, Texture } from 'pixi.js'

export interface CreateSpriteProps {
  x?: number
  y?: number
  texture: Texture
  width: number
  height: number
  anchor?: number
}

export const createSprite = ({ x = 0, y = 0, texture, anchor = 0.5 }: CreateSpriteProps) => {
  const sprite = Sprite.from(texture)
  sprite.x = x
  sprite.y = y
  sprite.anchor.set(anchor)
  return sprite
}
