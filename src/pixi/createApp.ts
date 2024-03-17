import gsap from 'gsap'
import { addStats } from 'pixi-stats'
import { Application, Ticker, UPDATE_PRIORITY } from 'pixi.js'

const subscribeToGSAPTicker = (app: Application) => {
  app.stage.removeChildren()
  app.ticker.stop()
  app.stage.sortableChildren = true

  const stats = addStats(document, app)
  app.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY)

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
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    sharedTicker: true,
  })
  stage.appendChild(app.canvas)

  subscribeToGSAPTicker(app)

  return app
}
