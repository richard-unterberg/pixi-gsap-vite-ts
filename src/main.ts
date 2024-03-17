import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-700.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.css'

import { drawRectangles } from '#pixi/drawRectangles'
import { initStage } from '#pixi/initStage'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="p-3">here starts the client sided pixi v8 stage ✨</div>
  <div id="stage"></div>
`

window.addEventListener('load', async () => {
  const app = await initStage(document.querySelector<HTMLDivElement>('#stage')!)
  drawRectangles(app)
})
