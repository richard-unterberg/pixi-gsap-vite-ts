import { Container } from 'pixi.js'

export interface CreateContainerProps {
  x: number
  y: number
  zIndex?: number
}

export const createContainer = ({ x, y, zIndex = 1 }: CreateContainerProps) => {
  const container = new Container()
  container.x = x
  container.y = y
  container.zIndex = zIndex
  return container
}
