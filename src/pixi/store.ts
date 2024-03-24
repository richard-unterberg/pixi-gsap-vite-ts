import { Application, Renderer } from 'pixi.js'

import { Tile } from '#pixi/types'

// export enum TIMELINE {
//   Idle,
//   Hover,
//   Click,
// }

export type Store = {
  app: Application<Renderer>
  stage: HTMLDivElement
  tiles: Tile[]
  rowsCount: number
  colsCount: number
  tileWidth: number
  tileHeight: number
  // timelines: Record<TIMELINE, gsap.core.Timeline>
}

let store: Store
export const setStore = (newStore: Store) => (store = newStore)
export const getStore = () => store
