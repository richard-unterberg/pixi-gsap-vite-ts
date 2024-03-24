import { Application, Container } from 'pixi.js'

export interface CreateContainerProps {
  x: number
  y: number
  width: number
  height: number
  pivot?: number[]
  app: Application
}

export const createContainer = ({ x, y }: CreateContainerProps) => {
  const container = new Container()
  container.x = x
  container.y = y
  return container
}
