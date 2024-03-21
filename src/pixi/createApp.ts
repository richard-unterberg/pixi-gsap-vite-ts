import gsap from 'gsap'
import { Application, Ticker } from 'pixi.js'

const subscribeToGSAPTicker = (app: Application) => {
  app.stage.removeChildren()
  app.ticker.stop()

  gsap.ticker.remove(() => {
    app.ticker.update()
  })

  Ticker.shared.autoStart = false
  Ticker.shared.stop()
  Ticker.system.stop()

  gsap.ticker.add(() => {
    app.ticker.update()
  })
}

export const createApp = async (stage: HTMLDivElement) => {
  const app = new Application()
  await app.init({
    // fallback properties
    width: 800,
    height: 600,
    // auto resize
    resizeTo: stage,
    autoDensity: true,
    hello: true,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    sharedTicker: true,
    backgroundColor: 0x020617,
  })
  app.stage.sortableChildren = true
  stage.appendChild(app.canvas)

  subscribeToGSAPTicker(app)

  return app
}
