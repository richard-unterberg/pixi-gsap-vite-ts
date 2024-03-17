import { Application } from 'pixi.js'

export const initStage = async (stage: HTMLDivElement) => {
  const app = new Application()
  await app.init({
    // fallback properties
    width: 800,
    height: 600,

    // auto resize
    resizeTo: stage,
    autoDensity: true,
    resolution: devicePixelRatio,
  })
  stage.appendChild(app.canvas)
  // eslint-disable-next-line no-console
  console.log({
    stage,
    app,
  })
  return app
}
