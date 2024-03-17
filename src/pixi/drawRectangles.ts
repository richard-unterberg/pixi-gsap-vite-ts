import { Application, Graphics } from 'pixi.js'

export const drawRectangles = (app: Application) => {
  const graphics = new Graphics()
  graphics.rect(50, 50, 100, 100).fill('blue')
  app.stage.addChild(graphics)
}
