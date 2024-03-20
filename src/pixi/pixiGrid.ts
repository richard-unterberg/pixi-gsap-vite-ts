import { Application, Renderer } from 'pixi.js'

import { Tile } from '#pixi/types'

export type PixiGrid = {
  app: Application<Renderer>
  stage: HTMLDivElement
  tiles: Tile[]
  rowsCount: number
  colsCount: number
  tileWidth: number
  tileHeight: number
}

let grid: PixiGrid
export const setPixiGrid = (newGrid: PixiGrid) => (grid = newGrid)
export const getPixiGrid = () => grid
