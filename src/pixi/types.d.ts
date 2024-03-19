import { Sprite } from 'pixi.js'

export type Tile = {
  id: number
  x: number
  y: number
  sprite: Sprite
  container: Container
}
